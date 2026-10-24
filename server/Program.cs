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

builder.Services.AddCoursesModule();

// CORS (https://learn-microsoft-com.translate.goog/en-us/aspnet/core/security/cors?view=aspnetcore-10.0&_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc)
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
    {
        if (allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    }));

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
app.UseCors();
app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();