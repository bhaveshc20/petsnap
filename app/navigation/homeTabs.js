import React from 'react';
import { Platform } from 'react-native';

import { TabNavigator } from 'react-navigation';
import { SimpleLineIcons } from '@expo/vector-icons';
import SocialFeedScreen from '../screens/SocialFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';



const HomeTabs = TabNavigator({
    SocialTab: {
        screen: SocialFeedScreen,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons
                    name='layers'
                    color={tintColor}
                    size={Platform.OS === 'ios' ? 22 : 25}
                />
            )
        }
    },
    ProfileTab: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons
                    name='user'
                    color={tintColor}
                    size={Platform.OS === 'ios' ? 22 : 25}
                />
            )
        }
    }
}, {
        initialRouteName: 'SocialTab',
        tabBarPosition: 'bottom',
        animationEnabled: Platform.OS === 'ios' ? false : true,
        swipeEnabled: Platform.OS === 'ios' ? false : true,
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: '#1cd8d2',
            inactiveTintColor: '#999999',
            style: {
                backgroundColor: '#ffffff',
                padding: Platform.OS === 'ios' ? 5 : 0,
            },
            indicatorStyle: {
                backgroundColor: 'white'
            },
            labelStyle: {
                fontSize: 12
            }
        }
    });

export default HomeTabs;