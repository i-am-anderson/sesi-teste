using Microsoft.EntityFrameworkCore;
using SesiTeste.Modules.Courses;

namespace SesiTeste.Shared.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Course> Courses => Set<Course>();
  public DbSet<Topic> Topics => Set<Topic>();
  public DbSet<Lesson> Lessons => Set<Lesson>();

  // Mapeia a função unaccent() do PostgreSQL (só traduzida em consultas, nunca executada em C#)
  [DbFunction("unaccent", IsBuiltIn = true)]
  public static string Unaccent(string value) => throw new NotSupportedException();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // habilita a extensão unaccent (criada pela migration)
    modelBuilder.HasPostgresExtension("unaccent");

    // encontra todas as IEntityTypeConfiguration<T> do projeto, de qualquer módulo
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
  }
}