import { StackNavigator } from 'react-navigation';
import profileStack from './profileStack';
import EditProfileScreen from '../screens/EditProfileScreen';

export default StackNavigator({
    ProfileStack: {
        screen: profileStack,
    },
    EditProfile: {
        screen: EditProfileScreen,
    },
}, {
    initialRouteName: 'ProfileStack',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
});