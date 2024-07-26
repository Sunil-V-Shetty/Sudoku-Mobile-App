import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

// Imports About page
import About from '../pages/About';

// Imports Header component
import Header from '../components/Header';

// Creates a stack that houses the "About" page
const AboutStack = createStackNavigator({

  About: {
    screen: About,

    // Displays a custom Header component
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='About Us' navigation={navigation} />
      }
    },
  },
});

export default AboutStack;
