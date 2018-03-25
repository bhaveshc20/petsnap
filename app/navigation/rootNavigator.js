import { StackNavigator } from 'react-navigation';
import introStack from './introStack';
import HomeTabs from './homeTabs';
import socialModal from './socialModal';
import PostScreen from '../screens/PostScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

export default StackNavigator({
    Intro: {
        // screen: introStack
        screen: introStack
    },
    Home: {
        screen: HomeTabs
    },
}, {
        initialRouteName: 'Intro',
        mode: 'modal',
        headerMode: 'none'
    });