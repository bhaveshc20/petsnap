import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export default StackNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    PostDetail: {
        screen: PostScreen,
    },
    EditProfile: {
        screen: EditProfileScreen,
    },
},
{
    initialRouteName: 'Profile'
});