import { StackNavigator } from 'react-navigation';

import socialFeedStack from './socialFeedStack';
import CreatePostScreen from '../screens/CreatePostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export default StackNavigator({
    socialFeedStack: {
        screen: socialFeedStack,
    },
    CreatePost: {
        screen: CreatePostScreen,
    },
}, {
        initialRouteName: 'socialFeedStack',
        mode: 'modal',
        headerMode: 'none'
    });