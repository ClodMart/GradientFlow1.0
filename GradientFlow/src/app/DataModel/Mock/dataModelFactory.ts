import { UserData } from "../userInterface";
import { ApplicationData, ApplicationParameters } from "../applicationInterface";
import { Enums } from "../../Classes/enums";
import { ChatInterface } from "../chatInterface";

export class DataModelFactory{

  public GenerateData(type: Enums.dataType): Array<any>{
    switch(type){
      case Enums.dataType.UserPersonalData:
        return this.GetAllUserPersonalData();
      case Enums.dataType.UserAppdata:
        return this.GetAllUserAppData();
      case Enums.dataType.Question:
        return this.GetAllQuestions();
      case Enums.dataType.Project:
        return this.GetAllProjects();
      case Enums.dataType.Topic:
          return this.GetAllTopics();
      case Enums.dataType.UserLoginData:
        return this.GetAllUserLoginData();
      case Enums.dataType.ChatSession:
        return this.GetChatSessions();
      default:
        return [];
    }
  }


  //User Methods
  private GetAllUserPersonalData(): Array<UserData.UserPersonalData>{
    return [
      {  userId: 1,
        username: "FirstUser",
        name: "Primo",
        surname: "Rossi",
        birthDate: new Date("2002-10-11"),
        email: "primorossi@mail.com",
        credit: 22,
        paymentMethods: this.GetUserPaymentMethods(1)
      },
      {  
        userId: 2,
        username: "SecondUser",
        name: "Secondo",
        surname: "Bianchi",
        birthDate: new Date("2000-01-09"),
        email: "secondobianchi@mail.com",
        credit: 22,
        paymentMethods: this.GetUserPaymentMethods(2)
      },
    ];
  }

  private GetAllUserAppData(): Array<UserData.UserAppdata>{
    return[
      {
        userId: 1,
        username: "FirstUser",
        roleId: Enums.roles.Admin,
        roleName: "Admin",
        permissions: this.GetUserPermissions(1),
        topics: this.GetUserTopics(1),
        projects: this.GetUserProjects(1),
        questions: this.GetUserQuestions(1)
      },
      {
        userId: 2,
        username: "SecondUser",
        roleId: Enums.roles.User,
        roleName: "User",
        permissions: this.GetUserPermissions(2),
        topics: this.GetUserTopics(2),
        projects: this.GetUserProjects(2),
        questions: this.GetUserQuestions(2)
      }
    ];    
  }

  private GetAllUserLoginData(): Array<UserData.UserLoginData>{
    return[
      {
        userid: 1,
        email: "secondobianchi@mail.com",
        username: "FirstUser",
        password: "Pw123",
      },
      {
        userid: 2,
        email: "primorossi@mail.com",
        username: "SecondUser",
        password: "Pw123",
      }
  ]
  }

  private GetUserPaymentMethods(userId: number) : Array<UserData.PaymentMethods>{
    return[
      { id: 1, userId: 1},
      { id: 2, userId: 2}
    ].filter(x=>x.userId == userId);
  }

  private GetUserPermissions(userId: number) : Array<number>{
    return[];
  }

  private GetAllTopics() : Array<ApplicationParameters.Topic>{
    return[
      { id: 1, title: "C#", description: "Competenza nel linguaggio C#", userId:1},
      { id: 2, title: "Angular", description: "Competenza nel linguaggio Angular", userId:2}
    ];
  }

  private GetUserTopics(userId: number) : Array<ApplicationParameters.Topic>{
    return[
      { id: 1, title: "C#", description: "Competenza nel linguaggio C#", userId:1},
      { id: 2, title: "Angular", description: "Competenza nel linguaggio Angular", userId:2}
    ].filter(x=>x.userId == userId);
  }

  private GetUserQuestions(userId: number) : Array<ApplicationData.Question>{
    return this.GetAllQuestions().filter(x=>x.submittingUserId == userId);
  }

