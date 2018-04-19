using System;

namespace VSCodeWebAPI.models
{
    public class UserData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreateTime { get; set; }
    }
}