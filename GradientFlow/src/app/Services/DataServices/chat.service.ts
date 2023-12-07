
import { UserData } from './../../DataModel/userInterface';
import { Injectable } from "@angular/core";
import { DataModelFactory } from "../../DataModel/Mock/dataModelFactory";
import { Enums } from "../../Classes/enums";
import { ApplicationData, ApplicationParameters } from "../../DataModel/applicationInterface";
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { UserService } from './user.service';

@Injectable()
export class ChatService{
    constructor(private dataFactory:DataModelFactory, private userService:UserService){}

    private chatSessions = this.dataFactory.GenerateData(Enums.dataType.ChatSession) as ChatInterface.ChatSession[];

    public createNewChatSession(userId: number, sessionTitle: string, context?: ChatInterface.Context[]): ChatInterface.ChatSession | null{
        let maxid = 0;
        this.chatSessions.forEach(x => {
            if(x.id>maxid){
                maxid = x.id;
            }
        });
        let currentUser = this.userService.UserAppData ?? this.userService.getUserAppdataData(1);
        let aiContext = context
        if(currentUser){
            return{
                id: maxid+1,
                sessionName: sessionTitle,
                isGroupChat: false,
                usersId: [userId,currentUser.userId],
                createdAt: new Date,   
                createdById: currentUser.userId, //UserId foreign key
                messages: [],
                iaContext: aiContext ,
            }
        }
        return null; 
    }

    public GetUserChatSessions(userId: number): ChatInterface.ChatSession[]{
        return this.chatSessions.filter(x=>x.createdById == userId)
    }


public  createNewMessage(text: string, userId: number, sessionId: number, messageType: Enums.MessageTypes, alternatives?: ChatInterface.Message[]) : ChatInterface.Message{
        let maxid = 0;
        this.chatSessions.forEach(x => {
            x.messages.forEach(y=>{
                if(y.id>maxid){
                    maxid = y.id;
                }
            })
        });
        let newMessage = {
            id: maxid+1,
            senderId: userId, //UserId foreign key
            dateTimeSent: new Date,
            messageContent: text,
            sessionId: sessionId,
            messageType: messageType,
            alternatives: alternatives
        };

        return newMessage
    }


    public getUserChatSessions(userId: number) : Array<ChatInterface.ChatSession>{
        return this.chatSessions;
    }
}