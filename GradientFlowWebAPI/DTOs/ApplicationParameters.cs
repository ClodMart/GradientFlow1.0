using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ApplicationParameters
{
    [Serializable]
    public class Topic
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        //Only for mockUp should be managed backend
        //userId: number,
    }

    [Serializable]
    public class Project
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long[] WorkingUsers { get; set; }
        public long submittingUserId { get; set; }
    }
}
