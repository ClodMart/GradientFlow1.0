import { Component, Input } from '@angular/core';
import { Enums } from 'src/app/Classes/enums';
import { ChatInterface } from 'src/app/DataModel/chatInterface';
import { UserService } from 'src/app/Services/DataServices/user.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {

@Input() public message: ChatInterface.Message;
@Input() public IsRightMessage:boolean = true;
@Input() public IsGroupChat: boolean

public messageTypeText: Enums.MessageTypes.textMessage;

public displayUsername: string; 
public displayText: string;
public displayTime: string;

constructor(private userService: UserService) {
  // if(!this.message){
  //   this.message ={
  //   id: 1,
  //   senderId: 1, //UserId foreign key
  //   dateTimeSent: new Date,
  //   messageContent: "ciao",
  //   sessionId: 1,
  //   messageType: Enums.MessageTypes.textMessage,
  //   };
  //   this.IsGroupChat = true;
  // }

this.displayUsername = this.userService.getUserPersonalData(this.message?.senderId ?? "Robottone")?.username ?? "Robottone";
let dateTime = this.message?.dateTimeSent.toLocaleTimeString(this.userService.GetUserDateFormat(), {timeZone: this.userService.GetUserTimezone()}) ?? (new Date).toLocaleTimeString(this.userService.GetUserDateFormat(), {timeZone: this.userService.GetUserTimezone()})
this.displayTime = dateTime.slice(0,5);

}

}
