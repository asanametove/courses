import { of } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '@shared/course';
import * as api from '@shared/api';

describe('CoursesService', () => {
  let service: CoursesService;
  let http: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    delete: jasmine.Spy,
  };
  let loadingService: {};
  let courses: Course[];

  const fakeDate = '2000-01-01';
  const start = 1;
  const count = 2;
  const textFragment = 'textFragment';

  beforeEach(() => {
    http = jasmine.createSpyObj('Http', ['get', 'post', 'delete']);
    loadingService = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    http.get.and.returnValue(of(courses = [
      new Course('', 1, 'des1'),
      new Course('course2', 2, 'des2'),
    ]));

    service = new CoursesService(http as any, loadingService as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO test courses mapping
  describe('#getCourses', () => {
    it('should make API call', (done) => {
      service.getCourses({start, count, textFragment}).subscribe(() => {
        expect(http.get).toHaveBeenCalledWith(
          `${api.courses}?start=${start}&count=${count}&textFragment=${textFragment}`,
        );
        done();
      });
    });

    it('should return courses list', (done) => {
      service.getCourses({start, count}).subscribe((data) => {
        expect(data.length).toBe(courses.length);
        done();
      });
    });
  });

  describe('#createCourse', () => {
    beforeEach(() => {
      http.post.and.returnValue(of({}));
    });

    it('should make POST request to courses API', () => {
      const name = 'name';
      const length = 1;
      const description = 'description';
      const date = new Date(fakeDate);
      service.createCourse(name, length, description, date);

      expect(http.post).toHaveBeenCalledWith(
        api.courses,
        {name, length, description, date},
      );
    });
  });

  // TODO test after integration with real API
  describe('#getCourseById', () => {
    it('should find course by ID', () => {
    });

    it('should throw an error if can not find course by ID', () => {
    });
  });

  // TODO test after integration with real API
  describe('#updateCourse', () => {
    it('should update course', () => {
    });
  });

  describe('#removeCourse', () => {
    beforeEach(() => {
      http.delete.and.returnValue(of({}));
    });

    it('should make DELETE request to courses API', () => {
      const id = 'id';
      service.removeCourse(id);

      expect(http.delete).toHaveBeenCalledWith(`${api.courses}/${id}`);
    });
  });
});
