namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbtitlegroups : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GroupEntities", "Title", c => c.String());
            AddColumn("dbo.GroupEntities", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.GroupEntities", "Description");
            DropColumn("dbo.GroupEntities", "Title");
        }
    }
}
