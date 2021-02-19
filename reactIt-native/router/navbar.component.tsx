import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ForumState } from '../store/store';
import styles from './navstyle';
import navstyles from './routerstyle';
import I18n, { strings } from '../i18n';
import { changeLocale, getUser } from '../store/actions';
import { User } from '../user/user';

/**
 * Navbar at the top of the page which we use to hold our welcome message and a button that can be used
 * to access the user settings page.
 */
function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: ForumState) => state.user);
    //const locale = useSelector((state: GrubState) => state.locale);
    const dispatch = useDispatch();
        return (
        <View style={styles.row}>
            {user.username?(
                <Button
                onPress={() => {
                    nav.navigate('Profile')
                }}
                title={strings('nav.welcome', { name: user.name })}
                color='navy'
            />
            ):(
                <></>
            )}
            {user.username?(
                <Button
                onPress={() => {
                    nav.navigate('Login')
                    dispatch(getUser(new User()));
                }}
                title={"Logout"}
            />
            ):(
                <></>
            )}
            
        </View>
    );
}

export default NavBarComponent;