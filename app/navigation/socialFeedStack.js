import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

export default StackNavigator({
    SocialFeed: {
        screen: SocialFeedScreen,
    },
    Post: {
        screen: PostScreen,
    },
    Profile: {
        screen: ProfileScreen,
    }
},
{
    initialRouteName: 'SocialFeed'
});