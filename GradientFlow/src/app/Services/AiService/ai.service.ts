import { ChatService } from 'src/app/Services/DataServices/chat.service';
import { UserData } from '../../DataModel/userInterface';
import { Injectable } from "@angular/core";
import { DataModelFactory } from "../../DataModel/Mock/dataModelFactory";
import { Enums } from "../../Classes/enums";
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { AiApiService } from './ai-api.service';
import { AiMessage, AiRequestExisting, AiRequestNew, AiResponse, AiSession, IaParams } from './ai-response-dataModel';
import { ApplicationUtilities } from 'src/app/DataModel/applicationUtilities';
import { ApplicationData, ApplicationParameters } from 'src/app/DataModel/applicationInterface';
import { UserService } from '../DataServices/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AiService{
    constructor(private dataFactory:DataModelFactory, private aiApiService: AiApiService, private chatService: ChatService, private userService: UserService){}

    private isLoadingSource = new BehaviorSubject(false);
    public isLoading = this.isLoadingSource.asObservable();
    public CurrentAiSession: AiSession;
    public CurrentSession: ChatInterface.ChatSession; 

    public Init(){
        this.CurrentAiSession = {
            messages:[],
            prompt:"",
            system_prompt:undefined,
            use_context: true,
            context_filter: undefined,
            include_sources: false,
            stream: undefined,
        };
        this.CurrentSession = this.chatService.createNewChatSession(this.userService.UserAppData?.userId ?? 0, "") ?? {
            id: 0,
            sessionName: "",
            isGroupChat: false,
            usersId: [this.userService.UserAppData?.userId ?? 0],
            createdAt: new Date,   
            createdById: this.userService.UserAppData?.userId ?? 0, //UserId foreign key
            messages: [],       
        };
    }

    public async InizializeChatSession(requestContent: ChatInterface.Message, sessionTitle?: string): Promise<ChatInterface.ChatSession>{
        if(sessionTitle && sessionTitle!="  "){
            this.CurrentSession.sessionName = sessionTitle;
        }
        else{
            this.CurrentSession.sessionName = requestContent.messageContent;
        }
        //Generate ai message
        let aiMessage = this.getIaMessage(requestContent)
        //Adding it to current conversation array
        this.CurrentAiSession.messages.push(aiMessage);
        this.CurrentSession.messages.push(requestContent);
        //Preparing Payload for request
        this.changeLoading(true);
        let payload = this.GetPayload(IaParams.requestType.PROMPT, undefined, aiMessage);        
        let result: AiResponse | null = await this.aiApiService.post("/v1/completions", payload);  //Calling API
        if(result?.choices[0].message){
            //Add reply to local arrays
            this.CurrentAiSession?.messages.push(result?.choices[0].message);
        }
        let message = result?.choices[0].message?.content ?? ""; //Extract message content
        //Manage possible alternatives
        let alternatives: ChatInterface.Message[] = [];
        result?.choices.splice(0,1).forEach(x=>{
            alternatives.push(this.chatService.createNewMessage(x.message?.content ?? "", -1, requestContent.sessionId, requestContent.messageType))
        });
        let reply = this.chatService.createNewMessage(message, -1, requestContent.sessionId, requestContent.messageType, alternatives)
        //Add reply to local arrays
        
            this.CurrentSession.messages.push(reply);    
            this.changeLoading(false);
        return this.CurrentSession //Adding new message to db and returning value for frontend
    }

    public async SendMessage(requestContent: ChatInterface.Message): Promise<ChatInterface.Message | null>{
        let aiMessage = this.getIaMessage(requestContent)
        this.CurrentAiSession.messages.push(aiMessage); 
        this.CurrentSession.messages.push(requestContent);
        this.changeLoading(true);
        let payload = this.GetPayload(IaParams.requestType.MESSAGES)
        let result: AiResponse | null = await this.aiApiService.post("/v1/chat/completions", payload);
        if(result?.choices[0].message){
            this.CurrentAiSession?.messages.push(result?.choices[0].message);
        }
        let message = result?.choices[0].message?.content ?? "";
        let alternatives: ChatInterface.Message[] = [];
        result?.choices.splice(0,1).forEach(x=>{
            alternatives.push(this.chatService.createNewMessage(x.message?.content ?? "", -1, requestContent.sessionId, requestContent.messageType))
        });
        let reply = this.chatService.createNewMessage(message, -1, requestContent.sessionId, requestContent.messageType, alternatives);
        this.changeLoading(false);
        return reply
    }


    public LoadChatSession(session: ChatInterface.ChatSession){
        this.CurrentSession = session;
        this.CurrentAiSession = this.getIaChatSession(session);
    }

    public UpdateContext(context: ChatInterface.Context){
        this.CurrentSession.iaContext?.push(context);
        (this.CurrentAiSession.context_filter as string[]).push(context.fileId);
    }

    public LoadFile(file: File){
        this.CurrentAiSession.context_filter
    }



    private changeLoading(loadingStatus: boolean) {
        this.isLoadingSource.next(loadingStatus);
      }


    // private getContextFromFile(file: File) : ChatInterface.Context{
    //     return{        
    //         id: 0,
    //         fileId: file.name,
    //         filePath: file.,
    //         sessionId: number,
    //     }
    // }
    
    private GetPayload(requestType: IaParams.requestType, contextData?: ChatInterface.ChatSession,initialPrompt?: AiMessage): AiRequestNew | AiRequestExisting{
        switch(requestType){
            case IaParams.requestType.PROMPT:
            return{
                    prompt: initialPrompt?.content ?? "",
                    system_prompt: undefined,
                    use_context: false,
                    context_filter: undefined,
                    include_sources: undefined,
                    stream: undefined,
                    }
            case IaParams.requestType.MESSAGES:
                return{
                    messages:this.CurrentAiSession?.messages ?? [],
                    system_prompt: undefined,
                    use_context: false,
                    context_filter: undefined,
                    include_sources: undefined,
                    stream: undefined,
                }
            default:
                return{
                    prompt: initialPrompt?.content ?? "",
                    system_prompt: undefined,
                    use_context: false,
                    context_filter: undefined,
                    include_sources: undefined,
                    stream: undefined,
                    } 
        }
    }
    
    private getIaMessage(message: ChatInterface.Message) : AiMessage{
        if(message.senderId == -1){
            return {
                content: message.messageContent,
                role: IaParams.Role.ASSISTANT
            }
        }

        return {
            content: message.messageContent,
            role: IaParams.Role.USER
        }
    }

    private getIaChatSession(session: ChatInterface.ChatSession): AiSession{
        let messages: AiMessage[]=[]; 
        session.messages.forEach(message=>{
            messages.push(this.getIaMessage(message));
        })
       return{
        messages:messages,
        prompt:"",
        system_prompt: undefined,
        use_context: false,
        context_filter: session.iaContext,
        include_sources: false,
        stream: false,
       } 
    }
}