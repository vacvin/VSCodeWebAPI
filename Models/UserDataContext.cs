using Microsoft.EntityFrameworkCore;

namespace VSCodeWebAPI.models
{
    public class UserDataContext: DbContext
    {
        public UserDataContext(DbContextOptions<UserDataContext> options)
            : base(options)
        {
        }

        public DbSet<UserData> UserDatas { get; set; }
    }
}