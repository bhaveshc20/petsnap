import { StackNavigator } from 'react-navigation';
import introStack from './introStack';
import HomeTabs from './homeTabs';

export default StackNavigator({
    Intro: {
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