  private GetAllProjects() : Array<ApplicationParameters.Project>{
    return[
      { id: 0, title: "AllProjects", description: "Web application Gradientflow frontend", workingUsers:[], submittingUserId:-1},
      { id: 1, title: "Gradientflow Frontend", description: "Web application Gradientflow backend", workingUsers:[2], submittingUserId:2},
      { id: 2, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 3, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 4, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 5, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 6, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 7, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 8, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 9, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
    ];
  }

  private GetUserProjects(userId: number) : Array<ApplicationParameters.Project>{
    return[
      { id: 1, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 2, title: "Gradientflow Frontend", description: "Web application Gradientflow backend", workingUsers:[2], submittingUserId:2},
      { id: 3, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 4, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 5, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 6, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 7, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 8, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 9, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
      { id: 10, title: "Gradientflow Backend", description: "Web application Gradientflow frontend", workingUsers:[1], submittingUserId:1},
    ].filter(x=>x.submittingUserId == userId);
  }

  //Applcation Data Methods
  private GetAllQuestions(): Array<ApplicationData.Question>{
    return[
      {
        id: 1,
        content: "Come funziona il layout della pagina ?",
        replied: false,
        submittingUserId: 1,
        topicId: 2, 
        projectId:2,
        evaluations: this.GetQuestionEvaluation(1),
        answers: this.GetQuestionAnswers(1),
      },
      {
        id: 2,
        content: "Come funziona il database ?",
        replied: true,
        submittingUserId: 2,
        topicId: 1, 
        projectId:1,
        evaluations: this.GetQuestionEvaluation(2),
        answers: this.GetQuestionAnswers(2),
      },
      {
        id: 3,
        content: "Il database è una merda ?",
        replied: false,
        submittingUserId: 1,
        topicId: 1, 
        projectId:1,
        evaluations: this.GetQuestionEvaluation(3),
        answers: this.GetQuestionAnswers(3),
      },
    ];
  }

  private GetQuestionAnswers(questionId: number): Array<ApplicationData.Answer>{
    return[
      {
        id: 1,
        content: "Il database ha uno schema blabla",
        submittingUserId: 1,
        verified: false,
        evaluations: this.GetAnswerEvaluation(1),
        questionId: 2,
     },
     {
        id: 2,
        content: "Il database fa schifo",
        submittingUserId: 1,
        verified: false,
        evaluations: this.GetAnswerEvaluation(2),
        questionId: 2, 
     },
    ].filter(x=>x.questionId == questionId)
  }

  private GetQuestionEvaluation(questionId: number): Array<ApplicationData.Evaluation>{
    return[
      {
        id: 1,
        quality: 10,
        valuations: this.GetEvaluationValuations(1),
        questionId: 1,
      },
      {
        id: 2,
        quality: 0,
        valuations: this.GetEvaluationValuations(2),
        questionId: 3,
      },
    ]
  }

  private GetAnswerEvaluation(answerId: number): Array<ApplicationData.Evaluation>{
    return[
      {
        id: 2,
        quality: 10,
        valuations: this.GetEvaluationValuations(3),
        answerId: 1,
      },
      {
        id: 3,
        quality: 2,
        valuations: this.GetEvaluationValuations(4),
        answerId: 2,
      },
    ]
  }

  private GetEvaluationValuations(evaluationId: number): Array<ApplicationData.Valuation>{
    return[]
  }

  private GetChatSessions(): Array<ChatInterface.ChatSession>{
    return [
      {
        id: 1,
        sessionName: "Prima Chat",
        isGroupChat: false,
        usersId:[1,-1],
        createdAt: new Date,   
        createdById: 1, //UserId foreign key
        messages: this.GetMessages(1),
        iaContext: this.GetIaContext(1) ,
      }
    ]
  }

  private GetMessages(sessionId: number): Array<ChatInterface.Message>{
    return[{
      id: 1,
      senderId: 1, //UserId foreign key
      dateTimeSent: new Date,
      messageContent: "ciao",
      sessionId: 1,
      messageType: Enums.MessageTypes.textMessage,
    },
    {
      id: 2,
      senderId: -1, //UserId foreign key
      dateTimeSent: new Date,
      messageContent: "Ciao, come posso aiutarti ?",
      sessionId: 1,
      messageType: Enums.MessageTypes.textMessage,
    }].filter(x=>x.sessionId == sessionId) ?? [];
  }

  private GetIaContext(sessionId: number): Array<ChatInterface.Context>{
    return[{
      id: 1,
      content: "test.doc",
      filePath: "c:/..",
      sessionId: 1
    }].filter(x=>x.sessionId == sessionId) ?? [];
  }
}
