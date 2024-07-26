import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// Stacks
import SudokuStack from './stacks/SudokuStack';
import InstructionsStack from './stacks/InstructionsStack';
import AboutStack from './stacks/AboutStack';

// Drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Sudoku: {
    screen: SudokuStack,
    navigationOptions: {
      drawerLabel: 'Sudoku Solver',
    },
  },
  Instructions: {
    screen: InstructionsStack,
    navigationOptions: {
      drawerLabel: 'Instructions',
    },
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      drawerLabel: 'About Us',
    },
  },
});

export default createAppContainer(RootDrawerNavigator);