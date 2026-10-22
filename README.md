# SESI Teste

## Health
http://localhost:5116/health

## Docs
http://localhost:5116/scalar/v1


## Gerar e aplicar a migration
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```