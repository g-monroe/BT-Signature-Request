namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
<<<<<<< HEAD:SignatureRequests/SignatureRequests.DataAccessHandlers/Migrations/201907171558244_EditBox.cs
    public partial class EditBox : DbMigration
=======
    public partial class Migration : DbMigration
>>>>>>> d08ba1428226d9e57648f8783d3db5886ddf1cac:SignatureRequests/SignatureRequests.DataAccessHandlers/Migrations/201907152144220_Migration.cs
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BoxEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Width = c.Int(nullable: false),
                        Height = c.Int(nullable: false),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                        Type = c.String(nullable: false),
                        SignerType = c.String(nullable: false),
                        SignedStatus = c.String(nullable: false),
                        RequestId = c.Int(),
                        SignatureId = c.Int(),
                        FormId = c.Int(nullable: false),
                        PageNumber = c.Int(nullable: false),
                        IsModel = c.Boolean(nullable: false),
                        Text = c.String(),
                        Date = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RequestEntities", t => t.RequestId)
                .ForeignKey("dbo.FormEntities", t => t.FormId, cascadeDelete: true)
                .ForeignKey("dbo.SignatureEntities", t => t.SignatureId)
                .Index(t => t.RequestId)
                .Index(t => t.SignatureId)
                .Index(t => t.FormId);
            
            CreateTable(
                "dbo.FormEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FilePath = c.String(nullable: false),
                        Title = c.String(nullable: false, maxLength: 255),
                        Description = c.String(maxLength: 400),
                        CreateDate = c.DateTime(nullable: false),
                        UserId = c.Int(nullable: false),
                        NumPages = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserEntities", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.GroupEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FormId = c.Int(nullable: false),
                        Title = c.String(),
                        Description = c.String(),
<<<<<<< HEAD:SignatureRequests/SignatureRequests.DataAccessHandlers/Migrations/201907171558244_EditBox.cs
=======
                        CreateDate = c.DateTime(nullable: false),
                        DueDate = c.DateTime(nullable: false),
                        Status = c.String(),
>>>>>>> d08ba1428226d9e57648f8783d3db5886ddf1cac:SignatureRequests/SignatureRequests.DataAccessHandlers/Migrations/201907152144220_Migration.cs
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FormEntities", t => t.FormId, cascadeDelete: true)
                .Index(t => t.FormId);
            
            CreateTable(
                "dbo.RequestEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SignerId = c.Int(nullable: false),
                        GroupId = c.Int(nullable: false),
                        RequestorId = c.Int(nullable: false),
                        Status = c.String(nullable: false),
                        SentDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GroupEntities", t => t.GroupId, cascadeDelete: true)
                .ForeignKey("dbo.UserEntities", t => t.RequestorId)
                .ForeignKey("dbo.UserEntities", t => t.SignerId)
                .Index(t => t.SignerId)
                .Index(t => t.GroupId)
                .Index(t => t.RequestorId);
            
            CreateTable(
                "dbo.UserEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Role = c.String(nullable: false, maxLength: 255),
                        Name = c.String(nullable: false, maxLength: 255),
                        Email = c.String(nullable: false, maxLength: 255),
                        Password = c.String(nullable: false, maxLength: 255),
                        SignatureId = c.Int(),
                        InitialId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SignatureEntities", t => t.InitialId)
                .ForeignKey("dbo.SignatureEntities", t => t.SignatureId)
                .Index(t => t.SignatureId)
                .Index(t => t.InitialId);
            
            CreateTable(
                "dbo.SignatureEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ImagePath = c.String(nullable: false),
                        CertificatePath = c.String(nullable: false),
                        CertificatePassword = c.String(nullable: false, maxLength: 255),
                        Location = c.String(maxLength: 255),
                        Reason = c.String(maxLength: 400),
                        ContactInfo = c.String(maxLength: 400),
                        isInitial = c.Boolean(nullable: false),
                        UserId = c.Int(nullable: false),
                        ExpirationDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserEntities", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BoxEntities", "SignatureId", "dbo.SignatureEntities");
            DropForeignKey("dbo.BoxEntities", "FormId", "dbo.FormEntities");
            DropForeignKey("dbo.FormEntities", "UserId", "dbo.UserEntities");
            DropForeignKey("dbo.RequestEntities", "SignerId", "dbo.UserEntities");
            DropForeignKey("dbo.RequestEntities", "RequestorId", "dbo.UserEntities");
            DropForeignKey("dbo.UserEntities", "SignatureId", "dbo.SignatureEntities");
            DropForeignKey("dbo.UserEntities", "InitialId", "dbo.SignatureEntities");
            DropForeignKey("dbo.SignatureEntities", "UserId", "dbo.UserEntities");
            DropForeignKey("dbo.RequestEntities", "GroupId", "dbo.GroupEntities");
            DropForeignKey("dbo.BoxEntities", "RequestId", "dbo.RequestEntities");
            DropForeignKey("dbo.GroupEntities", "FormId", "dbo.FormEntities");
            DropIndex("dbo.SignatureEntities", new[] { "UserId" });
            DropIndex("dbo.UserEntities", new[] { "InitialId" });
            DropIndex("dbo.UserEntities", new[] { "SignatureId" });
            DropIndex("dbo.RequestEntities", new[] { "RequestorId" });
            DropIndex("dbo.RequestEntities", new[] { "GroupId" });
            DropIndex("dbo.RequestEntities", new[] { "SignerId" });
            DropIndex("dbo.GroupEntities", new[] { "FormId" });
            DropIndex("dbo.FormEntities", new[] { "UserId" });
            DropIndex("dbo.BoxEntities", new[] { "FormId" });
            DropIndex("dbo.BoxEntities", new[] { "SignatureId" });
            DropIndex("dbo.BoxEntities", new[] { "RequestId" });
            DropTable("dbo.SignatureEntities");
            DropTable("dbo.UserEntities");
            DropTable("dbo.RequestEntities");
            DropTable("dbo.GroupEntities");
            DropTable("dbo.FormEntities");
            DropTable("dbo.BoxEntities");
        }
    }
}
