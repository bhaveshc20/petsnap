import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Button } from 'react-native';
import { LinearGradient } from 'expo';
import LoginScreen from '../../app/screens/LoginScreen';
import SignupScreen from '../../app/screens/SignupScreen';


const dog_logo = require('../../assets/dog.png');


export default class IntroScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            screen: 'null',
        };
    }
    render() {
        const { screen } = this.state;
        if (screen === 'LoginScreen') {
            return <LoginScreen />
        } else if (screen === 'SignupScreen') {
            return <SignupScreen />
        }
        else {
            return (
                <LinearGradient colors={['#1cd8d2', '#93edc7']} style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.imageLogo} source={dog_logo} />
                        <Text style={styles.textLogo}>DAUG </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginInputButton}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}
                            style={styles.signupButton}
                        >
                            <Text style={styles.signupInputButton}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1cd8d2',
    },
    logoContainer: {
        flex: 1,
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageLogo: {
        height: 150,
        width: 150
    },
    textLogo: {
        marginTop: 30,
        color: 'white',
        fontWeight: "700",
        fontSize: 40
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 80,
        backgroundColor: '#93edc7',
        alignItems: 'center',
        paddingLeft: 60,
        paddingRight: 60,
    },
    loginButton: {
        flex: 1,
        paddingRight: 45,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    signupButton: {
        flex: 1,
        paddingLeft: 45,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    loginInputButton: {
        marginBottom: 20,
        color: 'white',
        fontSize: 14,
    },
    signupInputButton: {
        marginBottom: 20,
        color: 'white',
        fontSize: 14,
    },


});
