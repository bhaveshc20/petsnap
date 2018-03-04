import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';
import IntroScreen from './app/screens/IntroScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';
import ProfileScreen from './app/screens/ProfileScreen';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screen: 'IntroScreen'
    }
  }
  render() {
    const { screen } = this.state

    if(screen === 'IntroScreen') {
      return <IntroScreen />
    }else if(screen === 'LoginScreen'){
      return <LoginScreen />
    } else if (screen === 'SignupScreen') {
      return <SignupScreen />
    } else if (screen === 'SocialFeedScreen') {
      return <SocialFeedScreen />
    } else if (screen === 'ProfileScreen') {
      return <ProfileScreen />
    }
    
    else{
    {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      )
    }
  }
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
