namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbdategroups : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GroupEntities", "CreateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.GroupEntities", "DueDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GroupEntities", "DueDate");
            DropColumn("dbo.GroupEntities", "CreateDate");
        }
    }
}
