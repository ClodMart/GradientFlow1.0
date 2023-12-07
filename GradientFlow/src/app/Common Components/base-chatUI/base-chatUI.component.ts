import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { UserData } from 'src/app/DataModel/userInterface';
import { AiService } from 'src/app/Services/AiService/ai.service';
import { ChatService } from 'src/app/Services/DataServices/chat.service';
import { UserService } from 'src/app/Services/DataServices/user.service';

@Component({
  selector: 'app-base-chatUI',
  templateUrl: './base-chatUI.component.html',
  styleUrls: ['./base-chatUI.component.scss']
})
export class BaseChatUIComponent implements OnInit {

  @ViewChild("tabGroup") private TabGroup: MatTabGroup
  @Input() public chatSessions: ChatInterface.ChatSession[];

  public currentUser?: UserData.UserAppdata;
  public conversasionList: string[];
  public tabSelectedIndex = 0;
  public loading = false;

  constructor(private chatService: ChatService, private userService: UserService, private aiService: AiService) {
    this.conversasionList = [];
    this.aiService.Init();
   }

   
  ngOnInit() {

    this.aiService.isLoading.subscribe(loadStatus => this.loading = loadStatus)
    this.currentUser = this.userService.UserAppData;
    this.chatSessions = this.chatService.GetUserChatSessions(this.currentUser?.userId ?? 0)
    this.chatSessions.forEach(chat => {
      if(chat.usersId.find(x=>x != this.currentUser?.userId)){
        this.conversasionList.push(this.userService.getUserPersonalData(chat.usersId.find(x=>x != this.currentUser?.userId) ?? 0)?.username ?? "")
      }      
    });
  }

  public chatCreated($event: ChatInterface.ChatSession) {
    this.chatSessions.push($event);
    this.changeSelectedTab(this.chatSessions.length);
    }

  private changeSelectedTab(index: number){
    this.TabGroup.focusTab(index);
  }

  public selectedTabChange($event: number) {
    
      if($event>0){
        this.aiService.LoadChatSession(this.chatSessions[$event-1])
      }    
      else{
        this.aiService.Init();
      }
    }
}
