using System.Text.Json.Serialization;
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using MyApi.Shared.Data;

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
}

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();