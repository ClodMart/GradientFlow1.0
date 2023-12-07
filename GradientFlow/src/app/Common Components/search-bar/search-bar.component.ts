import { ApplicationParameters} from './../../DataModel/applicationInterface';
import { Component, Input, ViewChildren} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Enums } from 'src/app/Classes/enums';
import { ColumsDefinitionFactory } from 'src/app/DataModel/Mock/columsDefinitionFactory';
import { ApplicationData } from 'src/app/DataModel/applicationInterface';
import { ApplicationUtilities } from 'src/app/DataModel/applicationUtilities';
import { ProjectService } from 'src/app/Services/DataServices/project.service';
import { QuestionService } from 'src/app/Services/DataServices/question.service';
import { UserService } from 'src/app/Services/DataServices/user.service';
import { BaseGridComponent } from '../base-grid/base-grid.component';
import { UserData } from 'src/app/DataModel/userInterface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() hasQuestionSearch: boolean;
  @Input() hasProjectSearch: boolean;
  @Input() hasUserSearch: boolean;
  @ViewChildren('resultGrid') grids: BaseGridComponent[];
 
  public TableTitle: string;
  public searchType: string;
  public searchText = '';
  public tabSelected: Enums.SearchCategory;




  public radiobuttonList: string[];
  
  public questionTab: Enums.SearchCategory.questions;
  private questionDataSample: ApplicationUtilities.QuestionTableData;
  public questionData: ApplicationUtilities.QuestionTableData[];
  public questionColumnsDefinitions: ApplicationUtilities.ColumnDefinition[];
  public questionSearchTypeList:{
    id: Enums.questionSearchMethod;
    name: string;
    }[];

  public projectsTab: Enums.SearchCategory.projects;
  private projectDataSample: ApplicationUtilities.ProjectsTableData;
  public projectsData: ApplicationUtilities.ProjectsTableData[];
  public projectsColumnsDefinitions: ApplicationUtilities.ColumnDefinition[];
  public projectSearchTypeList:{
    id: Enums.ProjectSearchMethod;
    name: string;
    }[];

  public usersTab: Enums.SearchCategory.users;
  private userDataSample: ApplicationUtilities.UsersTableData;
  public usersData: ApplicationUtilities.UsersTableData[];
  public usersColumnsDefinitions: ApplicationUtilities.ColumnDefinition[];
  public userSearchTypeList:{
    id: Enums.userSearchMethod;
    name: string;
    }[];

  toggleSearch: boolean = false;
  constructor(private userService: UserService, private questionService: QuestionService, private projectService: ProjectService, private colsFactory: ColumsDefinitionFactory) {

    this.questionSearchTypeList = Object.keys(Enums.questionSearchMethod)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: Enums.questionSearchMethod[name as keyof typeof Enums.questionSearchMethod],
        name,
      };
    });

    this.projectSearchTypeList = Object.keys(Enums.ProjectSearchMethod)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: Enums.ProjectSearchMethod[name as keyof typeof Enums.ProjectSearchMethod],
        name,
      };
    });

    this.userSearchTypeList = Object.keys(Enums.userSearchMethod)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: Enums.userSearchMethod[name as keyof typeof Enums.userSearchMethod],
        name,
      };
    });

    this.projectsData = [];
    this.projectsColumnsDefinitions = [];
    this.questionData = [];
    this.questionColumnsDefinitions = [];
    this.usersData =[];
    this.usersColumnsDefinitions = [];
  }
  ngOnInit(): void {
    this.projectDataSample = this.getProjectData(this.projectService.getSearchedProjects("", 0,)[0]);
    this.questionDataSample = this.getQuestionData(this.questionService.getSearchedQuestions("", 0,)[0]);
    this.userDataSample = this.getUserData(this.userService.getSearchedUsers("",0)[0])
    this.tabSelected = Enums.SearchCategory.questions;  
    this.getRadiobuttonList();    
}

