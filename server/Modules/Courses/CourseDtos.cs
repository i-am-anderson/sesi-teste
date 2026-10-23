using System.ComponentModel.DataAnnotations;

namespace SesiTeste.Modules.Courses;

public record CategoryDto(int Id, string Name);

public record CourseListItemDto(
    int Id,
    string FullName,
    string ShortName,
    string Description,
    CategoryDto Category,
    Modality Modality,
    int WorkloadHours,
    string TargetAudience,
    CourseStatus Status,
    string ImageUrl,
    DateOnly? AvailableFrom);

// "quantidade de resultados" = Total
public record CourseListResponse(
    int Total,          // total de resultados (todas as páginas)
    int Page,
    int PageSize,
    int TotalPages,
    IReadOnlyList<CourseListItemDto> Items);

// Parâmetros da query string: ?search=...&categoryId=1&modality=Online&status=Open
public class CourseQuery
{
  public string? Search { get; set; }
  public int? CategoryId { get; set; }
  public Modality? Modality { get; set; }
  public CourseStatus? Status { get; set; }

  [Range(1, int.MaxValue)]
  public int Page { get; set; } = 1;

  [Range(1, 50)]
  public int PageSize { get; set; } = 12;
}