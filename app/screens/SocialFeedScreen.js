import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ProfileScreen from '../../app/screens/ProfileScreen';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constant';
import { FlatList } from 'react-native-gesture-handler';

export default class SocialFeedScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'SocialFeedScreen',
        };
    }
    onNamePressed = () => {
        onPress=this.setState({ screen: 'ProfileScreen' });
    }
    render() {
        const {screen} = this.state;
        if (screen === 'ProfileScreen') {
            return <ProfileScreen />
        }
        return (
            <ScrollView style={styles.scrollContainer}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={SOCIAL_FEED_MOCK_DATA}
                    renderItem={({ item, index }) => (
                        <View style={styles.feedContainer}>
                            <View style={styles.userContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={
                                        {
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30
                                        }}
                                />
                                <TouchableOpacity style={styles.usernameContainer} onPress={this.onNamePressed}>
                                    <Text style={styles.usernametext}>{item.name}</Text>
                                    <Text style={styles.locationtext}>{item.location}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.feedImageContainer}>
                                <Image
                                    source={{ uri: item.post.image }}
                                    style={styles.feedImage}></Image>
                                <View style={styles.feedInfoContainer}>
                                    <Text style={styles.feedInfo}>{item.post.caption}</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Text>{item.post.date}</Text>
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
                                        style={{ paddingLeft: 20,paddingRight: 5 }} />
                                    <Text style={styles.iconNumber}>200</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop:40,
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
        backgroundColor: '#F9F9F9',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'

    }
});
