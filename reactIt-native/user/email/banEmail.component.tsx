import React from 'react';
import emailService from '../email/email.service';
import { Button, TextInput, View, Text } from 'react-native';
import {UserState, EmailState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import DisplayEmailComponent from './displayEmails.component';
import style from '../account/account-styles';
import {changeEmail} from '../../store/actions';
import userService from '../user.service';

export interface EmailProp {
    navigation: any;
}

// Ban email address from registration
function BanEmailComponent({navigation}: EmailProp) {
    const userSelector = (state: UserState) => state.user;
    const emailSelector = (state: EmailState) => state.email;
    const currUser = useSelector(userSelector);
    const email = useSelector(emailSelector);
    const dispatch = useDispatch();

    function submitForm() {
        // Set current user as the moderator that banned email
        email.bannedBy = currUser.username;
        // Add banned email to the database and update state for confirmation
        console.log(email);
        emailService.addEmailAddress(email).then((bannedEmail) => {
            dispatch(changeEmail(bannedEmail));
            userService.getUserByName(email.username).then((bannedUser) => {
                if(bannedUser){
                    console.log(bannedUser);
                    bannedUser.accountstatus = 'BANNED';
                    userService.updateUser(bannedUser).then((result)=>{
                        console.log(result);
                    });
                }
            });
        });
        //Confirmation of ban
        alert(`${email.address} has been banned from registration.`)
        navigation.navigate('Home');
    }

    return (
        <View style = {style.container}>
            <View style={[style.innercontainer]}>
                <br></br>
                <Text style={style.text}>Enter information to ban an email from registration: </Text>
                <br></br>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeEmail({ ...email, address: value }))
                    }                placeholder='Email Address'
                />
                <br></br>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeEmail({ ...email, username: value }))
                    }                placeholder='Username'
                />
                <br></br>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeEmail({ ...email, reason: value }))
                    }                placeholder='Reason for Ban'
                />
                <br></br>
                <Button onPress={submitForm} title='Submit' color='green' />
                <br></br>
                <DisplayEmailComponent/>
            </View>
        </View>
    );
}

export default BanEmailComponent;
