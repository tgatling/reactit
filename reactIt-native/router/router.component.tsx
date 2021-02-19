import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import RegisterComponent from '../user/register.component';
import ModifyUserComponent from '../user/modifyUser.component';
import UserScreenComponent from '../user/account/userProfile.component';
import HomeComponent from './home.component';
import GetProfileComponent from '../user/account/getProfile.component';
import NewThreadComponent from '../threads/newthread.component';
import ThreadDetailComponent from '../threads/thread.detail.component';
import { useSelector } from 'react-redux';
import { ForumState } from '../store/store';
import { Thread } from '../threads/thread';
import { Comment } from '../comment/comment';
import BanEmailComponent from '../user/email/banEmail.component';
import style from './navstyle'
import { AddReplyComponent } from '../comment/addreply.component';
import { AddReplyToReplyComponent } from '../comment/addreplytoreply.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Register: undefined;
    ModifyUser: undefined;
    Profile: undefined;
    SearchedProfile: undefined;
    Home: undefined;
    Threads: undefined;
    NewThread: undefined;
    ThreadDetails: Thread;
    BannedEmails: undefined;
    ThreadDetail: Thread;
    Reply: undefined | Thread;
    ReplyToReply: undefined | Comment;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text style={[style.row]}>ReactIt</Text>,
    headerRight: () => <NavBarComponent/>,
    headerTintColor:"yellow",
    headerStyle: {
        backgroundColor: 'darkgreen',
      },
};
/**
 * Routing component which is used to navigate between all the applications child components.
 */
function RouterComponent(props: any) {
    const th = useSelector((state: ForumState) => state.thread);

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Register'
                component={RegisterComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='ModifyUser'
                component={ModifyUserComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Profile'
                component={UserScreenComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='SearchedProfile'
                component={GetProfileComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='ThreadDetail'
                component={ThreadDetailComponent}
                options={headerOptions}
                initialParams={th}
            />
            <Stack.Screen
                name='Home'
                component={HomeComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='NewThread'
                component={NewThreadComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='BannedEmails'
                component={BanEmailComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Reply'
                component={AddReplyComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='ReplyToReply'
                component={AddReplyToReplyComponent}
                options={headerOptions}
            />
        </Stack.Navigator>

    );
}

export default RouterComponent;