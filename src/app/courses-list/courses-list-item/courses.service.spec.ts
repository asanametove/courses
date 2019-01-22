import { CoursesService } from './courses.service';
import { CourseUpdateInfo, Course } from '@shared/course';

describe('CoursesService', () => {
  let service: CoursesService;
  let course: Course;

  beforeEach(() => {
    service = new CoursesService();
    [, course] = service.getCourses();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCourses', () => {
    it('should return courses list', () => {
      expect(service.getCourses()).toBeTruthy();
    });
  });

  describe('#createCourse', () => {
    it('should add new course to the courses list', () => {
      const title = 'New title';
      service.createCourse(title, 1, 'description');

      const newCourse = service.getCourses().pop();
      expect(newCourse.title).toBe(title);
    });

    it('should change courses list reference', () => {
      const oldRef = service.getCourses();
      service.createCourse('title', 1, 'description');

      expect(service.getCourses()).not.toBe(oldRef);
    });
  });

  describe('#getCourseById', () => {
    it('should find course by ID', () => {
      expect(service.getCourseById(course.id)).toBe(course);
    });

    it('should throw an error if can not find course by ID', () => {
      expect(() => service.getCourseById('notExistingId')).toThrow(new Error('Course not found'));
    });
  });

  describe('#updateCourse', () => {
    it('should update course', () => {
      const updateInfo: CourseUpdateInfo = {
        title: 'new title',
        duration: 1000,
        description: 'new description',
        topRated: true,
      };

      service.updateCourse(course.id, updateInfo);

      expect(course).toEqual(jasmine.objectContaining(updateInfo));
    });
  });

  describe('#removeCourse', () => {
    it('should remove course with provided id', () => {
      service.removeCourse(course.id);

      expect(service.getCourses()).not.toContain(course);
    });

    it('should change courses list reference', () => {
      const oldRef = service.getCourses();
      service.removeCourse(course.id);

      expect(service.getCourses()).not.toBe(oldRef);
    });
  });
});
