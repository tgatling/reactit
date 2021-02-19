import * as Actions from './actions';
import { User } from './../user/user';
import { ForumState } from './store';
import { Thread } from '../threads/thread';
import { Email } from '../user/email/email';
import { Comment, ReplyToReply } from '../comment/comment';
import { Reaction } from '../threads/reaction';

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: ForumState = {
    user: new User(),
    loginUser: new User(),
    registerUser: new User(),
    searchUser: new User(),
    threads: [],
    thread: new Thread(),
    query: "",
    email: new Email(),
    emails: [],
    comments: [],
    comment: new Comment(),
    reply_to_reply: new ReplyToReply(),
    reply_to_replies: [],
    reaction: new Reaction(),
    temp: 0
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: ForumState = initialState, action: Actions.AppAction): ForumState => {
    //console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = { ...state }; // If we return this, it will re render the application. (call setState)

    switch (action.type) {

        case Actions.ThreadActions.tempReply:
            console.log("Calling action tempreply");
            console.log(action.payload);
            newState.temp = action.payload as number;
            return newState;
        case Actions.ThreadActions.GetThreads:
            console.log("Calling action getThreads");
            console.log(action.payload);
            newState.threads = action.payload as Thread[];
            return newState;
        case Actions.ThreadActions.GetReaction:
            console.log("Calling action getThreads");
            console.log(action.payload);
            newState.reaction = action.payload as Reaction;
            return newState;
        case Actions.ThreadActions.GetThread:
            newState.thread = action.payload as Thread;
            return newState;
        case Actions.ThreadActions.ChangeThreads:
            newState.thread = action.payload as Thread;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.GetQuery:
            newState.query = action.payload as string;
            return newState;
        case Actions.UserActions.ChangeUser:
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.UserActions.RegisterChange:
            newState.registerUser = action.payload as User;
            return newState;
        case Actions.UserActions.SearchUserChange:
            newState.searchUser = action.payload as User;
            return newState;
        case Actions.UserActions.ChangeLocale:
            newState.locale = action.payload as string;
            return newState;
        case Actions.EmailActions.ChangeEmail:
            newState.email = action.payload as Email;
            return newState;
        case Actions.EmailActions.GetAllBanned:
            newState.emails = action.payload as Email[];
            return newState;
        case Actions.CommentActions.GetComments:
            newState.comments = action.payload as Comment[];
            return newState;
        case Actions.CommentActions.ChangeComments:
            newState.comment = action.payload as Comment;
            return newState;
        case Actions.CommentActions.GetReplies:
            newState.reply_to_replies = action.payload as ReplyToReply[];
            return newState;
        case Actions.CommentActions.ChangeReplies:
            newState.reply_to_reply = action.payload as ReplyToReply;
            return newState;
        default:
            return state;
    }
}

export default reducer;