import React from 'react';
import userService from '../user.service';
import { UserState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../store/actions';
import { Button, View } from 'react-native';
import { User } from '../user';
import {useNavigation} from '@react-navigation/native';

interface statusProp {
    user: User;
}

// Determines account status of specific account and the options of the user based on role.

function AccountStatusComponent(prop: statusProp) {
    // prop is the user that account is being modified
    // current user determines the role of user and options to display
    // if current user is the prop user, account is being modified by account holder
    const userSelector = (state: UserState) => state.user;
    const currUser = useSelector(userSelector);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // update account status of the account modified
    function update() {
        userService.updateUser(prop.user).then(() => {});
        // if the account holder makes changes update the state to reflect changes
        if (currUser.username === prop.user.username) {
            dispatch(changeUser(prop.user));
        }
    }

    // account holder actions
    function deactivateAccount() {
        prop.user.accountstatus = 'deactivated';
        update();
    }

    function activateAccount() {
        prop.user.accountstatus = 'activated';
        update();
        navigation.navigate('Home');
    }

    // site moderator actions
    function moderatorDeactivated() {
        // moderator-deactivation does NOT allow account holder to reactivate account.
        prop.user.accountstatus = 'moderator-deactivated';
        update();
    }

    function moderatorActivated() {
        prop.user.accountstatus = 'activated';
        update();
    }

    // account holder or site moderator can delete account
    function deleteAccount() {
        userService.deleteUser(prop.user.username).then(() => {});
        if(currUser === prop.user){
            dispatch(changeUser(new User()));
            navigation.navigate('Login');
        } else{
            alert(prop.user.username+' has been deleted');
            navigation.navigate('Home');
        }
    }

    return (
        <View>
            {currUser.username === prop.user.username &&
                prop.user.accountstatus === 'activated' && (
                    <View>
                        <Button
                            onPress={deactivateAccount}
                            title='Deactivate'
                            color='green'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='green'
                        />
                    </View>
                )}
            {currUser.username === prop.user.username &&
                prop.user.accountstatus === 'deactivated' && (
                    <View>
                        <Button
                            onPress={activateAccount}
                            title='Activate'
                            color='green'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='green'
                        />
                    </View>
                )}
            <br></br>
            {currUser.role === 'Site Moderator' &&
                prop.user.accountstatus === 'activated' &&
                currUser.username !== prop.user.username && (
                    <View>
                        <Button
                            onPress={moderatorDeactivated}
                            title='Deactivate as Moderator'
                            color='green'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='green'
                        />
                    </View>
                )}
            {currUser.role === 'Site Moderator' &&
                prop.user.accountstatus === 'moderator-deactivated' &&
                currUser.username !== prop.user.username && (
                    <View>
                        <Button
                            onPress={moderatorActivated}
                            title='Activate as Moderator'
                            color='green'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='green'
                        />
                    </View>
                )}
        </View>
    );
}

export default AccountStatusComponent;
