import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import IntroScreen from '../../app/screens/IntroScreen';

const profile = require('../../assets/profile.jpg');
const cover = require('../../assets/cover.jpg');

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'null',
        };
    }
    render() {
        const { screen } = this.state
        if (screen === 'IntroScreen') {
            return <IntroScreen />
        }
        return (
            <View style={styles.container}>
                <View style={styles.coverContainer}>
                    <View style={styles.coverImageContainer}>
                        <Image
                            source={cover}
                            style={styles.imageCover}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoInnerContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={profile}
                                    style={
                                        {
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            marginTop: -30,
                                            borderWidth: 5,
                                            borderColor: 'white'
                                        }}
                                />
                            </View>
                            <View style={styles.profileInfoContainer}>
                                <View style={styles.infoStatsContainer}>
                                    <View style={styles.statsContainer}>
                                        <Text style={styles.infoText}>1</Text>
                                        <Text style={styles.infoText}>Posts</Text>
                                    </View>
                                    <View style={styles.statsContainer}>
                                        <Text style={styles.infoText}>281</Text>
                                        <Text style={styles.infoText}>Followers</Text>
                                    </View>
                                    <View style={styles.statsContainer}>
                                        <Text style={styles.infoText}>124</Text>
                                        <Text style={styles.infoText}>Following</Text>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.editButton}>
                                        <Text style={styles.editText}> Edit Profile </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userProfileContainer}>
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.nameText}>Max</Text>
                                <Text style={styles.descText}>Yo! Wanna bhow bhow together?</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.userFeedContainer}>
                    <TouchableOpacity
                        onPress={() => this.setState({ screen: 'IntroScreen' })}
                        style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}> Log Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverContainer: {
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    imageCover: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        flex: 1
    },
    infoInnerContainer: {
        flex:2,
        flexDirection: 'row'
    },
    profileImageContainer: {
        flex: 1,
        marginLeft: 25,
        marginRight: 25
    },
    profileInfoContainer: {
        flex: 3,
        flexDirection: 'column'
    },
    infoStatsContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        height: 20,
        width: 170, 
        marginLeft: 30
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,

    },
    editText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
    },
    statsContainer: {
    
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    userInfoContainer: {
        
        paddingLeft: 25,
    },
    nameText: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 5
    },
    descText: {
        fontSize: 16,
    },
    userFeedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButton: {
        width: 170,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#33ACE9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButtonText: {
        fontSize: 20,
        color: 'white'
    }


    

});
