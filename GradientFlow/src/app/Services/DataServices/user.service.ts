import { UserData } from '../../DataModel/userInterface';
import { Injectable } from '@angular/core';
import { DataModelFactory } from '../../DataModel/Mock/dataModelFactory';
import { Router } from '@angular/router';
import { Enums } from '../../Classes/enums';
import { ApplicationParameters } from '../../DataModel/applicationInterface';

@Injectable({
    providedIn: 'root',
  })
export class UserService{
    constructor(private router: Router,private dataFactory:DataModelFactory){}
    private logins = this.dataFactory.GenerateData(Enums.dataType.UserLoginData);

    public UserPersonalData?: UserData.UserPersonalData;
    public UserAppData?: UserData.UserAppdata;

    //Login
    public Login(username: string, password: string) : number{
        
        let userid = this.CanLogin(username, password)
        if(userid>0){
            const userAppData = this.dataFactory.GenerateData(Enums.dataType.UserAppdata) as UserData.UserAppdata[];
            const userPersData = this.dataFactory.GenerateData(Enums.dataType.UserPersonalData) as UserData.UserPersonalData[];
            this.UserPersonalData = userPersData.find(x=>x.userId == userid) ;
            this.UserAppData = userAppData.find(x=>x.userId == userid) ;
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/app']);
            return userid;
        }
        else{
            return userid;
        }
    }

    public isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
      }    

    private CanLogin(username: string, password: string) : number {
        if(this.logins.find(user=>user.username == username) || this.logins.find(user=>user.email == username)){
            let user = this.logins.find(user=>user.username == username) ?? this.logins.find(user=>user.email == username);
            if(user.password == password){
                return user.userid;
            }
            else{
                return -2;
            }
        }
        else{
            return -1;
        }           
    }

    //User Data


    public allUsers = this.dataFactory.GenerateData(Enums.dataType.UserPersonalData) as UserData.UserPersonalData[];
    public allUsersAppdata = this.dataFactory.GenerateData(Enums.dataType.UserAppdata) as UserData.UserAppdata[];

    public UserTimeFormat: "en-GB";
    public UserTimezone: "UTC";

    public getSearchedUsers(search: string, type: Enums.userSearchMethod): UserData.UserAppdata[]{
        let result: UserData.UserAppdata[] = [];
        if(type == Enums.userSearchMethod.UserId || type == Enums.userSearchMethod.All){
            let results = this.allUsersAppdata.filter(x=>x.userId.toString().includes(search));
            result = result.concat( results ?? []);
        }
        
        if(type == Enums.userSearchMethod.Username || type == Enums.userSearchMethod.All){
            let results = this.allUsersAppdata.filter(x=>x.username.includes(search));
            result = result.concat(results ?? []);
        }

        if(type == Enums.userSearchMethod.Email || type == Enums.userSearchMethod.All){
            let users = this.allUsers.filter(x=>x.email.includes(search)) ?? [];
            users.forEach(x => {
                result.concat(this.allUsersAppdata.find(y=>y.userId == x.userId) ?? []);
            });
        }

        const Output: UserData.UserAppdata[] = [];

        result.forEach((item) => {
            if (!Output.includes(item)) {
                Output.push(item);
            }
        })
        return Output; 
    }

    public getUserPersonalData(id :number) :UserData.UserPersonalData {
            return this.allUsers.find(x=>x.userId == id) ?? {
                userId: -1,
                username: "Robottone",
                name: "Robottone",
                surname: "ChatBot",
                birthDate: new Date,
                email: "",
                credit: 0,
                paymentMethods: []
            };
    }

    public getUserAppdataData(id :number) :UserData.UserAppdata | null{
        return this.allUsersAppdata.find(x=>x.userId == id) ?? null;
}

    public GetUserProjects(): Array<ApplicationParameters.Project>{
        return this.UserAppData?.projects ?? [];
    }

    public GetUserQuestions(){
        return this.UserAppData?.questions ?? [];
    }

    public GetUserTimezone(): string{
        return this.UserTimezone;
    }


    public GetUserDateFormat() : string{
        return this.UserTimeFormat;
    }

}