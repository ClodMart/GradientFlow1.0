import { AiService } from 'src/app/Services/AiService/ai.service';
import { ApplicationConfig, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApplicationParameters } from 'src/app/DataModel/applicationInterface';
import { ProjectService } from 'src/app/Services/DataServices/project.service';
import { UserData } from 'src/app/DataModel/userInterface';
import { ChatService } from 'src/app/Services/DataServices/chat.service';
import { Enums } from 'src/app/Classes/enums';
import { ChatInterface } from 'src/app/DataModel/chatInterface';

@Component({
  selector: 'app-new-chat-session-form',
  templateUrl: './new-chat-session-form.component.html',
  styleUrls: ['./new-chat-session-form.component.css']
})
export class NewChatSessionFormComponent implements OnInit {

  @Input() public currentUser?: UserData.UserAppdata;

  @Output() public chatCreated = new EventEmitter<ChatInterface.ChatSession>();

  public messageType: Enums.MessageTypes;
  public messageText: string;
  public projects: ApplicationParameters.Project[];
  public selectedProject= 0;
  public sessionTitle: string = "";

  constructor(private projectService: ProjectService, private aiService:AiService, private chatService: ChatService ) {
    this.projects =  this.projectService.GetAllProjects();
    this.messageType = Enums.MessageTypes.textMessage;
   }

  ngOnInit() { 
  }

  public async createNewChatSession() {

    if(this.currentUser?.userId){
      let messagge = this.chatService.createNewMessage(this.messageText, this.currentUser?.userId ?? 0, 0, this.messageType)
      let session = await this.aiService.InizializeChatSession(messagge, this.sessionTitle);
      this.chatCreated.emit(session ?? undefined);
    }
  }
}