private getRadiobuttonList(){
  switch(this.tabSelected){
    case 0:
      this.radiobuttonList = this.questionSearchTypeList.map((object)=>object.name);
    break;
    case 1:
      this.radiobuttonList = this.projectSearchTypeList.map((object)=>object.name);
      break;
      case 2:
        this.radiobuttonList = this.userSearchTypeList.map((object)=>object.name);
        break;
  }
    this.searchType = this.radiobuttonList.find(x=>1==1) ?? '';
}


public tabChanged($event: MatTabChangeEvent) {
    this.tabSelected = $event.index;
    this.getRadiobuttonList();
  }


  private getQuestionColumsDefinitions(tableid: Enums.tableId, cols: string[]){
    this.questionColumnsDefinitions = this.colsFactory.GenerateColumsDefinition(tableid, cols);
  }

  private getQuestionTableData(){
    let questions = this.questionService.getSearchedQuestions(this.searchText, this.questionSearchTypeList.find(x=>x.name == this.searchType)?.id ?? Enums.questionSearchMethod.All) ?? [];
    let newQuestions: ApplicationUtilities.QuestionTableData[] = [];
    questions.forEach(question => {
      newQuestions.push(this.getQuestionData(question));
      });
      this.questionData = newQuestions;
  }

  private getQuestionData(question: ApplicationData.Question): ApplicationUtilities.QuestionTableData{
    return{
      id: question.id,
      content: question.content,
      replied: question.replied,
      topicId: question.topicId,
      projectId: question.projectId,
      evaluation: this.questionService.GetQuestionEvaluation(question.id),
      answerNumber: this.questionService.GetQuestionAnswers(question.id).length,        
    }
  }

  public searchQuestions() {
    this.getQuestionColumsDefinitions(Enums.tableId.UserQuestions, Object.keys(this.questionDataSample) ?? []);
    this.getQuestionTableData();
  }
    
    //Projects

    private getProjectColumsDefinitions(tableid: Enums.tableId, cols: string[]){
      this.projectsColumnsDefinitions = this.colsFactory.GenerateColumsDefinition(tableid, cols);
    }
  
    private getProjectTableData(){
      let projects = this.projectService.getSearchedProjects(this.searchText, this.projectSearchTypeList.find(x=>x.name == this.searchType)?.id ?? Enums.ProjectSearchMethod.All) ?? [];
      let newProjects: ApplicationUtilities.ProjectsTableData[]=[];
      projects.forEach(project => {
        newProjects.push(this.getProjectData(project));
        });
        this.projectsData = newProjects;
    }
  
    private getProjectData(project: ApplicationParameters.Project): ApplicationUtilities.ProjectsTableData{
      return{
        id: project.id,
        title: project.title,
        QuestionsToReply : this.questionService.GetProjectUnreplyedQuestions(project.id).length,
        QuestionsReplied: this.questionService.GetProjectRepliedQuestions (project.id).length,     
      }
    }
    

   public searchProjects() {
        this.getProjectColumsDefinitions(Enums.tableId.UserProjects, Object.keys(this.projectDataSample) ?? []);
        this.getProjectTableData(); 
      }


      //Users
      private getUserColumsDefinitions(tableid: Enums.tableId, cols: string[]){
        this.usersColumnsDefinitions = this.colsFactory.GenerateColumsDefinition(tableid, cols);
      }
    
      private getUserTableData(){
        let Users = this.userService.getSearchedUsers(this.searchText, this.userSearchTypeList.find(x=>x.name == this.searchType)?.id ?? Enums.userSearchMethod.All) ?? [];
        let newUsers: ApplicationUtilities.UsersTableData[] = [];
        Users.forEach(User => {
          newUsers.push(this.getUserData(User));
          });
          this.usersData = newUsers;
      }
    
      private getUserData(user: UserData.UserAppdata): ApplicationUtilities.UsersTableData{
        return{
          id: user.userId,
          username: user.username,
          email: this.userService.getUserPersonalData(user.userId)?.email ?? '',
          numberOfProjects: user.projects.length,
          numberOfQuestions: user.questions.length,  
        }
      }
    
      public searchUsers() {
        this.getUserColumsDefinitions(Enums.tableId.Users, Object.keys(this.userDataSample) ?? []);
        this.getUserTableData();
      }
}
