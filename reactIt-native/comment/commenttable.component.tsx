import React, { useEffect } from 'react';
import { Comment, ReplyToReply } from '../comment/comment';
import style from './thread_comment_style';
import {
    Button,
    Text,
    View,
    FlatList,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { UserState, CommentState, ThreadState } from '../store/store';
import { getReplies, tempReply } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import commentService from './comment.service';
import { useNavigation } from '@react-navigation/native';
import RTRTableComponent from './rtr.component';

interface CommentProps {
    data: Comment;
}

export default function CommentTableComponent({ data }: CommentProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    let rep = useSelector((state:CommentState) => state.reply_to_replies);
    let temp = useSelector((state:ThreadState) => state.temp);
    const nav = useNavigation();
    const dispatch = useDispatch();
    console.log(data); 

    useEffect(() => {
        console.log('calling useEffect');
        gettingRepToReps();
    },[temp]);

    function refreshrtr(){
        gettingRepToReps();
    }

    function gettingRepToReps(){
        let r: any;
        console.log('getting replies to replies');
        console.log(data.thread_reply_id);
        commentService.getRepliesToReplies(data.thread_reply_id).then((result) => {
            r = result;
            populate(r);
        });
    }
    
    function populate(rtr: any){
        console.log('populating reply to reply');
        let reply: ReplyToReply[] = [];
        rtr.forEach((row: ReplyToReply) => {
            reply.push(row);
        });
        rep = reply;
        dispatch(getReplies(rep));
    }

    async function deleteRep() {
        try {
            await commentService.deleteReply(data.thread_reply_id);
            setTimeout(() => {
                temp += 1;
                dispatch(tempReply(temp));
            }, 500);
            console.log('Successfully deleted reply');
            // nav.navigate("Home");
        } catch {
            console.log('delete failed');
        }
    }

    function replyToReply(){
        nav.navigate('ReplyToReply', data);
    }
    
    return (
        <View style={[style.h2]}>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                <TouchableHighlight style={[style.highlight]}>
                    <Text style={[style.h2]} onPress={deleteRep}>X</Text>
                </TouchableHighlight>
            )}
            <Text style={[style.card]}>Author: {data.username + ' \n' + data.thread_reply_description}</Text>
            <br></br>
            <TouchableHighlight style = {[style.highlightreply]}>
                <Text style = {[style.replybutton]} onPress={replyToReply}>Reply to this reply</Text>
            </TouchableHighlight>
            
            <FlatList
                data={rep}
                renderItem={({ item }) => (<RTRTableComponent data={item}  ></RTRTableComponent>)}
                keyExtractor={(item) => item.thread_reply_to_reply_id}
            />
            <br></br>
            <Button title='refresh replies to replies' color='green' onPress={refreshrtr} />
        </View>
    )
}