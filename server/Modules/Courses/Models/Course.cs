namespace MyApi.Modules.Courses;

public class Course
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public Modality Modality { get; set; }
    public int WorkloadHours { get; set; }
    public string TargetAudience { get; set; } = string.Empty;
    public CourseStatus Status { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public DateOnly? AvailableFrom { get; set; }

    public List<Topic> Topics { get; set; } = [];
}