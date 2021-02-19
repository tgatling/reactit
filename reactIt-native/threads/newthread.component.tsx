import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadState, UserState } from '../store/store';
import {
    Button,
    TextInput,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import style from './thread_table_style';
import { addThread, getThreads } from '../store/actions';
import threadService from './thread.service';
import { Switch } from 'react-native';
import background from './alien.jpg'
import { Reaction } from './reaction';

interface NewThreadProp {
    navigation: any
}
/**
 * Component for creating a new thread.
 * @param param0 is navigator.
 */
export default function NewThreadComponent({ navigation }: NewThreadProp) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);
    let threadsState = useSelector((state: ThreadState) => state.threads);
    const user = useSelector((state: UserState) => state.user);
    const author = th.username = user.username;
    const [isSelected, setSelection] = useState(true);



    /**
     * Submits a thread once the form is completed.
     */
    async function submitThread() {
        threadService.insertThread(th);
        setTimeout(() => {
            threadService.getAllThreads().then((threads: any) => {
                console.log(threads)
                threadsState = threads;
                navigation.navigate("Home");
                dispatch(getThreads(threadsState));
            })
        }, 1500);

    }
    function setRepliesDisabled() {
        if (isSelected) {
            setSelection(false);
        } else {
            setSelection(true);
        }
        dispatch(addThread({ ...th, repliesdisabled: isSelected }))
    }
    return (
        <ImageBackground source={background} style={[style.vac]}>
            <View style={[style.container]}>
                <Text style={[style.disabled]}>Disable Comments?</Text>
                <Switch
                    style={[style.switch]}
                    value={isSelected}
                    onValueChange={setRepliesDisabled}
                >                </Switch>

                <Text style={style.t}>Author: {author}</Text>
                <br></br>
                <Text style={style.t}>Title: </Text>
                <TextInput style={style.t}
                    onChangeText={(value) =>
                        dispatch(addThread({ ...th, threadname: value }))
                    }
                    value={th.threadname}>
                </TextInput>
                <br></br>
                <Text style={style.t}>Category: </Text>
                <TextInput style={style.t}
                    onChangeText={(value) =>
                        dispatch(addThread({ ...th, threadcategory: value }))
                    }
                    value={th.threadcategory}>
                </TextInput>
                <br></br>
                <TextInput style={style.t} multiline numberOfLines={4}
                    onChangeText={(value) =>
                        dispatch(addThread({ ...th, threaddescription: value }))
                    }
                    value={th.threaddescription}>
                </TextInput>
                <br></br>
                <Button onPress={submitThread} title='Add Thread' color='green' />
            </View>
        </ImageBackground >
    )
}