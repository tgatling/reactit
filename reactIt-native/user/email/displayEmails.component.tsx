import React, {useEffect} from 'react';
import emailService from '../email/email.service';
import { View, Text } from 'react-native';
import { EmailState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBanned} from '../../store/actions';
import style from '../account/account-styles';

// Display list of emails banned from registration
function DisplayEmailComponent() {
    const emailSelector = (state: EmailState) => state.emails;
    const emails = useSelector(emailSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        emailService.getAllBanned().then((emailAddresses) =>{
            dispatch(getAllBanned(emailAddresses));
        });        
    }, []);

    return (
        <View>
            <br></br>
            <Text style = {style.text}>Banned Emails</Text>
            <br></br>
             {emails.map((email) => {
                    return (
                        <View key={email.address}>
                            <Text>{`Email Address: ${email.address}`}</Text>
                            <Text>{`Username: ${email.username}`}</Text>
                            <Text>{`Reason Banned: ${email.reason}`}</Text>
                            <Text>{`Banned by: ${email.bannedBy}`}</Text>
                            <Text>---------------------------------</Text>
                            <br></br>
                        </View>
                    );
                })}   
            <br></br>
        </View>
    );
}

export default DisplayEmailComponent;
