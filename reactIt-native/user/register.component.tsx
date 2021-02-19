import React from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, registerAction } from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
} from 'react-native';
import style from './account/account-styles';
import emailService from './email/email.service';
import {User} from './user';

interface RegisterProp {
    navigation: any;
}

// User can register for a new account
function RegisterComponent({ navigation }: RegisterProp) {
    const userSelector = (state: UserState) => state.registerUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    function submitForm() {
        userService.getUserByName(user.username).then((regUser) => {
            if(regUser){
                alert('User already exists.');
            } else{
                let emailBanned: boolean;
                // check to make sure user is not using a banned email
                emailService.getEmailAddress(user.email).then((email) =>{
                    if(email){
                        emailBanned = true;
                    } else{
                        console.log('null');
                        emailBanned = false;
                    }

                    // if the email is not banned, create an account
                    if(emailBanned === false){
                        userService.register(user).then((user) => {
                            dispatch(getUser(user));
                        });
                    } else if (emailBanned === true){
                        alert('Email banned. Unable to register.')
                    }
                });
            }
            navigation.navigate('Login');
            dispatch(registerAction(new User()));
        });     
    }
    
    return (
        <View style={style.container}>
        <View style={[style.innercontainer]}>
            <br></br>
            <Text style={style.text}>Username: </Text>
            <TextInput
                style={[style.input, style.text]}
                onChangeText= {(value) => {
                    user.username = value;
                    dispatch(registerAction({ ...user, username: value }))
                }}
                value={user.username}
            />
            <br></br>
            <Text style={style.text}>Password: </Text>
            <TextInput
                secureTextEntry
                style={[style.input, style.text]}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, password: value }))
                }
                value={user.password}
            />
            <br></br>
            <Text style={style.text}>Name: </Text>
            <TextInput
                style={[style.input, style.text]}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, name: value }))
                }
                value={user.name}
            />
            <br></br>
            <Text style={style.text}>Email: </Text>
            <TextInput
                style={[style.input, style.text]}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, email: value }))
                }
                value={user.email}
            />
            <br></br>
            <Text style={style.text}>Age: </Text>
            <TextInput
                
                style={[style.input, style.text]}
                onChangeText={(value) =>

                    dispatch(registerAction({ ...user, age: Number(value) }))
                }
            />
            <br></br>
            <Text style={style.text}>Phone Number: </Text>
            <TextInput
                style={[style.input, style.text]}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, phonenumber: value }))
                }
                value={user.phonenumber}
            />
            <br></br>
            <Button onPress={submitForm} title='Register' color='green' />
            </View>
        </View>
    );
}

export default RegisterComponent;