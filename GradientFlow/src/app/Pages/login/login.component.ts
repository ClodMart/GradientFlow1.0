import { UserService } from '../../Services/DataServices/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  hide = true;
  public username = "";
  public password = "";

  ngOnInit() {
  }

  login() {
    this.userService.Login(this.username, this.password);
  }

}
