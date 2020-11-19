import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { CreateLessonInput } from "./create-lesson.input";
import { Lesson } from "./lesson.entity";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService: LessonService,
        private studentService: StudentService) {}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLessonById(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput,
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getStudentsByIds(lesson.students);
    }
}