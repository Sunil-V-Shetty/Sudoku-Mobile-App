import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, Keyboard } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

// Variables that store the width and height of the user's screen
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class InputSolve extends Component {

    // Constructor for the InputSolve class that sets initial variables
    constructor(props) {
        super(props);
        this.state = {};

        // Sets the initial state for all 81 boxes to be blank
        for (let i = 0; i < 81; i++) {
            this.state[i] = '';
        }

        // Sets the initially focused item to null because the user has not selected a cell yet
        this.focusedItem = null;

        // Sets the history of moves to blank before the user writes in any cell
        this.history = [''];

        // Sets the index of where to look in the history
        this.historyIndex = 1;

        // Sets the history of redo moves to initially blank
        this.redoArray = [];
    }

    // Defines the background color of the navigation header
    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    };

    // Locks the screen orientation when the page loads
    async componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    /**
    * Handles focused cell
    * @param {number} propertyName  Stores the number of which which cell was selected
    */
    handleFocusedItem = (propertyName) => {
        // Disables use of built-in keyboard
        Keyboard.dismiss();

        // Changes styling of cell if the user is selected on a certain cell
        if (this.focusedItem != null) {
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    borderWidth: 0
                }
            });
        }
        const gridItem = propertyName;
        this.focusedItem = gridItem;
        this['item-' + this.focusedItem].setNativeProps({
            style: {
                borderWidth: 2,
                borderRadius: 2,
                borderColor: '#FFFFFF'
            }
        });
    }

    /**
    * Handles focused number
    * @param {number} propertyName  Stores which number the user wants to enter
    */
    handleFocusedNumber = (propertyName) => {
        // Disables use of built-in keyboard
        Keyboard.dismiss();
    
        // Stores the number to enter into the selected cell
        const numberToEnter = propertyName;

        // Changes the state of the focused item if a sell is selected and updates the history array
        if (this.focusedItem != null) {
            this.setState({ [`${this.focusedItem}`]: numberToEnter });
            this.history[this.historyIndex] = [this.focusedItem, numberToEnter];
            this.historyIndex++;
        }
    }

    /**
    * Handles "Undo" button functionality
    */
    handleUndo = () => {

        // If the history array is not empty
        if (this.historyIndex > 0) {

            // Gets the last move in the history array
            this.historyIndex--;
            var lastChange = this.history[this.historyIndex];
            var id = lastChange[0];

            // Pushes the move onto the "redoArray"
            this.redoArray.push(lastChange);

            // Searches through the history array backwards to find the last move in a certain cell
            for (let i = this.historyIndex; i >= 0; i--) {
                if (this.history[i][0] == id) {
                    this.setState({ [`${id}`]: this.history[i][1] });
                }
                else {
                    this.setState({ [`${id}`]: '' });
                }
            }
        }
    }

    /**
    * Handles "Redo" button functionality
    */
    handleRedo = () => {

        // If the redo array is not empty
        if (this.redoArray.length > 0) {

            // Gets the last move in the redo array
            var lastUndo = this.redoArray[this.redoArray.length - 1];
            this.setState({ [`${lastUndo[0]}`]: lastUndo[1] });
            this.redoArray.pop();

            // Adds the move onto the history array
            this.history[this.historyIndex] = [lastUndo[0], lastUndo[1]];
            this.historyIndex++;
        }
    }

    /**
    * Handles when a change occurs in a certain cell
    */
    handleChange = (propertyName, event) => {
        const gridItem = propertyName;
        const value = event.nativeEvent.text;
        this.setState({ [`${gridItem}`]: value });
    }

    /**
    * Handles "Clear" button functionality
    */
    handleClear = () => {

        // Loops through all 81 cells and clears all of them
        for (var i = 0; i < 81; i++) {
            this.setState({ [`${i}`]: '' });
            this['item-' + i].setNativeProps({
                style: {
                    color: '#bbe1fa',
                }
            });
        }

        // Resets the history and history index
        this.history = [''];
        this.historyIndex = 1;
    }

    /**
    * Handles "Delete" button functionality
    */
    handleDelete = () => {

        // If the user is focused onto a certain cell
        if (this.focusedItem != null) {

            // Sets the state of the cell to be blank
            this.setState({ [`${this.focusedItem}`]: '' });
            this['item-' + this.focusedItem].setNativeProps({
                style: {
                    color: '#bbe1fa',
                }
            });
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        var grid = []

        // Loops through all 81 cells
        for (let i = 0; i < 81; i++) {

            // Sets the extra margin between certain cells
            var extraMarginRight = 0;
            var extraMarginBottom = 0;
            if (i % 3 == 2 && i % 9 != 8) {
                extraMarginRight = 5;
            }
            if (i == 18 || i == 45) {
                extraMarginBottom = 5;
            }
            grid.push(<TextInput
                key={i}
                name={(i).toString()}
                value={this.state[i]}
                onChange={this.handleChange.bind(this, (i).toString())}
                placeholder={""}
                style={[componentStyles.input, { marginRight: extraMarginRight, marginBottom: extraMarginBottom }]}
                maxLength={1}
                ref={(thisItem) => this[`item-${i}`] = thisItem}
                onFocus={this.handleFocusedItem.bind(this, (i).toString())}
                showSoftInputOnFocus={false}
                selectTextOnFocus={false}
                selectionColor={'transparent'}
            />);
        }

        // Creates buttons for all 9 numbers
        var numbers = []
        for (let i = 1; i < 10; i++) {
            i = i.toString();
            numbers.push(
                <TextInput
                    key={'num' + i}
                    name={'num' + i}
                    value={i}
                    style={componentStyles.numberInput}
                    caretHidden={true}
                    onFocus={this.handleFocusedNumber.bind(this, (i).toString())}
                />
            );
        }

        // Defines what appears on the screen
        return (
            <View style={containerStyles.container}>

                <View style={containerStyles.headerFiller}></View>

                <View style={containerStyles.gridContainer}>
                    {grid}
                </View>

                <View style={containerStyles.numbersContainer}>
                    {numbers}
                </View>

                <View style={containerStyles.allButtonsContainer}>
                    <View style={componentStyles.delClearButtonsContainer}>
                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleDelete} style={componentStyles.buttonText}>Delete</Text>
                        </View>

                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleClear} style={componentStyles.buttonText}>
                                Clear
                            </Text>
                        </View>
                    </View>

                    <View style={componentStyles.undoRedoButtonsContainer}>
                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleUndo} style={componentStyles.buttonText}>
                                Undo
                            </Text>
                        </View>

                        <View style={componentStyles.mainButtons}>
                            <Text onPress={this.handleRedo} style={componentStyles.buttonText}>
                                Redo
                            </Text>
                        </View>
                    </View>

                    <View style={componentStyles.solveButtonContainer}>
                        <View style={componentStyles.solveButton}>
                            <Text onPress={() =>
                                navigate('Solution', {
                                    JSON_ListView_Clicked_Item: this.state,
                                })
                            } style={componentStyles.buttonText}>
                                Solve
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

