using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ApplicationData
{
    [Serializable]
    public class Question
    {
        public long Id {get; set;}
        public string Content { get; set;}
        public bool Replied { get; set;}
        public long SubmittingUserId {get; set;}
        public long TopicId {get; set;}
        public long ProjectId {get; set;}
        public Evaluation[] Evaluations { get; set; }
        public Answer[] Answers { get; set; }          
    }

    [Serializable]
    public class Answer
    {
        public long Id {get; set;}
        public string Content { get; set;}
        public long submittingUserId {get; set;}
        public bool Verified { get; set;}
        public Evaluation[] Evaluations { get; set; }
        //Only for mockUp should be managed backend
        //public long questionId {get; set;}
    }

    [Serializable]
    public class Evaluation
    {
        public long Id {get; set;}
        public double? Quality { get; set;}
        public Valuation[] Valuations { get; set; }
        //Only for mockUp should be managed backend
        //questionId?: number,
        //answerId?: number,
    }

    [Serializable]
    public class Valuation
    {
        public int ValuationType { get; set;}
        public double? Value { get; set;}
    }

}
