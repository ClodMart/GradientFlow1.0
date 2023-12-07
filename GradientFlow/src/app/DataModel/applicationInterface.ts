export namespace ApplicationParameters{

    export interface Topic{
        id: number,
        title: string,
        description: string,
        //Only for mockUp should be managed backend
        userId: number,
    }

    export interface Project{
        id: number,
        title: string,
        description: string,
        workingUsers: number[],
        submittingUserId: number
    }
}

export namespace ApplicationData{

    export interface Question{
        id: number,
        content: string,
        replied: boolean,
        submittingUserId: number,
        topicId: number, 
        projectId: number,
        evaluations?: Evaluation[],
        answers?: Answer[],        
    }

    export interface Answer{
        id: number,
        content: string,
        submittingUserId: number,
        verified: boolean,
        evaluations?: Evaluation[],
        //Only for mockUp should be managed backend
        questionId: number,
    }

    export interface Evaluation{
        id: number,
        quality: number,
        valuations: Valuation[];
        //Only for mockUp should be managed backend
        questionId?: number,
        answerId?: number,
    }

    export interface Valuation{
        valuationType: number,
        value: number,
    }


}