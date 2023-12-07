export interface AiRequestExisting{
   messages:AiMessage[],
   system_prompt?:string,
   use_context: boolean,
   context_filter?: object,
   include_sources?: boolean,
   stream?: boolean,
}

export interface AiRequestNew{
   prompt:string,
   system_prompt?:string,
   use_context: boolean,
   context_filter?: object,
   include_sources?: boolean,
   stream?: boolean,
}

export interface AiSession{
   messages:AiMessage[],
   prompt:string,
   system_prompt?:string,
   use_context: boolean,
   context_filter?: object,
   include_sources?: boolean,
   stream?: boolean,
}


export interface AiResponse
{
    id:string ,
    object?:IaParams.Completion ,
    created: number,
    model : any,
    choices : [
     {
        finish_reason?:string ,
        delta?: {content :  string},
        message?: AiMessage,
        sources?: AiSurces[],
        index?: number
     }
   ]
 }
 export interface AiMessage{
   role?:  IaParams.Role,
   content?:  string 
 }

 export interface AiSurces{
   object : any[],
   score : 1,
   document : Document,
   text :  string ,
   previous_texts?: string[],
   next_texts?: string[],
 }

 export interface Source{
    object:any,
    score:number,
    document:object,
    text:string,
    previous_texts?: string[],
    next_texts?: string[]
 }

 export interface Document{
    object:any,
    doc_id:string,
    doc_metadata?: Map<string, any>,
 }
 

 export namespace IaParams{
   export enum Completion{
      COMPLETION = "completion",
      COMPLETION_CHUNK = "completion.chunk"
   }
  
   export enum Role{
      ASSISTANT = "assistant",
      SYSTEM = "system",
      USER ="user"
   }
  
   export enum requestType{
     PROMPT=0,
     MESSAGES=1,
   }
 }
 

 