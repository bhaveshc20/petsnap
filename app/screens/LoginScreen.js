import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import SocialFeedScreen from '../../app/screens/SocialFeedScreen';
import { Button, Input } from 'react-native-elements';
// import { MaterialCommunityIcons, SimpleLineIcons } from 'expo/vector-icons';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login ',
        headerStyle: {
            backgroundColor: '#1cd8d2',
            borderBottomWidth: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white', fontSize: 20 }
    };
    constructor(props) {
        super(props);
        this.state = {
            screen: 'LoginScreen',
            emailtext: '', 
            passwordtext: ''
        };
    }
    async loginButtonPressed() {
        this.setState({ isLoading: true })

        const { emailtext, passwordtext } = this.state
        const { navigate } = this.props.navigation

        var details = {
            'email': emailtext,
            'password': passwordtext
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);

            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });

            let responseJSON = null

            if (response.status === 201) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.setState({ isLoading: false })
                Alert.alert(
                    'Success',
                    'You have successfully logged in!',
                    [
                        { text: "Continue", onPress: () => navigate('Home') }
                    ],
                    { cancelable: false }
                )
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors })
                Alert.alert('Log in failed!', `Unable to login.. ${error}!`)
            }
        } catch (error) {
            this.setState({ isLoading: false, response: error })

            console.log(error)

            Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
        }
    }
    onButtonPressed = (usernametext, passwordtext) => {
        if (!(usernametext === '' || passwordtext === '')) {
            this.props.navigation.navigate('Home')
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
                        secureTextEntry={true}
                        autoCorrect={false}
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
                        onPress={() => this.loginButtonPressed()}
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
