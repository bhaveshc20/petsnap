import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input, Header } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import { StackNavigator } from 'react-navigation';
import SocialFeedScreen from '../../app/screens/SocialFeedScreen';
import ProfileImage from '../../assets/profile.jpg';

export default class CreatePostScreen extends React.Component {
    // static navigationOptions = {
    //     headerTitle: 'Create Post ',
    //     headerLeft: (
    //         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
    //             <Text style={{paddingLeft: 15}}> Cancel </Text>
    //         </TouchableOpacity>
    //     ),
    //     headerRight: (
    //         <TouchableOpacity onPress={() => this.onSubmit}>
    //             <Text style={{paddingRight: 15}}> share </Text>
    //         </TouchableOpacity>
    //     ),
    // };
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            name: 'Roxie',
            location: 'Add Location',
            screen: 'CreatePostScreen',
        };
    }
    onSubmit = () => {
        const { text } = this.state;
        if (text != '') {
            Alert.alert(
                'Success',
                'The post has been created',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
            );
        }
        else {
            Alert.alert(
                'Error',
                'Please try again'
            );
        }
    }
    async createPostButtonPressed() {
        this.setState({ isLoading: true })

        const { text } = this.state
        const { navigate } = this.props.navigation

        var details = {
            'description': text,
        };
        
        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);

            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/api/users/1/posts`, {
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
                    'Success!',
                    'The post has been created.',
                    [
                        { text: "Continue", onPress: () => this.props.navigation.goBack() }
                    ],
                    { cancelable: false }
                )
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors })
                Alert.alert('Error', `Please try again ${error}!`)
            }
        } catch (error) {
            this.setState({ isLoading: false, response: error })

            console.log(error)

            Alert.alert('Error', 'Please try again later')
        }
    }
    render() {
        const { text, name, location, screen } = this.state;
        if (screen === 'SocialFeedScreen') {
            return <SocialFeedScreen />
        }
        return (
            <View style={styles.createPostContainer}>
                <Header
                    backgroundColor="#fff"
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: '#000'}}> Cancel </Text>
                        </TouchableOpacity>
                    }
                    centerComponent={{ text: 'Create Post', style: { fontSize: 22, color: '#1cd8d2' } }}
                    rightComponent={
                        <TouchableOpacity onPress={() => this.createPostButtonPressed()}>
                            <Text style={{ color: '#000' }}> Share </Text>
                        </TouchableOpacity>
                    }
                />
                <View style={styles.userContainer}>
                    <Image
                        source={ProfileImage}
                        style={
                            {
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                    />
                    <TouchableOpacity style={styles.usernameContainer} onPress={this.onNamePressed}>
                        <Text style={styles.usernametext}>{name}</Text>
                        <View style={styles.iconContainer}>
                            <SimpleLineIcons
                                name='location-pin'
                                color='#000'
                                size={20}
                                style={{ paddingRight: 5 }}
                            />
                            <Text style={styles.iconNumber}>Add location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textInputContainer}
                        placeholder={"What's on your mind?"}
                        multiline={true}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    createPostContainer: {
        flex: 1,
    },
    feedContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    userContainer: {
        borderStyle: 'solid',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 15
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    usernameContainer: {
        paddingLeft: 10
    },
    locationtext: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontWeight: "300",
        fontSize: 16,
    },
    usernametext: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontWeight: "700",
        fontSize: 17,
        paddingBottom: 5
    },
    feedImageContainer: {
        flex: 1,
    },
    feedImage: {
        height: 250

    },
    feedInfoContainer: {
        backgroundColor: '#fff',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInputContainer: {
        flex: 1,
        height: 400,
        fontSize: 25
    }
});
