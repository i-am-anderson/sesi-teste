using Microsoft.AspNetCore.Mvc;

namespace SesiTeste.Modules.Courses;

[ApiController]
[Route("api/[controller]")]   // => /api/courses
public class CoursesController(ICourseService service) : ControllerBase
{
    // Rota GET /api/courses?search=...&categoryId=1&modality=Online&status=Open&page=1&pageSize=12
    [HttpGet]
    public async Task<ActionResult<CourseListResponse>> GetAll([FromQuery] CourseQuery query) =>
        Ok(await service.GetAllAsync(query));

    // Rota GET /api/courses/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<CourseDetailDto>> GetById(int id)
    {
        var course = await service.GetByIdAsync(id);
        return course is null ? NotFound() : Ok(course);
    }

    // Rota GET /api/courses/filters (retorna categorias, modalidades e status, para o front montar os filtros sem deixar valores fixos no código)
    [HttpGet("filters")]
    public async Task<ActionResult<CourseFiltersDto>> GetFilters() =>
        Ok(await service.GetFiltersAsync());

    // Rota GET /api/courses/{slug} (retorna detalhes do curso pelo slug)
    [HttpGet("{slug}")]
    public async Task<ActionResult<CourseDetailDto>> GetBySlug(string slug)
    {
        var course = await service.GetBySlugAsync(slug);
        return course is null ? NotFound() : Ok(course);
    }
}