using Microsoft.AspNetCore.Mvc;

namespace SesiTeste.Modules.Courses;

[ApiController]
[Route("api/[controller]")]   // => /api/courses
public class CoursesController(ICourseService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<CourseListResponse>> GetAll([FromQuery] CourseQuery query) =>
        Ok(await service.GetAllAsync(query));
}