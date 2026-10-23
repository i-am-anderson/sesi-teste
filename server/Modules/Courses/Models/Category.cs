namespace SesiTeste.Modules.Courses;

public class Category
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;

  public List<Course> Courses { get; set; } = [];
}