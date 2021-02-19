import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { User } from "../user/user";
import { Thread } from "../threads/thread";
import { AppAction } from "./actions";
import { Email } from '../user/email/email';
import { Comment, ReplyToReply } from '../comment/comment';
import reducer from "./reducer";
import { Reaction } from "../threads/reaction";


// Define the items that are in our state

export interface UserState {
    user: User;
    loginUser: User;
    registerUser: User;
    searchUser: User;
    locale?: string;
    query:string;
}

export interface ThreadState {
    threads: Thread[];
    thread: Thread;
    reaction: Reaction;
    temp:number;
}

export interface EmailState {
    email: Email;
    emails: Email[];
}

export interface CommentState {
    comment: Comment;
    comments: Comment[];
    reply_to_reply: ReplyToReply;
    reply_to_replies: ReplyToReply[]
}

export interface ForumState extends UserState,ThreadState, EmailState, CommentState { }
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.
const store: Store<ForumState, AppAction> = createStore(reducer, applyMiddleware(thunk));

export default store;