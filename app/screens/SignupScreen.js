import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import SocialFeedScreen from '../../app/screens/SocialFeedScreen';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            screen: 'SignupScreen',
            nametext: '', 
            emailtext: '',
            passwordtext: '' 
        };
    }
        onButtonPressed = (nametext, passwordtext, emailtext) => {
            if (!(nametext === '' || emailtext === '' || passwordtext === '')){
                this.setState({ screen: 'SocialFeedScreen' });
            }
            else {
                Alert.alert(
                    'Error!',
                    'Please try again'
                );
            }
        }
    render() {
        const { screen, nametext, passwordtext, emailtext } = this.state;
        const ifSignupNotEmpty = !(nametext === '' || emailtext === '' || passwordtext === '')
        if (screen === 'SocialFeedScreen') {
            return <SocialFeedScreen />
        }
        return (
            <LinearGradient colors={['#1cd8d2', '#93edc7']} style={styles.container}>
                <View style={styles.signupInputContainer}>
                    <Input style={styles.signupInputTextContainer}
                        placeholder="Enter Name"
                        placeholderTextColor="white"
                        inputStyle={{ color: "white" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        containerStyle={styles.signupInputText}
                        onChangeText={(text) => this.setState({ nametext: text })}
                        value={this.state.nametext}
                        //shake={true}
                        leftIcon={
                            <FontAwesome
                                name='user'
                                color='#ffffff'
                                size={20} />
                        }
                    />
                    <Input style={styles.signupInputTextContainer}
                        placeholder="Enter Email"
                        placeholderTextColor="white"
                        inputStyle={{ color: "white" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        containerStyle={styles.signupInputText}
                        onChangeText={(text) => this.setState({ emailtext: text })}
                        value={this.state.emailtext}
                        //shake={true}
                        leftIcon={
                            <Icon
                                name='email'
                                color='#ffffff' />
                        }
                    />
                    <Input style={styles.signupInputTextContainer}
                        placeholder="Enter Password"
                        placeholderTextColor="white"
                        inputStyle={{ color: "white" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        keyboardType="visible-password"
                        returnKeyType="next"
                        containerStyle={styles.signupInputText}
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
                        style={[styles.signupButtonContainer, ifSignupNotEmpty && { backgroundColor: 'black' }]}
                        onPress={() => this.onButtonPressed(nametext, emailtext, passwordtext)}
                    >
                        <Text style={styles.signupInputButton}>Sign Up</Text>
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
    signupInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupInputTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingLeft: 10,
        width: 220,
        color: 'white',
        fontSize: 20
    },
    signupInputText: {
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
    },
    signupButtonContainer: {
        flexDirection: 'row',
        marginTop: 24,
        height: 50,
        width: 200,
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    signupInputButton: {
        color: 'white',
        fontSize: 20
    },
});
