import { Enums } from "../Classes/enums";

export namespace ChatInterface{

    export interface ChatSession{
        id: number,
        sessionName: string,
        isGroupChat: boolean
        usersId: number[],
        createdAt: Date,   
        createdById: number, //UserId foreign key
        messages: Message[],
        iaContext?: Context[] ,
    }

    export interface Message {
        id: number,
        senderId: number, //UserId foreign key
        dateTimeSent: Date,
        messageContent: string,
        attachment?: any,
        //Used on mock
        sessionId: number,
        messageType: Enums.MessageTypes,
        alternatives?: Message[];
    }

    export interface Context{
        id: number,
        content: string,
        //Used on mock
        sessionId: number,
    }


}