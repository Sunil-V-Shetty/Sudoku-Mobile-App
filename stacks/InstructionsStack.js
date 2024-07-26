import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

// Imports Instructions page
import Instructions from '../pages/Instructions';

// Imports Header component
import Header from '../components/Header';

// Creates a stack that houses the "Instructions" page
const InstructionsStack = createStackNavigator({

  Instructions: {
    screen: Instructions,

    // Displays a custom Header component
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Instructions' navigation={navigation} />
      }
    },
  },
});

export default InstructionsStack;