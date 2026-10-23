using Microsoft.EntityFrameworkCore;
using SesiTeste.Shared.Data;

namespace SesiTeste.Modules.Courses;

public class CourseService(AppDbContext db) : ICourseService
{
  public async Task<CourseListResponse> GetAllAsync(CourseQuery q)
  {
    var query = db.Courses.AsNoTracking().AsQueryable();

    if (!string.IsNullOrWhiteSpace(q.Search))
    {
      var term = $"%{q.Search.Trim()}%";
      query = query.Where(c =>
          EF.Functions.ILike(c.FullName, term) ||
          EF.Functions.ILike(c.ShortName, term));
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
            c.Id, c.FullName, c.ShortName, c.Description,
            new CategoryDto(c.Category.Id, c.Category.Name),
            c.Modality, c.WorkloadHours, c.TargetAudience,
            c.Status, c.ImageUrl, c.AvailableFrom))
        .ToListAsync();

    var totalPages = (int)Math.Ceiling(total / (double)q.PageSize);

    return new CourseListResponse(total, q.Page, q.PageSize, totalPages, items);
  }
}