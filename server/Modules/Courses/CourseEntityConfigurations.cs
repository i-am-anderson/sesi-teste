using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SesiTeste.Modules.Courses;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
  public void Configure(EntityTypeBuilder<Category> e)
  {
    e.ToTable("categories");
    e.Property(x => x.Name).IsRequired().HasMaxLength(80);
    e.HasIndex(x => x.Name).IsUnique();
  }
}

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
  public void Configure(EntityTypeBuilder<Course> e)
  {
    e.ToTable("courses");
    e.Property(x => x.FullName).IsRequired().HasMaxLength(150);
    e.Property(x => x.ShortName).IsRequired().HasMaxLength(60);
    e.Property(x => x.Description).IsRequired().HasMaxLength(2000);
    e.Property(x => x.TargetAudience).IsRequired().HasMaxLength(300);
    e.Property(x => x.ImageUrl).IsRequired().HasMaxLength(500);

    // enums gravados como texto
    e.Property(x => x.Modality).HasConversion<string>().HasMaxLength(20);
    e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);

    e.HasOne(x => x.Category)
     .WithMany(x => x.Courses)
     .HasForeignKey(x => x.CategoryId)
     .OnDelete(DeleteBehavior.Restrict);
  }
}

public class TopicConfiguration : IEntityTypeConfiguration<Topic>
{
  public void Configure(EntityTypeBuilder<Topic> e)
  {
    e.ToTable("topics");
    e.Property(x => x.Title).IsRequired().HasMaxLength(150);
    e.Property(x => x.Description).HasMaxLength(1000);

    e.HasOne(x => x.Course)
     .WithMany(x => x.Topics)
     .HasForeignKey(x => x.CourseId)
     .OnDelete(DeleteBehavior.Cascade);
  }
}

public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
{
  public void Configure(EntityTypeBuilder<Lesson> e)
  {
    e.ToTable("lessons");
    e.Property(x => x.Title).IsRequired().HasMaxLength(150);
    e.Property(x => x.Description).IsRequired().HasMaxLength(1000);

    e.HasOne(x => x.Topic)
     .WithMany(x => x.Lessons)
     .HasForeignKey(x => x.TopicId)
     .OnDelete(DeleteBehavior.Cascade);
  }
}