import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { UserData } from 'src/app/DataModel/userInterface';
import { ChatService } from 'src/app/Services/DataServices/chat.service';
import { UserService } from 'src/app/Services/DataServices/user.service';

@Component({
  selector: 'app-base-chatUI',
  templateUrl: './base-chatUI.component.html',
  styleUrls: ['./base-chatUI.component.scss']
})
export class BaseChatUIComponent implements OnInit {

  @Input() public chatSession: ChatInterface.ChatSession[];
  public currentUser?: UserData.UserAppdata;
  public conversasionList: string[];
  public tabSelectedIndex = 0;

  constructor(private chatService: ChatService, private userService: UserService) {
    this.conversasionList = [];
   }

  ngOnInit() {
    this.currentUser = this.userService.UserAppData;
    this.chatSession = this.chatService.GetUserChatSessions(this.currentUser?.userId ?? 0)
    this.chatSession.forEach(chat => {
      if(chat.usersId.find(x=>x != this.currentUser?.userId)){
        this.conversasionList.push(this.userService.getUserPersonalData(chat.usersId.find(x=>x != this.currentUser?.userId) ?? 0)?.username ?? "")
      }      
    });
  }

  public chatCreated($event: ChatInterface.ChatSession) {
    this.chatSession.push($event);
    this.changeSelectedTab(this.chatSession.length);
    }

  private changeSelectedTab(index: number){
    this.tabSelectedIndex = index;
  }
}
