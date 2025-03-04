# CRM Portfolio - Angular Client

This is the frontend application for the CRM Portfolio project, built with Angular 19.

## Technology Stack

- **Framework**: Angular 19+
- **Styling**: Bootstrap 5
- **HTTP**: Angular HttpClient with interceptors
- **Analytics**: Google Analytics integration
- **Routing**: Angular Router with lazy loading
- **State Management**: Signal-based reactive state

## Directory Structure
```
client/ ├── src/
        │ ├── app/ 
        │ │ ├── components/ # UI components 
        │ │ ├── interfaces/ # TypeScript interfaces 
        │ │ ├── interceptors/ # HTTP interceptors 
        │ │ ├── services/ # Service layer for API calls 
        │ │ ├── app.component.ts # Root component 
        │ │ └── app.routes.ts # Application routes 
        │ ├── assets/ # Static assets 
        │ │ └── config.json # Runtime configuration 
        │ └── environments/ # Environment configuration 
        ├── nginx/ # Nginx configuration for production 
        └── Dockerfile # Docker configuration
```
## Configuration

This application uses a runtime configuration approach rather than build-time environment files:

- `src/assets/config.json` contains environment-specific settings that are loaded at runtime
- The ConfigService loads this file and provides the configuration to the application
- This allows for environment-specific configuration without rebuilding the application

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Production build
ng build --configuration=production

# Build Docker image
docker build -t crm-client .

# Run Docker container
docker run -p 4200:80 crm-client
```
## Configuration

This application uses a runtime configuration approach rather than build-time environment files:

- `src/assets/config.json` contains environment-specific settings that are loaded at runtime
- The ConfigService loads this file and provides the configuration to the application
- This allows for environment-specific configuration without rebuilding the application

### Local Development Configuration

For local development:

1. Copy the example configuration file:
   ```bash
   cp src/assets/config.example.json src/assets/config.json
   ```
```bash
{
  "production": false,
  "apiUrl": "http://localhost:8000/api",
  "googleAnalyticsId": ""
}


