using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestWebAPI.Migrations
{
    public partial class FixDateColumnType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Add a temporary column of the correct type
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Date_temp",
                table: "Workouts",
                type: "timestamp with time zone",
                nullable: true);

            // 2. Copy and cast data from the old column into the new one
            migrationBuilder.Sql(
                @"UPDATE ""Workouts"" 
                  SET ""Date_temp"" = ""Date""::timestamptz
                  WHERE ""Date"" IS NOT NULL;"
            );

            // 3. Drop the original column
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Workouts");

            // 4. Rename temp to the original name
            migrationBuilder.RenameColumn(
                name: "Date_temp",
                table: "Workouts",
                newName: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Reverse logic if needed
            migrationBuilder.AddColumn<string>(
                name: "Date_temp",
                table: "Workouts",
                type: "text",
                nullable: true);

            migrationBuilder.Sql(
                @"UPDATE ""Workouts"" 
                  SET ""Date_temp"" = ""Date""::text
                  WHERE ""Date"" IS NOT NULL;"
            );

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "Date_temp",
                table: "Workouts",
                newName: "Date");
        }
    }
}
