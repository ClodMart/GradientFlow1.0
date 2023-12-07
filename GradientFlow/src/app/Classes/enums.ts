
export namespace Enums{
  export enum dataType{
    //Users DataModel
    UserPersonalData = 1,
    UserAppdata = 2,
    PaymentMethods = 3,
    UserLoginData = 4,
    //ApplicationParams DataModel
    Topic = 5,
    Project = 6,
    //ApplicationData DataModel
    Question = 7,
    Answer = 8,
    Evaluation = 9,
    Valuation = 10,
    ChatSession = 11,
    Message = 12,
    Context = 13,
  }

 export enum roles{
    Admin = 1,
    User = 2,
  }

  export enum tableId{
    UserProjects = 1,
    UserQuestions = 2,
    Users = 3
  }

  export enum columnType{
    string = 'string',
    number = 'number',
    notification ='notification',
    button = 'button',
  }


  export enum SearchCategory{
    questions = 0,
    projects = 1,
    users = 2,
  }

  export enum questionSearchMethod{
    All,
    QuestionId,
    Content,
    Project,
    Topic,
    SubmittingUser
  }

  export enum ProjectSearchMethod{
    All,
    ProjectId,
    Description,
    User,
  }

  export enum userSearchMethod{
    All,
    UserId,
    Username,
    Email,
  }

  export enum MessageTypes{
    textMessage,
    image,
  }
}
