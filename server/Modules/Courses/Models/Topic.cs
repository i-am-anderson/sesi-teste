namespace MyApi.Modules.Courses;

public class Topic
{
    public int Id { get; set; }

    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;

    public int Order { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }

    public List<Lesson> Lessons { get; set; } = [];
}