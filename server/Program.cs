using System.Text.Json.Serialization;
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using SesiTeste.Shared.Data;
using SesiTeste.Modules.Courses;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddOpenApi();

// Configura o contexto do banco de dados, usando a string de conexão definida no appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();

    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // o método MigrateAsync cria o banco de dados e aplica as migrations pendentes, ao clonar o projeto, o banco de dados será criado automaticamente e populado com os cursos de exemplo
    await db.Database.MigrateAsync();
    await CourseSeeder.SeedAsync(db);
}

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();