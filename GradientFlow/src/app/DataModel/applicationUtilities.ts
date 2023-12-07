import { Enums } from './../Classes/enums';
export namespace ApplicationUtilities{
    export class ColumnDefinition{
        colId: string;
        header: string;
        colType?: Enums.columnType;
    }

    export class ProjectsTableData{
        id: number;
        title: string;
        QuestionsToReply: number;
        QuestionsReplied: number;    
      }
    
    export class QuestionTableData{
        id: number;
        content: string;
        replied: boolean;
        topicId: number;
        projectId: number;
        evaluation?: number;
        answerNumber: number;
    }

    export class UsersTableData{
        id: number;
        username: string;
        email: string;
        numberOfProjects: number;
        numberOfQuestions: number;    
      }

}