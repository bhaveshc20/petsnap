import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'
import EditProfileScreen from '../../app/screens/EditProfileScreen';
import IntroScreen from '../../app/screens/IntroScreen';
import { StackNavigator } from 'react-navigation';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile ',
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
        headerTintColor: '#1cd8d2',
        headerTitleStyle: { color: '#1cd8d2', fontSize: 25 }
};
    constructor(props) {
        super(props);

        const user = props.navigation.state.params && props.navigation.state.params.user
        const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

        this.state = {
            user: user || null,
            isHeaderShow: isHeaderShow || false
        };
    }

    componentDidMount() {
        this.fetchPosts()
    }

    async fetchPosts() {

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/api/users/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.setState({ isLoading: false, profile: responseJSON });
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors })
                Alert.alert('failed!', `Unable to load profile.. ${error}!`)
            }
        } catch (error) {
            this.setState({ isLoading: false, response: error })

            console.log(error)

            Alert.alert('failed ', 'Please try again later')
        }
    }

    _renderBanner = (image) => {
        if(image){
            return(
                <Image
                    source={{ uri: image }}
                    style={styles.imageCover}
                    resizeMode="cover"
                />
            )
        }
        else{
            return(
                <View
                    style={styles.defaultCover}
                />
            )
        }
    }

    _renderProfileImage = (image) => {
        if (image) {
            return (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginTop: -30,
                        borderWidth: 5,
                        borderColor: 'white'
                    }}
                />
            )
        }
    }
    _renderName(name) {
        if (name) {
            return (
                <Text style={styles.nameText}>{name}</Text>
            )
        }
    }
    _renderBio(bio) {
        if (bio) {
            return (
                <Text style={styles.descText}>{bio}</Text>
            )
        }
    }

    render() {
        const { isLoading, profile, user } = this.state
        console.log(profile);
        return (
            <View style={styles.container}>
                <View style={styles.coverContainer}>
                    <View style={styles.coverImageContainer}>
                        {this._renderBanner(profile && profile.banner_image)}
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoInnerContainer}>
                            <View style={styles.profileImageContainer}>
                                {this._renderProfileImage(profile && profile.profile_image)}
                            </View>
                            <View style={styles.profileInfoContainer}>
                                <View style={styles.infoStatsContainer}>
                                    <View style={styles.statsContainer}>
                                        {/* <Text style={styles.infoText}>{profile.posts.length}</Text> */}
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
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('EditProfile')}
                                        style={styles.editButton} >
                                        <Text style={styles.editText}> Edit Profile </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userProfileContainer}>
                            <View style={styles.userInfoContainer}>
                                {this._renderName(profile && profile.name)}
                                {this._renderBio(profile && profile.bio)}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.userFeedContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Intro')}
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
    defaultCover: {
        backgroundColor: '#1cd8d2',
        height: 200,
        width: '100%'
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
