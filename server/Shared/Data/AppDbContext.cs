using Microsoft.EntityFrameworkCore;
using SesiTeste.Modules.Courses;

namespace SesiTeste.Shared.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Course> Courses => Set<Course>();
  public DbSet<Topic> Topics => Set<Topic>();
  public DbSet<Lesson> Lessons => Set<Lesson>();

  protected override void OnModelCreating(ModelBuilder modelBuilder) =>
      // encontra todas as IEntityTypeConfiguration<T> do projeto, de qualquer módulo
      modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
}