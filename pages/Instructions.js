import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';

// Constant variable that defines the the font size of the text and the size of the bullet points 
const size = 24;

class Instructions extends Component {
    
    // Defines the background color of the navigation header
    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    }; 

    render() {

        // Defines what appears on the screen
        return(
            <View style={styles.container}>
                <Text style={styles.header}>Features</Text>
                <Unorderedlist color='white' style={{fontSize: size, marginLeft: 30, marginTop: 10}}>
                    <Text style={styles.text}>
                        Input any Sudoku (including an empty grid) and click the "Solve" button to see the solution
                    </Text>
                </Unorderedlist>
                <Unorderedlist color='white' style={{fontSize: size, marginLeft: 30, marginTop: 10}}>
                    <Text style={styles.text}>
                        Inputting an invalid sudoku will raise a warning
                    </Text>
                </Unorderedlist>
                <Unorderedlist color='white' style={{ fontSize: size, marginLeft: 30, marginTop: 10 }}>
                    <Text style={styles.text}>
                        Click the "Undo" and "Redo" buttons to revert changes made on the grid
                    </Text>
                </Unorderedlist>
                <Unorderedlist color='white' style={{ fontSize: size, marginLeft: 30, marginTop: 10 }}>
                    <Text style={styles.text}>
                        Click the "Clear" button to erase all inputted numbers
                    </Text>
                </Unorderedlist>
                <Unorderedlist color='white' style={{ fontSize: size, marginLeft: 30, marginTop: 10 }}>
                    <Text style={styles.text}>
                        Click the "Delete" button to erase an inputted number in a selected cell
                    </Text>
                </Unorderedlist>
            </View>
        );
    }
}

// CSS styles that are applied to the components on the page
const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: '#1b262c',
        paddingTop: 30
    },
    text: {
        color: 'white',
        fontSize: size,
        margin: 10,
    },
    header: {
        color: 'white',
        fontSize: 35,
        margin: 10,
        textDecorationLine: 'underline',
    },
});

export default Instructions;