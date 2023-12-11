import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Enums } from 'src/app/Classes/enums';
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { UserData } from 'src/app/DataModel/userInterface';
import { AiService } from 'src/app/Services/AiService/ai.service';
import { ChatService } from 'src/app/Services/DataServices/chat.service';
import { UserService } from 'src/app/Services/DataServices/user.service';

@Component({
  selector: 'app-base-chat-session',
  templateUrl: './base-chat-session.component.html',
  styleUrls: ['./base-chat-session.component.css']
})
export class BaseChatSessionComponent implements OnInit {

  @Input() public chatSession: ChatInterface.ChatSession;
  
  @ViewChild('chatContainer') messageBox: ElementRef; 
  
  public currentUser?: UserData.UserAppdata;
  public messageText: string;
  public messageType: Enums.MessageTypes;
  public loading: boolean;

  constructor(private chatService: ChatService, private userService: UserService, private aiService: AiService){
    this.currentUser = this.userService.UserAppData;
    this.messageType = Enums.MessageTypes.textMessage;
  }

  public ngOnInit(): void {
    this.aiService.isLoading.subscribe(loadStatus => this.loading = loadStatus)
    this.scrollToBottom();
  }

  public ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  private getCurrentChatSession(): ChatInterface.ChatSession{
    return this.chatSession;  } 


  public async sendMessage() {
    if(this.currentUser && !this.loading){
      let messagge = this.chatService.createNewMessage(this.messageText, this.currentUser.userId ?? -1, this.chatSession.id, this.messageType);
      this.messageText = "";
      let reply = await this.aiService.SendMessage(messagge);
      if(reply){
        this.chatSession.messages.push(reply);
      }
    }
    }

    private scrollToBottom(): void {
      try {
          this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
      } catch(err) { }                 
  } 

 public uploadChanged($event: Event) {
  //Salva import sul backend.
  //Invia file alla IA.
  const element = $event.currentTarget as HTMLInputElement;
  let files = element.files;
  if(files){
      //Salva import sul backend.
      //Invia file alla IA.
  }

 }

}
