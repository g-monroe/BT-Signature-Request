namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class goaway : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FormEntities", "NumPages", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.FormEntities", "NumPages");
        }
    }
}
