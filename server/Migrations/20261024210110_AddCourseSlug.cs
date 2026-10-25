using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SesiTeste.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseSlug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "courses",
                type: "character varying(120)",
                maxLength: 120,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_courses_Slug",
                table: "courses",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_courses_Slug",
                table: "courses");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "courses");
        }
    }
}
