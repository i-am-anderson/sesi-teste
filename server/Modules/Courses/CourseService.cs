using Microsoft.EntityFrameworkCore;
using SesiTeste.Shared.Data;
using System.Globalization;
using System.Text;

namespace SesiTeste.Modules.Courses;

public class CourseService(AppDbContext db) : ICourseService
{
    // Método auxiliar para remover acentos de uma string (usado para a busca)
    private static string RemoveAccents(string text)
    {
        var decomposed = text.Normalize(NormalizationForm.FormD);
        var clean = decomposed.Where(ch => CharUnicodeInfo.GetUnicodeCategory(ch) != UnicodeCategory.NonSpacingMark);
        return new string(clean.ToArray()).Normalize(NormalizationForm.FormC);
    }

    // Método para obter a lista de cursos com filtros e paginação
    public async Task<CourseListResponse> GetAllAsync(CourseQuery q)
    {
        var query = db.Courses.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(q.Search))
        {
            var term = $"%{RemoveAccents(q.Search.Trim())}%";
            query = query.Where(c =>
                EF.Functions.ILike(AppDbContext.Unaccent(c.FullName), term) ||
                EF.Functions.ILike(AppDbContext.Unaccent(c.ShortName), term));
        }

        if (q.CategoryId is not null) query = query.Where(c => c.CategoryId == q.CategoryId);
        if (q.Modality is not null) query = query.Where(c => c.Modality == q.Modality);
        if (q.Status is not null) query = query.Where(c => c.Status == q.Status);

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(c => c.FullName)
            .ThenBy(c => c.Id)
            .Skip((q.Page - 1) * q.PageSize)
            .Take(q.PageSize)
            .Select(c => new CourseListItemDto(
                c.Id, c.FullName, c.ShortName, c.Slug, c.Description,
                new CategoryDto(c.Category.Id, c.Category.Name),
                c.Modality, c.WorkloadHours, c.TargetAudience,
                c.Status, c.ImageUrl, c.AvailableFrom))
            .ToListAsync();

        var totalPages = (int)Math.Ceiling(total / (double)q.PageSize);

        return new CourseListResponse(total, q.Page, q.PageSize, totalPages, items);
    }

    // Método para obter detalhes de um curso específico por ID
    public Task<CourseDetailDto?> GetByIdAsync(int id) =>
        ProjectDetail(db.Courses.AsNoTracking().Where(c => c.Id == id)).FirstOrDefaultAsync();

    // Método para obter detalhes de um curso específico por slug
    public Task<CourseDetailDto?> GetBySlugAsync(string slug) =>
        ProjectDetail(db.Courses.AsNoTracking().Where(c => c.Slug == slug)).FirstOrDefaultAsync();

    private static IQueryable<CourseDetailDto> ProjectDetail(IQueryable<Course> source) =>
        source.Select(c => new CourseDetailDto(
            c.Id, c.FullName, c.ShortName, c.Slug, c.Description,
            new CategoryDto(c.Category.Id, c.Category.Name),
            c.Modality, c.WorkloadHours, c.TargetAudience,
            c.Status, c.ImageUrl, c.AvailableFrom,
            c.Topics.OrderBy(t => t.Order)
                .Select(t => new TopicDto(
                    t.Id, t.Order, t.Title, t.Description,
                    t.Lessons.OrderBy(l => l.Order)
                        .Select(l => new LessonDto(l.Id, l.Order, l.Title, l.Description, l.DurationMinutes))
                        .ToList()))
                .ToList()));
    // Método para obter filtros disponíveis para cursos
    public async Task<CourseFiltersDto> GetFiltersAsync()
    {
        var categories = await db.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new CategoryDto(c.Id, c.Name))
            .ToListAsync();

        return new CourseFiltersDto(
            categories,
            Enum.GetNames<Modality>(),
            Enum.GetNames<CourseStatus>());
    }
}