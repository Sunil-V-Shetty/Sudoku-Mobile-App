import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Sudoku from '../Sudoku';

// Variables that store the width and height of the user's screen
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
var size;
if (screenWidth > screenHeight) {
    size = screenHeight / 10;
}
else {
    size = screenWidth / 10;
}
var gridWidth = screenWidth / 10;


class Solution extends Component {

    // Defines the navigation bar on the Solution page
    static navigationOptions = {
        title: 'Sudoku Solver',
        headerStyle: { backgroundColor: '#226897' },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
        },
        headerBackTitle: 'Input',
        headerBackTitleStyle: { color: 'white', fontWeight: 'bold' },
    };

    render() {

        // Creates the matrix of the inputted numbers from InputSolve
        let matrix = [];
        for (let i = 0; i < 9; i++) {
            let matrixRow = [];
            for (let j = 0; j < 9; j++) {
                let num = this.props.navigation.state.params["JSON_ListView_Clicked_Item"][i * 9 + j];

                if (num == "") {
                    matrixRow.push(0);
                }
                else {
                    matrixRow.push(parseInt(num));
                }

            }
            matrix.push(matrixRow);
        }

        // Creates a Sudoku object from the matrix
        const inputtedSudoku = new Sudoku(matrix);

        // Displays error message if the inputted sudoku is not valid
        if (!inputtedSudoku.validate()) {
            var solvedGrid = <Text style={styles.invalid}>Invalid Sudoku. Please input another Sudoku.</Text>;
        }
        else {

            // Uses the solve method of the sudoku class to construct the solved Sudoku
            inputtedSudoku.solve();
            var solvedSudoku = inputtedSudoku.returnArray();

            var solvedGrid = []
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {

                    // Maintains the same extra margins from InputSolve
                    var extraMarginRight = 0;
                    var extraMarginBottom = 0;
                    var loc = i * 9 + j;
                    if (loc % 3 == 2 && loc % 9 != 8) {
                        extraMarginRight = 5;
                    }
                    if (loc == 18 || loc == 45) {
                        extraMarginBottom = 5;
                    }

                    // Pushes the numbers from the solved Sudoku onto the grid
                    solvedGrid.push(
                        <Text key={i * 9 + j} style={[styles.input, { marginRight: extraMarginRight, marginBottom: extraMarginBottom }]}>
                            {solvedSudoku[i][j]}
                        </Text>
                    );
                }
            }
        }

        // Defines what appears on the screen
        return (
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {solvedGrid}
                </View>
            </View>
        );
    }
}

// CSS styles that are applied to the components on the page
const styles = StyleSheet.create({
    container: {
        flex: 100,
        justifyContent: 'center',
        backgroundColor: '#1b262c'
    },
    gridContainer: {
        flex: 60,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    input: {
        width: '10%',
        height: gridWidth,
        backgroundColor: 'lightgrey',
        padding: '.4%',
        margin: '.4%',
        textAlign: 'center',
        backgroundColor: '#226897',
        color: '#bbe1fa',
        fontSize: 30,
        borderRadius: 2
    },
    TextStyle: {
        width: 40,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#DBDBD6',
    },
    invalid: {
        color: 'white',
        fontSize: 30,
        marginTop: 100,
        textAlign: 'center',
    }
});

export default Solution;