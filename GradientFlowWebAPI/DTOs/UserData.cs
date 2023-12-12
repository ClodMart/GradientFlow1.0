using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.UserData
{

    [Serializable]
    public class UserLoginData {
        public long Userid { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }


    [Serializable]
    public class UserPersonalData
    {
        public long Userid { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime birthDate { get; set; }
        public string Email { get; set; }
        public double Credit { get; set; }
        //paymentMethods: PaymentMethods[]
    }

    [Serializable]
    public class UserAppdata
    {
        public long Userid { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int[] Permissions { get; set; }
        //Topics: ApplicationParameters.Topic[],
        //projects: ApplicationParameters.Project[]
        //questions: ApplicationData.Question[];
    }

    [Serializable]
    public class PaymentMethods
    {
        public long Id { get; set; }

        //To Do
    }

}
