import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';
import IntroScreen from './app/screens/IntroScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import EditProfileScreen from './app/screens/EditProfileScreen';

import IntroStack from './app/navigation/introStack';
import HomeTabs from './app/navigation/homeTabs';
import RootNavigator from './app/navigation/rootNavigator';

export default class App extends React.Component {
  render() {
    return(
    <RootNavigator />
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
