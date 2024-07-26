import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Gets the width of the user's screen
const screenWidth = Math.round(Dimensions.get('window').width);

// Custom Header component that appears in every page with a menu button
// Clicking the menu button opens the drawer

function Header({ title, navigation }) {

  // Opens the drawer when the icon is pressed
  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

// CSS styles that are applied to the components on the page
const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#226897',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    left: 10,
    color: 'white',
  }
});

export default Header;