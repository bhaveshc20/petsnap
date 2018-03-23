import { StackNavigator } from 'react-navigation';

import socialFeedStack from './socialFeedStack';
import CreatePostScreen from '../screens/CreatePostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export default StackNavigator({
    SocialFeed: {
        screen: socialFeedStack,
    },
    CreatePost: {
        screen: CreatePostScreen,
    },
}, {
        initialRouteName: 'SocialFeed',
        mode: 'modal',
        headerMode: 'none'
    });