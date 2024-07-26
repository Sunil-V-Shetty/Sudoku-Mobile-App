import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';

class About extends Component {

    // Defines the background color of the navigation header
    static navigationOptions = {
        headerStyle: { backgroundColor: '#226897' },
    }; 

    render() {

        // Defines what appears on the screen
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Hello! This mobile application was created from scratch by Sunil V in the year 2024.
                </Text>
                <Text style={styles.text}>
                As Sudoku fanatics ourselves, we sought to create an app that combines various features that allow users a seamless experience when solving Sudokus. We tried to incorporate functionality that promotes ease of movement throughout the Sudoku and aesthetic characteristics to promote visual appeal.
                </Text>
                <Text 
                style={styles.links}
                onPress={() => Linking.openURL('https://github.com/Sunil-V-Shetty/Sudoku-Mobile-App')}>View our GitHub repository here</Text>
                <Text style={styles.text}>Check out some of our other projects on GitHub and learn more about us on our LinkedIn pages!</Text>
                <Text style={styles.text}>Sunil V</Text>
                <Text
                    style={styles.links}
                    onPress={() => Linking.openURL('https://github.com/Sunil-V-Shetty')}>GitHub</Text>
                    <Text
                    style={styles.links}
                    onPress={() => Linking.openURL('https://www.linkedin.com/in/sunil-shetty-166395284/')}>LinkedIn</Text>
                <Text style={styles.text}>Sunil V</Text>
                <Text style={styles.text}>We encourage you to input a Sudoku and give the solver a try!</Text>
            </View>
        );
    }
}

// CSS styles that are applied to the components on the page
const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: '#1b262c',
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    header: {
        color: 'white',
        fontSize: 30,
        margin: 10,
        textDecorationLine: 'underline',
    },
    links: {
        fontSize: 20,
        color: 'orange',
        textDecorationLine: 'underline', 
        textAlign: 'center', 
        marginBottom: 10,
    }
});

export default About;