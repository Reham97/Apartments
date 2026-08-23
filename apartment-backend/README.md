# Apartment Backend

Backend API for the Apartment application.

The backend is built with NestJS and provides REST APIs for managing apartments, including filtering, pagination, image uploads, environment-based API prefixes, PostgreSQL persistence, Prisma ORM, Swagger documentation, and health checks.

---

## Features

- Create apartments
- Get all apartments
- Get apartment details by ID
- Filter apartments by:
  - City
  - Minimum price
  - Maximum price
  - Number of bedrooms
- Pagination
- Upload multiple apartment images
- Maximum 10 images per apartment request
- Automatic upload directory creation
- Serve uploaded images as static files
- PostgreSQL database
- Prisma ORM
- Database migrations
- Prisma client generation
- Database seeding
- DTO validation
- Automatic request transformation
- Environment support:
  - `dev`
  - `sit`
- Environment-based API prefixes
- Swagger API documentation
- Health check endpoint
- Docker support
- Docker Compose support
- CORS configuration for the frontend

---

# Tech Stack

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Programming language |
| PostgreSQL | Database |
| Prisma | ORM and database management |
| Multer | File uploads |
| Swagger | API documentation |
| Docker | Containerization |
| Docker Compose | Running backend and database services |
| class-validator | DTO validation |
| class-transformer | Request transformation |

