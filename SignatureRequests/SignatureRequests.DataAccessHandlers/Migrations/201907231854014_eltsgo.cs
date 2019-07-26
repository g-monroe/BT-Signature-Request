namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class eltsgo : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BoxEntities", "FormId", "dbo.FormEntities");
            DropIndex("dbo.BoxEntities", new[] { "FormId" });
            AddColumn("dbo.BoxEntities", "FormHeight", c => c.Int(nullable: false));
            AddColumn("dbo.BoxEntities", "FormWidth", c => c.Int(nullable: false));
            AlterColumn("dbo.BoxEntities", "FormId", c => c.Int());
            CreateIndex("dbo.BoxEntities", "FormId");
            AddForeignKey("dbo.BoxEntities", "FormId", "dbo.FormEntities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BoxEntities", "FormId", "dbo.FormEntities");
            DropIndex("dbo.BoxEntities", new[] { "FormId" });
            AlterColumn("dbo.BoxEntities", "FormId", c => c.Int(nullable: false));
            DropColumn("dbo.BoxEntities", "FormWidth");
            DropColumn("dbo.BoxEntities", "FormHeight");
            CreateIndex("dbo.BoxEntities", "FormId");
            AddForeignKey("dbo.BoxEntities", "FormId", "dbo.FormEntities", "Id", cascadeDelete: true);
        }
    }
}
