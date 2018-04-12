import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import { Provider } from 'react-redux'
import { ENV_URL, getUserId } from '../utils/auth';
import { Icon } from 'react-native-elements'

import { StackNavigator } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

export default class SocialFeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Daug ',
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
        headerTintColor: '#1cd8d2',
        headerTitleStyle: { color: '#1cd8d2', fontSize: 25 }
    });
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            posts: null,
            postId: null
        };
    }

    componentDidMount() {
        this.fetchPosts()
        getUserId()
            .then(res => {
                this.setState({ userId: res })
                this.fetchUser()
            })
            .catch(err => {
                alert("An error occurred")
            });
    }

    async fetchPosts() {
        this.setState({ isLoading: true });
        const { postId } = this.state
        try {
            let response = await fetch(`${ENV_URL}/api/feed`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.setState({
                    isLoading: false,
                    posts: responseJSON
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

    _renderProfileImage = (image) => {
        if (image) {
            return (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                    }}
                />
            )
        }
        else {
            return (
                <View
                    style={styles.defaultProfileAvatar}
                >
                </View>
            )
        }
    }
    _renderFeedImage = (image) => {
        if (image) {
            return (
                <Image
                    source={{ uri: image }}
                    style={styles.feedImage}
                    resizeMode="cover"
                />
            )
        }
    }

    _renderPostCaption = (description) => {
        if (description) {
            return (
                <Text style={styles.feedInfo}>{description}</Text>
            )
        }
    }

    _membersList(member) {
        const { user } = this.state;
        return (
            <View style={styles.feedContainer} key={member}>
                <View style={styles.userContainer}>
                    <TouchableOpacity style={styles.usernameContainer}
                        onPress={() => this.props.navigation.navigate('Profile', (member.user.id == this.state.userId) ? { isHeaderShow: false, userId: member.user.id } : { isHeaderShow: true, userId: member.user.id })}>
                        {this._renderProfileImage(member.user["profile_image"])}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Profile', (member.user.id == this.state.userId) ? { isHeaderShow: false, userId: member.user.id } : { isHeaderShow: true, userId: member.user.id })}
                    >
                        <Text style={styles.usernametext}>{member.user.name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.locationtext}>{member.location}</Text>
                </View>
                <View style={styles.feedImageContainer}>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('Post', { postId: member.id })
                    }>
                        {this._renderFeedImage(member["image"])}
                        <View style={styles.feedInfoContainer}>
                            {this._renderPostCaption(member["description"])}
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.buttonContainer}>
                    {/* <Text>{member.post.date}</Text> */}
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Post', { postId: member.id })
                        }
                        >
                        <FontAwesome
                            name='comment-o'
                            color='#000'
                            size={20}
                            style={{ paddingRight: 5 }}
                        />
                        <Text style={styles.iconNumber}>{member.comments.length}</Text>
                        </TouchableOpacity>
                        <FontAwesome
                            name='heart-o'
                            size={20}
                            color='red'
                            style={{ paddingLeft: 20, paddingRight: 5 }} />
                        <Text style={styles.iconNumber}>200</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { isLoading, posts, user, postId } = this.state;
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost', { member: user })}>
                        <Text style={{ fontSize: 17, color: '#1cd8d2' }}>Create post</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name='image'
                            color='#000'
                            size={20}
                            style={{ paddingRight: 5 }}
                        />
                        <FontAwesome
                            name='rss'
                            size={20}
                            color='#000'
                            style={{ paddingLeft: 20, paddingRight: 5 }}
                        />
                    </View>
                </View>
                <FlatList
                    data={posts}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => this._membersList(item)}
                    onRefresh={() => this.getFeed()}
                    refreshing={isLoading}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
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

    }
});
