import { UserData } from './../../DataModel/userInterface';
import { Injectable } from "@angular/core";
import { DataModelFactory } from "../../DataModel/Mock/dataModelFactory";
import { Enums } from "../../Classes/enums";
import { ApplicationData, ApplicationParameters } from "../../DataModel/applicationInterface";

@Injectable()
export class QuestionService{
    constructor(private dataFactory:DataModelFactory){}

    private questions = this.dataFactory.GenerateData(Enums.dataType.Question) as ApplicationData.Question[];

    public getSearchedQuestions(search: string, type: Enums.questionSearchMethod){
        let result: ApplicationData.Question[] = [];
        if(type == Enums.questionSearchMethod.QuestionId || type == Enums.questionSearchMethod.All){
            let results = this.questions.filter(x=>x.id.toString().includes(search));
            result = result.concat( results ?? []);
        }
        
        if(type == Enums.questionSearchMethod.Content || type == Enums.questionSearchMethod.All){
            let results = this.questions.filter(x=>x.content.includes(search));
            result = result.concat(results ?? []);
        }

        if(type == Enums.questionSearchMethod.Project || type == Enums.questionSearchMethod.All){
            let projects = (this.dataFactory.GenerateData(Enums.dataType.Project) as ApplicationParameters.Project[]).filter(x=>x.title.includes(search) || x.description.includes(search)) ?? [];
            projects.forEach(x => {
                result.concat(this.questions.find(x=>x.projectId==x.id) ?? []);
            });
        }

        if(type == Enums.questionSearchMethod.Topic || type == Enums.questionSearchMethod.All){
            let topics = (this.dataFactory.GenerateData(Enums.dataType.Topic) as ApplicationParameters.Topic[]).filter(x=>x.title.includes(search) || x.description.includes(search)) ?? [];
            topics.forEach(x => {
                result.concat(this.questions.find(x=>x.topicId==x.id) ?? []);
            });
        }

        if(type == Enums.questionSearchMethod.SubmittingUser || type == Enums.questionSearchMethod.All){
            let Users = (this.dataFactory.GenerateData(Enums.dataType.UserAppdata) as UserData.UserAppdata[]).filter(x=>x.username.includes(search)) ?? [];
            Users.forEach(x => {
                result.concat(this.questions.find(x=>x.submittingUserId==x.id) ?? []);
            });
        }

        const Output: ApplicationData.Question[] = [];

        result.forEach((item) => {
            if (!Output.includes(item)) {
                Output.push(item);
            }
        })
        return Output;
    }

    public GetProjectUnreplyedQuestions(projectId: number): Array<ApplicationData.Question>{
        return this.questions.filter(x=>x.projectId == projectId && !x.replied)
    }

    public GetProjectRepliedQuestions(projectId: number): Array<ApplicationData.Question>{
        return this.questions.filter(x=>x.projectId == projectId && x.replied)
    }

    public GetQuestionEvaluation(questionId: number): number{
        return 10;
    }

    public GetQuestionAnswers(questionId: number): Array<ApplicationData.Answer>{
        return this.questions.find(x=>x.id == questionId)?.answers ?? [];
    }
}