namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbstatusgroups : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GroupEntities", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.GroupEntities", "Status");
        }
    }
}
