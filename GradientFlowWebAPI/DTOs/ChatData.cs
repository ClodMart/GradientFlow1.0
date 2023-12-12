using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ChatData
{
    [Serializable]
    public class ChatSession
    {
        public long Id {get; set;}
        public string SessionName { get; set;}
        public bool IsGroupChat { get; set;}
        public long[] UsersId { get; set;} 
        public DateTime CreatedAt { get; set;}   
        public long CreatedById { get; set;} //UserId foreign key
        public Message[] Messages { get; set;}
        public Context[] IaContext { get; set;}
    }

    [Serializable]
    public class Message
    {
       public long Id {get; set;}
       public long SenderId { get; set;} //UserId foreign key
       public DateTime DateTimeSent { get; set;}
       public string MessageContent { get; set;}
       //public attachment?: any,
       //Used on mock
       //public long SessionId { get; set;}
       //public Enums.MessageTypes MessageType { get; set;}
       //public Message[] Alternatives { get; set;}
    }
    [Serializable]
    public class Context
    {
        public long Id {get; set;}
        public string FileId { get; set; } //File Id
        public string FilePath { get; set;}
        //Used on mock
        //public long SessionId {get; set;}
    }
}
