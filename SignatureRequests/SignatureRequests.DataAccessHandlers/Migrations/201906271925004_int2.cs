namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class int2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.GroupEntities", new[] { "FormEntity_Id" });
            AlterColumn("dbo.GroupEntities", "FormEntity_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.GroupEntities", "FormEntity_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.GroupEntities", new[] { "FormEntity_Id" });
            AlterColumn("dbo.GroupEntities", "FormEntity_Id", c => c.Int());
            CreateIndex("dbo.GroupEntities", "FormEntity_Id");
        }
    }
}
