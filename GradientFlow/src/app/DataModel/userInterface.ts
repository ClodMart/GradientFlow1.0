import { ApplicationData, ApplicationParameters } from "./applicationInterface"

export namespace UserData{

    export interface UserLoginData{
        userid: number,
        email:string,
        username: string,
        password: string,
    }
    
    export interface UserPersonalData{
        userId: number,
        username: string,
        name: string,
        surname: string,
        birthDate: Date,
        email: string,
        credit: number,
        paymentMethods: PaymentMethods[]
    }

    export interface UserAppdata{
        userId: number,
        username: string,
        roleId: number,
        roleName: string,
        permissions: number[],
        topics: ApplicationParameters.Topic[],
        projects: ApplicationParameters.Project[]
        questions: ApplicationData.Question[];
    }

    export interface PaymentMethods{
        id: number,
        //Only for mockUp should be managed backend
        userId: number,
    }

}
