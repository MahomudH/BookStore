using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.API.Migrations
{
    public partial class addsaleStatusandDateinSalestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2ea85f43-2c8c-4883-8cd0-2dadf938a8bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7e13850-17b3-4593-9308-6acf2c55ec9c");

            migrationBuilder.AddColumn<int>(
                name: "SaleStatus",
                table: "Sales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "SoldDate",
                table: "Sales",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "11521276-771a-4730-9fc1-0fcaa31f8d13", "3dc93667-09ca-4478-adc0-d7597722b208", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c1632c5d-f945-4b1b-b975-1a4c19bfcd38", "352a6001-16a3-41ec-a4cc-e369749a6814", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "11521276-771a-4730-9fc1-0fcaa31f8d13");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c1632c5d-f945-4b1b-b975-1a4c19bfcd38");

            migrationBuilder.DropColumn(
                name: "SaleStatus",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "SoldDate",
                table: "Sales");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2ea85f43-2c8c-4883-8cd0-2dadf938a8bc", "d163a406-b40d-4892-9b38-771079b1a0f1", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d7e13850-17b3-4593-9308-6acf2c55ec9c", "c8892960-84f1-48af-9da5-99e685ac56f4", "Admin", "ADMIN" });
        }
    }
}
