namespace SignatureRequests.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class db1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RequestEntities", "GroupEntity_Id", c => c.Int());
            AddColumn("dbo.GroupEntities", "FormEntity_Id1", c => c.Int());
            CreateIndex("dbo.RequestEntities", "GroupEntity_Id");
            CreateIndex("dbo.GroupEntities", "FormEntity_Id1");
            AddForeignKey("dbo.RequestEntities", "GroupEntity_Id", "dbo.GroupEntities", "Id");
            AddForeignKey("dbo.GroupEntities", "FormEntity_Id1", "dbo.FormEntities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupEntities", "FormEntity_Id1", "dbo.FormEntities");
            DropForeignKey("dbo.RequestEntities", "GroupEntity_Id", "dbo.GroupEntities");
            DropIndex("dbo.GroupEntities", new[] { "FormEntity_Id1" });
            DropIndex("dbo.RequestEntities", new[] { "GroupEntity_Id" });
            DropColumn("dbo.GroupEntities", "FormEntity_Id1");
            DropColumn("dbo.RequestEntities", "GroupEntity_Id");
        }
    }
}
