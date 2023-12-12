using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Enums
{

        public enum dataType
        {
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

        public enum roles
        {
            Admin = 1,
            User = 2,
        }

        public enum tableId
        {
            UserProjects = 1,
            UserQuestions = 2,
            Users = 3
        }

        public enum columnType
        {
            stringa = 1,
            number = 2,
            notification = 3,
            button = 4,
        }


        public enum SearchCategory
        {
            questions = 0,
            projects = 1,
            users = 2,
        }

        public enum questionSearchMethod
        {
            All,
            QuestionId,
            Content,
            Project,
            Topic,
            SubmittingUser
        }

        public enum ProjectSearchMethod
        {
            All,
            ProjectId,
            Description,
            User,
        }

        public enum userSearchMethod
        {
            All,
            UserId,
            Username,
            Email,
        }

        public enum MessageTypes
        {
            textMessage,
            image,
        }
    }

