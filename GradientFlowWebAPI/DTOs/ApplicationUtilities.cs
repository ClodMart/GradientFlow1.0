using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ApplicationUtilities
{
    [Serializable]
    public class ColumnDefinition
    {
        public string ColId { get; set; }
        public string Header { get; set; }
        public Enums.columnType? colType { get; set; }
    }

    [Serializable]
    public class ProjectsTableData
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int QuestionsToReply { get; set; }
        public int QuestionsReplied { get; set; }    
      }

    [Serializable]
    public class QuestionTableData
    {
        public long Id { get; set; }
        public string Content { get; set; }
        public bool Replied { get; set; }
        public long TopicId { get; set; }
        public long ProjectId { get; set; }
        public double? Evaluation { get; set; }
        public int AnswerNumber { get; set; }
    }

    [Serializable]
    public class UsersTableData
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int NumberOfProjects { get; set; }
        public int numberOfQuestions { get; set; }   
      }

}
