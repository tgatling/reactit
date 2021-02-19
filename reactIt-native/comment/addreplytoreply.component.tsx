import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import {
    Button,
    TextInput,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommentState, ThreadState, UserState } from '../store/store';
import { addReplyToReply, tempReply } from '../store/actions';
import commentService from '../comment/comment.service';
import style from './thread_comment_style';
import image from '../threads/alien.jpg'

interface ReplyToReplyProp {
    navigation: any,
    route: RouteProp<StackParams, 'ReplyToReply'>;
}

export function AddReplyToReplyComponent(props: ReplyToReplyProp) {
    const userContext = useSelector((state: UserState) => state.user);
    const rtr = useSelector((state: CommentState) => state.reply_to_reply);
    let temp = useSelector((state: ThreadState) => state.temp);

    const parentReply = props.route.params;
    const author = rtr.username = userContext.username;
    const id = rtr.reply_id = Number(parentReply?.thread_reply_id);
    console.log(id);

    const dispatch = useDispatch();

    function submit() {
        console.log(rtr);
        commentService.insertReplyToReply(rtr);
        setTimeout(() => {
            temp += 1;
            dispatch(tempReply(temp));
            props.navigation.navigate('ThreadDetail');

        }, 700);
    }

    return (
        <ImageBackground source={image} style={[style.image]}>
            <View style={[style.container]}>
                <Text style={[style.add]}>Author: {author}</Text>
                <Text style={[style.add]}>Title: </Text>
                <TextInput 
                    style={[style.add]}
                    onChangeText={(value) =>
                        dispatch(addReplyToReply({ ...rtr, thread_reply_to_reply_name: value }))
                }
                    value={rtr.thread_reply_to_reply_name}>
                </TextInput>
                <Text style={[style.add]}>Reply: </Text>
                <TextInput multiline numberOfLines={4} style={[style.add]}
                    onChangeText={(value) =>
                        dispatch(addReplyToReply({ ...rtr, thread_reply_to_reply_description: value }))
                    }
                    value={rtr.thread_reply_to_reply_description}>
                </TextInput>

                <Button title='Add the reply' color = 'green' onPress={submit} />
            </View>
        </ImageBackground>
    )
}