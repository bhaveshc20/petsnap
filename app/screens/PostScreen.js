import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import { StackNavigator } from 'react-navigation';

import { POST_DETAILS_MOCK_DATA } from '../utils/comments';
import { FlatList } from 'react-native-gesture-handler';

export default class PostScreen extends React.Component {
    static navigationOptions = {
        title: 'Post ',
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
        headerTintColor: '#1cd8d2',
        headerTitleStyle: { color: '#1cd8d2', fontSize: 25 }
    };
    constructor(props) {
        super(props);
        const { member } = props.navigation.state.params
        this.state = {
            screen: 'PostScreen',
            member: member
        };
    }
    onNamePressed = () => {
        onPress = this.setState({ screen: 'ProfileScreen' });
    }
    membersComment(comment) {
        return (
            <View style={styles.commentContainer} key={comment}>
                <View style={styles.userCommentContainer}>
                    <Image
                        source={{ uri: comment.user.image }}
                        style={
                            {
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                    />
                    <TouchableOpacity style={styles.usernameCommentContainer} onPress={this.onNamePressed}>
                        <Text style={styles.usernameCommenttext}>{comment.user.name}</Text>
                        <Text style={styles.locationCommenttext}>{comment.content}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        const { screen } = this.state;
        const {member} = this.state;
        if (screen === 'ProfileScreen') {
            return <ProfileScreen />
        }
        return (
            <ScrollView style={styles.scrollContainer}>
            <View style={styles.feedContainer} key={member}>
                <View style={styles.feedImageContainer}>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: member.post.image }}
                            style={styles.feedImage}></Image>
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
                    keyExtractor={(item, index) => index}
                    data={POST_DETAILS_MOCK_DATA}
                    renderItem={({ item, index }) => this.membersComment(item)}
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
