import { Enums } from "../../Classes/enums";
import { ApplicationUtilities } from "../applicationUtilities";

export class ColumsDefinitionFactory{
    public GenerateColumsDefinition(table: Enums.tableId, cols: string[]): ApplicationUtilities.ColumnDefinition[]{
        switch(table){
            case Enums.tableId.UserProjects:
                return this.getUserProjectColumsDefinitions(cols);
            case Enums.tableId.UserQuestions:
                return this.getUserQuestionColumsDefinitions(cols);
            default:
                return[];
        }
    }

    private getUserProjectColumsDefinitions(cols: string[]): ApplicationUtilities.ColumnDefinition[]{
        let columnsDefinitions: ApplicationUtilities.ColumnDefinition[] = [];
        cols.forEach(col => {
            let header = col;
            let columnType = Enums.columnType.string;
            switch(col){
                case "id":
                    header = "Number";
                    columnType = Enums.columnType.number;
                    break; 
                case "title":
                    header = "Title";
                    break;  
                case "QuestionsToReply":
                    header = "Questions Waiting";
                    columnType = Enums.columnType.notification;
                    break;  
                case "QuestionsReplied":
                    header = "Questions Replied";
                    columnType = Enums.columnType.notification;
                    break;    
            };
            columnsDefinitions.push({
              colId: col,
              header: header,
              colType: columnType,
            });     
        });
        return columnsDefinitions;
      }

      private getUserQuestionColumsDefinitions(cols: string[]): ApplicationUtilities.ColumnDefinition[]{
        let columnsDefinitions: ApplicationUtilities.ColumnDefinition[] = [];
        let columsToExclude = ["topicId", "projectId"];
        
        cols.forEach(col => {
            if(!columsToExclude.some(x=>x == col)){
                let header = col;
                let columnType = Enums.columnType.string;
                switch(col){
                    case "id":
                        header = "Number";
                        break; 
                    case "title":
                        header = "Title";
                        break;  
                    case "QuestionsToReply":
                        header = "Questions Waiting";
                        columnType = Enums.columnType.notification;
                        break;  
                    case "QuestionsReplied":
                        header = "Questions Replied";
                        break; 
                    default:
                        header = col;
                        break; 
                };
                columnsDefinitions.push({
                  colId: col,
                  header: header,
                  colType: columnType,
                });   
            }  
            });
            
        return columnsDefinitions;
      }
}