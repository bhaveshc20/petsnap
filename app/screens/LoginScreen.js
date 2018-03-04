import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import SocialFeedScreen from '../../app/screens/SocialFeedScreen';
import { Button, Input } from 'react-native-elements';
// import { MaterialCommunityIcons, SimpleLineIcons } from 'expo/vector-icons';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'LoginScreen',
            usernametext: '', passwordtext: ''
        };
    }
    onButtonPressed = (usernametext, passwordtext) => {
        if (!(usernametext === '' || passwordtext === '')) {
            this.setState({ screen: 'SocialFeedScreen' });
        }
        else {
            Alert.alert(
                'Error',
                'Please try again'
            );
        }
    }

    render() {
        const { screen, usernametext, passwordtext } = this.state;
        const ifLoginNotEmpty = !(usernametext === '' || passwordtext === '');
        if (screen === 'SocialFeedScreen') {
            return <SocialFeedScreen />
        }
        return (
            <LinearGradient colors={['#1cd8d2', '#93edc7']} style={styles.container}>
                <View style={styles.loginInputContainer}>
                    <Input style={styles.loginInputTextContainer}
                        placeholder="Email"
                        placeholderTextColor="white"
                        inputStyle={{ color: "white" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        containerStyle={styles.loginInputText}
                        onChangeText={(text) => this.setState({ usernametext: text })}
                        value={this.state.usernametext}
                        //shake={true}
                        leftIcon={
                            <Icon
                                name='email'
                                color='#ffffff' />
                        }
                    />
                    <Input style={styles.loginInputTextContainer}
                        placeholder="Password"
                        placeholderTextColor="white"
                        inputStyle={{ color: "white" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry="true"
                        keyboardType="visible-password"
                        returnKeyType="next"
                        containerStyle={styles.loginInputText}
                        onChangeText={(text) => this.setState({ passwordtext: text })}
                        value={this.state.passwordtext}
                        //shake={true}
                        leftIcon={
                            <Icon
                                name='lock'
                                color='#ffffff' />
                        }
                    />
                    <TouchableOpacity
                        style={[styles.loginButtonContainer, ifLoginNotEmpty && { backgroundColor: 'black' }]}
                        onPress={() => this.onButtonPressed(usernametext, passwordtext)}
                    >
                        <Text style={styles.loginInputButton}>Login</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1cd8d2',
    },
    loginInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginInputTextContainer: {
        alignItems:'center',
        justifyContent:'center',
        height: 40,
        paddingLeft: 10,
        width: 220,
        color: 'white',
        fontSize: 20
    },
    loginInputText: {
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
    },
    loginButtonContainer: {
        flexDirection: 'row',
        marginTop: 24,
        height: 50,
        width: 200,
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    loginInputButton: {
        fontSize: 20,
        color: 'white',
    },
});
