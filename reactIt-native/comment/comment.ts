
export class Comment {
    created_on: string = '';
    thread_reply_id: string = '';
    thread_reply_name: string = '';
    thread_reply_description: string = '';
    threads_id: number = 0;
    admincomments: string = '';
    username: string = '';
}

export class ReplyToReply {
    created_on: string = '';
    thread_reply_to_reply_id: string = '';
    thread_reply_to_reply_name: string = '';
    thread_reply_to_reply_description: string = '';
    reply_id: number = 0;
    admincomments: string = '';
    username: string = '';
}