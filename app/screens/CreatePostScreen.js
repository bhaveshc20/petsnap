import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, ImageEditor, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input, Header } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { Entypo, Ionicons } from '@expo/vector-icons';

import { ENV_URL, getUserId } from '../utils/auth';

export default class CreatePostScreen extends React.Component {
    constructor(props) {
        super(props);
        const { member } = props.navigation.state.params
        this.state = {
            image: null,
            member,
            postText: '',
            location: 'Add Location',
        };
    }

    async componentDidMount() {
        getUserId()
            .then(res => this.setState({ userId: res }))
            .catch(err => { console.log(err); alert("An error occurred") });
    }

    async createPostButtonPressed() {
        this.setState({ isLoading: true })

        const { text, image, postText } = this.state
        const { navigate } = this.props.navigation

        var details = {
        };

        if (image !== null) {
            details.image = image
        }

        if (postText !== null && postText.length > 0) {
            details.description = postText
        }

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);

            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        try {
            let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}/posts`, {
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

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            console.log('Profile Image cancelled');
            return;
        }

        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: result.width, height: result.height },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });

        // this gives you a rct-image-store URI or a base64 image tag that
        // you can use from ImageStore

        const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: resizedUri,
            name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
            type: "image/png"
        }

        const options = {
            keyPrefix: "uploads/",
            bucket: "daug",
            region: "us-east-1",
            accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
            secretKey: "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",
            successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");

            console.log(response.body);

            this.setState({ image: response.body.postResponse.location });
        });
    };

    returnImage(image) {
        this.setState({ image: image })
        console.log(image)

        const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: image,
            name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
            type: "image/png"
        }

        const options = {
            keyPrefix: "uploads/",
            bucket: "daug",
            region: "us-east-1",
            accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
            secretKey: "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",
            successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");

            console.log(response.body);

            this.setState({ image: response.body.postResponse.location });
        });
    }

    _renderProfileImage(image) {
        if (image) {
            return (
                <Image source={{ uri: image }} style={styles.avatar} />
            )
        }
    }
    // onSubmit = () => {
    //     const { text } = this.state;
    //     if (text != '') {
    //         Alert.alert(
    //             'Success',
    //             'The post has been created',
    //             [
    //                 { text: 'OK', onPress: () => this.props.navigation.goBack() },
    //             ],
    //         );
    //     }
    //     else {
    //         Alert.alert(
    //             'Error',
    //             'Please try again'
    //         );
    //     }
    // }

    render() {
        const { postText, location, image, member } = this.state;
        return (
            <View style={styles.createPostContainer}>
                <Header
                    backgroundColor="#fff"
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: '#000' }}> Cancel </Text>
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
                    {this._renderProfileImage(member["profile_image"])}
                    <TouchableOpacity style={styles.usernameContainer}>
                        <Text style={styles.usernametext}>{member && member.name}</Text>
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
                <View style={styles.shareImageContainer}>
                    <View style={styles.uploadImageContainer}>
                        <TouchableOpacity onPress={() => this._pickImage()}>
                            <Ionicons
                                name='md-image'
                                size={45}
                                color='#FEE282'
                                style={styles.photoPostIcon}
                            />
                            <Text style={styles.photoLabel}>Upload from library</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.image ?
                    <View style={styles.photoShow}>
                        <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" />
                    </View> :
                    <View></View>
                }
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textInputContainer}
                        placeholder={"What's on your mind?"}
                        editable={true}
                        multiline={true}
                        value={postText}
                        onChangeText={(text) => this.setState({ postText: text })}
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
    },
    shareImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    uploadImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoLabel: {
        color: '#737373'
    },
    photoPostIcon: {
        alignSelf: 'center',
    },
    postImage: {
        width: '100%',
        height: 250,
    },
    photoShow: {
        width: '100%',
        height: 250,
    },
});
