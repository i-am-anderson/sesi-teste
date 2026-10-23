namespace SesiTeste.Modules.Courses;

public interface ICourseService
{
    Task<CourseListResponse> GetAllAsync(CourseQuery query);
}