import { UserData } from './../../DataModel/userInterface';
import { Injectable } from "@angular/core";
import { DataModelFactory } from "../../DataModel/Mock/dataModelFactory";
import { Enums } from "../../Classes/enums";
import { ApplicationData, ApplicationParameters } from "../../DataModel/applicationInterface";

@Injectable()
export class ProjectService{
    constructor(private dataFactory:DataModelFactory){}

    private Projects = this.dataFactory.GenerateData(Enums.dataType.Project) as ApplicationParameters.Project[];

    public getSearchedProjects(search: string, type: Enums.ProjectSearchMethod){
        let result: ApplicationParameters.Project[] = [];
        if(type == Enums.ProjectSearchMethod.ProjectId || type == Enums.ProjectSearchMethod.All){
            let results = this.Projects.filter(x=>x.id.toString().includes(search));
            result = result.concat( results ?? []);
        }
        
        if(type == Enums.ProjectSearchMethod.Description || type == Enums.ProjectSearchMethod.All){
            let results = this.Projects.filter(x=>x.description.includes(search));
            result = result.concat(results ?? []);
        }

        if(type == Enums.ProjectSearchMethod.User || type == Enums.ProjectSearchMethod.All){
            let projects = (this.dataFactory.GenerateData(Enums.dataType.Project) as ApplicationParameters.Project[]).filter(x=>x.title.includes(search) || x.description.includes(search)) ?? [];
            projects.forEach(x => {
                result.concat(this.Projects.find(x=>x.workingUsers.includes(x.id)) ?? []);
            });
        }

        const Output: ApplicationParameters.Project[] = [];

        result.forEach((item) => {
            if (!Output.includes(item)) {
                Output.push(item);
            }
        })
        return Output;
    }

    public GetAllProjects(): Array<ApplicationParameters.Project>{
        return this.Projects;
    }
}