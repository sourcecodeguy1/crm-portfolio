# CRM Portfolio - Laravel API

This is the backend API for the CRM Portfolio project, built with Laravel 10.

## Technology Stack

- **Framework**: Laravel 10+
- **Authentication**: Laravel Sanctum
- **Database**: MySQL/MariaDB
- **API Style**: RESTful
- **Caching**: Redis (optional)
- **Queue Processing**: Laravel Queue with database driver

## Directory Structure
```
server/ 
├── app/ 
│ ├── Http/ 
│ │ ├── Controllers/ # API controllers 
│ │ └── Middleware/ # Request middleware 
│ ├── Models/ # Eloquent models 
│ └── Providers/ # Service providers 
├── config/ # Configuration files 
├── database/ 
│ ├── migrations/ # Database migrations 
│ └── seeders/ # Database seeders 
├── routes/ 
│ └── api.php # API routes 
└── Dockerfile # Docker configuration
```

## Configuration

The application is configured through environment variables, following Laravel conventions:

- `.env` file for local development
- Environment variables in production
- Configuration files in the `config/` directory

## Development

### Local Development

```bash
# Install dependencies
composer install
```
```bash
# Set up environment
cp .env.example .env
php artisan key:generate
```
```bash
# Run migrations
php artisan migrate
```
```bash
# Start development server
php artisan serve
```
# Build Docker image
```bash
docker build -t crm-api .
```
```bash
# Run Docker container
docker run -p 8000:9000 crm-api
```
## API Documentation
The API follows RESTful conventions with the following main endpoints:

- `/api/auth/*` - Authentication endpoints
- `/api/users/*` - User management
- `/api/customers/*` - Customer data
- `/api/products/*` - Product information
- `/api/orders/*` - Order processing
```
{
  "success": true|false,
  "data": { ... },
  "message": "Optional message",
  "errors": { ... }
}
```
