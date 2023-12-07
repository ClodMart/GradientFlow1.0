import { ApplicationData } from './../../DataModel/applicationInterface';
import { Enums} from './../../Classes/enums';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../Services/DataServices/question.service';
import { UserService } from '../../Services/DataServices/user.service';
import { ApplicationParameters } from '../../DataModel/applicationInterface';
import { ApplicationUtilities } from '../../DataModel/applicationUtilities';
import { ColumsDefinitionFactory } from '../../DataModel/Mock/columsDefinitionFactory';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  public projectTableTitle = "My Projects";
  public projectsData: ApplicationUtilities.ProjectsTableData[];
  public projectsColumnsDefinitions: ApplicationUtilities.ColumnDefinition[];

  public questionsTableTitle = "My Questions";
  public questionData: ApplicationUtilities.QuestionTableData[];
  public questionColumnsDefinitions: ApplicationUtilities.ColumnDefinition[];

  constructor(private userService: UserService, private questionService: QuestionService, private colsFactory: ColumsDefinitionFactory)
    {
      this.projectsData = [];
      this.projectsColumnsDefinitions = [];
      this.questionData = [];
      this.questionColumnsDefinitions = [];
    }
    
  ngOnInit(): void {

      this.getProjectsTableData();
      this.getProjectColumsDefinitions(Enums.tableId.UserProjects, Object.keys(this.projectsData[0]));

      this.getQuestionTableData();
      this.getQuestionColumsDefinitions(Enums.tableId.UserQuestions, Object.keys(this.questionData[0]));
  }

  // Project Table methods
    private getProjectColumsDefinitions(tableid: Enums.tableId, cols: string[]){
      this.projectsColumnsDefinitions = this.colsFactory.GenerateColumsDefinition(tableid, cols);
    }

    private getProjectsTableData(){
      let projects = this.userService.GetUserProjects();

      projects.forEach(project => {
        this.projectsData.push(this.getProjectsData(project));
        });
    }

    private getProjectsData(project: ApplicationParameters.Project): ApplicationUtilities.ProjectsTableData{
      return{
        id: project.id,
        title: project.title,
        QuestionsToReply: this.questionService.GetProjectUnreplyedQuestions(project.id).length,
        QuestionsReplied: this.questionService.GetProjectRepliedQuestions(project.id).length,
      }
    }

    // Question Table methods

    private getQuestionColumsDefinitions(tableid: Enums.tableId, cols: string[]){
      this.questionColumnsDefinitions = this.colsFactory.GenerateColumsDefinition(tableid, cols);
    }

    private getQuestionTableData(){
      let questions = this.userService.GetUserQuestions();

      questions.forEach(question => {
        this.questionData.push(this.getQuestionData(question));
        });
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
}
