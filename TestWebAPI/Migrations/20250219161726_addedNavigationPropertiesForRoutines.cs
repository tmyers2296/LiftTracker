using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addedNavigationPropertiesForRoutines : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RoutineExerciseSets_RoutineExerciseId",
                table: "RoutineExerciseSets",
                column: "RoutineExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_ExerciseId",
                table: "RoutineExercises",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_RoutineId",
                table: "RoutineExercises",
                column: "RoutineId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Exercises_ExerciseId",
                table: "RoutineExercises",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Routines_RoutineId",
                table: "RoutineExercises",
                column: "RoutineId",
                principalTable: "Routines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExerciseSets_RoutineExercises_RoutineExerciseId",
                table: "RoutineExerciseSets",
                column: "RoutineExerciseId",
                principalTable: "RoutineExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Exercises_ExerciseId",
                table: "RoutineExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Routines_RoutineId",
                table: "RoutineExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExerciseSets_RoutineExercises_RoutineExerciseId",
                table: "RoutineExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExerciseSets_RoutineExerciseId",
                table: "RoutineExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_ExerciseId",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_RoutineId",
                table: "RoutineExercises");
        }
    }
}
