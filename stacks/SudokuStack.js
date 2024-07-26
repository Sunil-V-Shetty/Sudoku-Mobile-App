import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

// Imports InputSolve and Solution pages
import InputSolve from '../pages/InputSolve';
import Solution from '../pages/Solution';

// Imports Header component
import Header from '../components/Header';

// Creates a stack that houses the pages that involve sudoku
const SudokuStack = createStackNavigator({

  InputSolve: {
    screen: InputSolve,

    // Displays a custom Header component
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Sudoku Solver Input' navigation={navigation} />
      }
    },
  },

  Solution: { screen: Solution },
},
  {
    // Initializes the first page to be "InputSolve" within the stack
    initialRouteName: 'InputSolve',
  }
);

export default SudokuStack;
