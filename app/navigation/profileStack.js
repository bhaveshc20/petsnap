import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';

export default StackNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    PostDetail: {
        screen: PostScreen,
    },
    EditProfile: {
        screen: ProfileScreen
    }

});