// Chooses the smaller dimension between width and height for the grid to be placed in
var gridHeight = screenHeight * .56;
var gridWidth = screenWidth;

if (gridWidth < gridHeight) {
    var widthToSet = '100%';
    var itemWidth = '10%';
    var itemHeight = screenWidth * .1;
}
else {
    var widthToSet = gridHeight;
    var itemWidth = widthToSet * .1;
    var itemHeight = widthToSet * .1;
}

// CSS styles that are applied to the containers on the page
const containerStyles = StyleSheet.create({
    container: {
        flex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b262c',
    },
    gridContainer: {
        flex: 60,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: widthToSet,
    },
    numbersContainer: {
        flex: 10,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    allButtonsContainer: {
        flex: 25,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
});

// CSS styles that are applied to the components on the page
const componentStyles = StyleSheet.create({
    input: {
        width: itemWidth,
        height: itemHeight,
        padding: '.4%',
        margin: '.4%',
        textAlign: 'center',
        backgroundColor: '#226897',
        color: '#bbe1fa',
        fontSize: 30,
        borderRadius: 2,
    },
    numberInput: {
        width: itemWidth,
        height: itemHeight,
        color: '#226897',
        backgroundColor: '#bbe1fa',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 2
    },
    delClearButtonsContainer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    undoRedoButtonsContainer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    solveButtonContainer: {
        flex: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainButtons: {
        flex: .5,
        textAlign: 'center',
        backgroundColor: '#305a75',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        padding: '1%'
    },
    solveButton: {
        flex: .3,
        textAlign: 'center',
        backgroundColor: '#305a75',
        justifyContent: 'flex-start',
        margin: '3%',
        padding: '2%',
        width: '100%',
        paddingLeft: '8%',
        paddingRight: '8%',
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#BBE1FA',
        width: '100%',
    }
});

export default InputSolve;