import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import { ENV_URL, getUserId } from '../utils/auth';

import { POST_DETAILS_MOCK_DATA } from '../utils/comments';
import { FlatList } from 'react-native-gesture-handler';

export default class PostScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Post ',
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
        headerTintColor: '#1cd8d2',
        headerTitleStyle: { color: '#1cd8d2', fontSize: 25 }
    });
    constructor(props) {
        super(props);
        const postId = props.navigation.state.params && props.navigation.state.params.postId
        this.state = {
            postId: postId || null,
            member: null,
            comment: null
        };
    }
    async componentWillMount() {
        const { postId } = this.state

        if (postId === null) {
            Alert.alert(
                'Unable to display Post!',
                'Please try again later',
                [
                    {
                        text: "OK", onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }
                ],
                { cancelable: false }
            )
        } else {
            this.fetchPosts()
        }

        getUserId()
            .then(res => {
                this.setState({ userId: res })
                this.fetchUser()
            })
            .catch(err => {
                alert("An error occurred")
            });

        this.setState({ fontLoaded: true });
    }


    async fetchPosts() {
        this.setState({ isLoading: true })
        const { postId } = this.state;

        try {
            let response = await fetch(`${ENV_URL}/api/posts/${postId}`, {
                method: 'GET',
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.setState({
                    isLoading: false,
                    member: responseJSON
                });
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors })
                Alert.alert('failed!', `Unable to load posts.. ${error}!`)
            }
        } catch (error) {
            this.setState({ isLoading: false, response: error })

            console.log(error)

            Alert.alert('failed ', 'Please try again later')
        }
    }

    async fetchUser() {
        this.setState({ isLoading: true });

        try {
            let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}`, {
                method: 'GET'
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON);

                this.setState({ user: responseJSON, isLoading: false })
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log("failed" + error);
            }
        } catch (error) {
            console.log("failed" + error);
        }
    }

    _renderPostImage = (image) => {
        if (image) {
            return (
                <Image
                    source={{ uri: image }}
                    style={styles.feedImage}
                />
            )
        }
    }

    displayComments(comment, index) {
        const {navigate} = this.props.navigation
        return (
            <View style={styles.commentContainer} key={index}>
                <View style={styles.userCommentContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', (comment.user.id == this.state.userId) ? { isHeaderShow: false, userId: comment.user.id } : { isHeaderShow: true, userId: comment.user.id })}>
                    <Image
                        source={{ uri: comment.user.profile_image }}
                        style={
                            {
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.usernameCommentContainer} onPress = {() => navigate('Profile', { userId: comment.user.id })}>>
                        <Text style={styles.usernameCommenttext}>{comment.user.name}</Text>
                        <Text style={styles.locationCommenttext}>{comment.description}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderComments(){
        const {comments} = this.state;
    }
    render() {
        const {member} = this.state;
        return (
            <ScrollView style={styles.scrollContainer}>
            <View style={styles.feedContainer} key={member}>
                <View style={styles.feedImageContainer}>
                    <TouchableOpacity>
                        {this._renderPostImage(member.user["profile_image"])}
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Text>{member.post.date}</Text>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name='comment-o'
                            color='#000'
                            size={20}
                            style={{ paddingRight: 5 }}
                        />
                        <Text style={styles.iconNumber}>10</Text>
                        <FontAwesome
                            name='heart-o'
                            size={20}
                            color='red'
                            style={{ paddingLeft: 20, paddingRight: 5 }} />
                        <Text style={styles.iconNumber}>200</Text>
                    </View>
                </View>
            </View>
                <View style={styles.commentContainer}>
                    <Text style={{ fontSize: 17, paddingLeft:10, color: '#1cd8d2' }}>8 Comments
                    </Text>
                </View>
                <View style={styles.commentContainer}>
                <FlatList
                    data={POST_DETAILS_MOCK_DATA}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => this.membersComment(item)}
                />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    commentContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    commentContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    userContainer: {
        borderStyle: 'solid',
        flexDirection: 'row',
        paddingLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userCommentContainer: {
        borderStyle: 'solid',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    usernameContainer: {
        paddingLeft: 10
    },
    usernameCommentContainer: {
        paddingLeft: 10
    },
    locationtext: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontWeight: "300",
        fontSize: 16,
    },
    locationCommenttext: {
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
    usernameCommenttext: {
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
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'

    }
});
