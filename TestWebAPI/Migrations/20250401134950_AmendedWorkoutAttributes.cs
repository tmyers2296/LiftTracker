using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AmendedWorkoutAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Workouts",
                newName: "Name");

            migrationBuilder.AddColumn<bool>(
                name: "IsImprovised",
                table: "Workouts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RoutineId",
                table: "Workouts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "WorkoutExerciseSets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "RoutineExerciseSets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_RoutineId",
                table: "Workouts",
                column: "RoutineId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExerciseSets_WorkoutExerciseId",
                table: "WorkoutExerciseSets",
                column: "WorkoutExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_ExerciseId",
                table: "WorkoutExercises",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_Exercises_ExerciseId",
                table: "WorkoutExercises",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_Workouts_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "Workouts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExerciseSets_WorkoutExercises_WorkoutExerciseId",
                table: "WorkoutExerciseSets",
                column: "WorkoutExerciseId",
                principalTable: "WorkoutExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Routines_RoutineId",
                table: "Workouts",
                column: "RoutineId",
                principalTable: "Routines",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_Exercises_ExerciseId",
                table: "WorkoutExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_Workouts_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExerciseSets_WorkoutExercises_WorkoutExerciseId",
                table: "WorkoutExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Routines_RoutineId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_RoutineId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExerciseSets_WorkoutExerciseId",
                table: "WorkoutExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_ExerciseId",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "IsImprovised",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "RoutineId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "WorkoutExerciseSets");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "RoutineExerciseSets");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Workouts",
                newName: "Type");
        }
    }
}
