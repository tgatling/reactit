import React, {useEffect} from 'react';
import { UserState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Text,
    View,
    Image
} from 'react-native';
import style from './account-styles';
import FindAccountComponent from './findAccount.component';

interface ModifyUserProp {
    navigation: any;
}

// Display profile of current user and user options
function UserProfileComponent({ navigation }: ModifyUserProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    // Account holder modifications to account
    function goToModify(){
        navigation.navigate('ModifyUser');
    }

    // Site moderators can ban specific emails and view emails already banned
    function goToBanEmail(){
        navigation.navigate('BannedEmails');
    }

    return (
        <View style={[style.container, style.login]}>
            <br></br>
            <Text style={style.text}>{user.username}</Text>
            <br></br>
            <Image 
                source={{uri:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'}}
                style = {{width: 100, height: 100}}
                />
            <br></br>
            <Text style={style.text}>Name: {user.name}</Text>
            <Text style={style.text}>Email: {user.email}</Text>
            <Text style={style.text}>Age: {user.age}</Text>

            <br></br>
            <Button onPress={goToModify} title='Modify Account' color='green' />
            <br></br>
            {user.role === 'Site Moderator' &&(
                <>
                <FindAccountComponent/>
                <br></br>
                <Button onPress={goToBanEmail} title='Ban Email Address' color='green'/>
                </>
            )}
        </View>
    )
}

export default UserProfileComponent;
