namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.GroupEntities", "FormEntity_Id", "dbo.FormEntities");
            DropIndex("dbo.GroupEntities", new[] { "FormEntity_Id" });
            RenameColumn(table: "dbo.GroupEntities", name: "FormEntity_Id", newName: "FormId");
            AlterColumn("dbo.GroupEntities", "FormId", c => c.Int(nullable: false));
            CreateIndex("dbo.GroupEntities", "FormId");
            AddForeignKey("dbo.GroupEntities", "FormId", "dbo.FormEntities", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupEntities", "FormId", "dbo.FormEntities");
            DropIndex("dbo.GroupEntities", new[] { "FormId" });
            AlterColumn("dbo.GroupEntities", "FormId", c => c.Int());
            RenameColumn(table: "dbo.GroupEntities", name: "FormId", newName: "FormEntity_Id");
            CreateIndex("dbo.GroupEntities", "FormEntity_Id");
            AddForeignKey("dbo.GroupEntities", "FormEntity_Id", "dbo.FormEntities", "Id");
        }
    }
}
