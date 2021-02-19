import React from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {changeLocale, changeUser} from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
} from 'react-native';
import I18n from '../i18n';
import AccountStatusComponent from './account/accountStatus.component';
import style from './account/account-styles'

export interface ModifyUserProp {
    navigation: any;
}

// Account holder can make modifications to their own account information
function ModifyUserComponent({ navigation }: ModifyUserProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    let age = String(user.age);

    // Update the state and navigate back to home page
    function submitForm() {
        userService.updateUser(user).then(() => {
            navigation.navigate('Home');
        });
        console.log(user);

    }


    // Account status component called to give options regarding activating and deactivating account
    return (
        <View style={style.container}>
            <br></br>
            <View style={style.innercontainer}>
                <Text style={style.text}>Password: </Text>
                <TextInput
                    secureTextEntry
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeUser({ ...user, password: value }))
                    }
                    placeholder='Password Hidden'
                />
                <br></br>
                <Text style={style.text}>Name: </Text>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) => 
                        dispatch(changeUser({ ...user, name: value }))
                    }
                    placeholder={user.name}
                />
                <br></br>
                <Text style={style.text}>Email: </Text>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeUser({ ...user, email: value }))
                    }
                    placeholder={user.email}
                />
                <br></br>
                <Text style={style.text}>Age: </Text>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeUser({ ...user, age: Number(value) }))
                    }
                    placeholder = {age}
                />
                <br></br>
                <Text style={style.text}>Phone Number: </Text>
                <TextInput
                    style={[style.input, style.text]}
                    onChangeText={(value) =>
                        dispatch(changeUser({ ...user, phonenumber: value }))
                    }
                    placeholder={user.phonenumber}
                />
                <br></br>
                <Button onPress={submitForm} title='Update' color='green' />
                <br></br>
                <Text style={style.text}>Language Options: </Text>
                {I18n.locale === 'fr' ? (
                    <Button
                        onPress={() => {
                            I18n.locale = 'en';
                            dispatch(changeLocale('en'))
                        }}
                        title='EN'
                    />
                ) : (
                    <Button
                        onPress={() => {
                            I18n.locale = 'fr';
                            dispatch(changeLocale('fr'))
                        }}
                        title='FR'
                        color='green'
                    />
                )}
                <br></br>
                <Text style={style.text}>Account Options: </Text>
                <AccountStatusComponent user={user}/>
            </View>
        </View>
    )
}

export default ModifyUserComponent;
