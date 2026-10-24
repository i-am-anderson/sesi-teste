namespace SesiTeste.Modules.Courses;

public interface ICourseService
{
    Task<CourseListResponse> GetAllAsync(CourseQuery query);
    Task<CourseDetailDto?> GetByIdAsync(int id);
    Task<CourseFiltersDto> GetFiltersAsync();
    Task<CourseDetailDto?> GetBySlugAsync(string slug);
}