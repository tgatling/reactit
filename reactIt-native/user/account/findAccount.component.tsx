import React from 'react';
import userService from '../user.service';
import { UserState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {searchUserAction} from '../../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
} from 'react-native';
import style from './account-styles';
import {useNavigation} from '@react-navigation/native';

// Site moderator is able to find a specific account using the username
function FindAccountComponent() {
    const userSelector = (state: UserState) => state.searchUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
 
    function submitForm() {
        userService.getUserByName(user.username).then((returnedUser) => {
            dispatch(searchUserAction(returnedUser));
        });
        navigation.navigate('SearchedProfile');
    }

    return (
        <View>
            
            <TextInput
                style={style.input}
                onChangeText={(value) => 
                    dispatch(searchUserAction({ ...user, username: value }))
                }
                placeholder='Find User'
            />
            <br></br>
            <Button onPress={submitForm} title='Submit' color='green' />
        </View>
    )
}

export default FindAccountComponent;
