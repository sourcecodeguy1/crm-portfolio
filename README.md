# CRM Portfolio

A modern, full-stack Customer Relationship Management system built with Angular and Laravel.

## Overview

This CRM Portfolio is a demonstration of a robust, production-ready customer relationship management system that showcases modern web development practices and DevOps techniques.

### Key Features

- **Angular Frontend**: Modern, responsive UI built with Angular 19+
- **Laravel Backend**: RESTful API powered by Laravel 10+
- **Docker Containerization**: Microservice architecture with separate containers for frontend and backend
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Cloud Hosting**: Deployed on Vultr cloud infrastructure

## Architecture

The application follows a microservice architecture with clear separation of concerns:

CRM Portfolio ├── client/ - Angular frontend ├── server/ - Laravel API backend └── .github/workflows/ - CI/CD pipeline configuration

### Frontend (Angular)

The client application is built with the latest version of Angular, featuring:

- Component-based architecture
- Reactive state management
- Responsive design with Bootstrap
- Dynamic runtime configuration
- Google Analytics integration

### Backend (Laravel)

The server API is built with Laravel, providing:

- RESTful API endpoints
- Authentication using Laravel Sanctum
- Database migrations and models
- Comprehensive error handling
- Environment-based configuration

## Deployment

The application is deployed using a CI/CD pipeline:

1. Code is pushed to GitHub
2. GitHub Actions builds Docker images for both frontend and backend
3. Images are pushed to Docker Hub
4. Deployment to Vultr VPS is triggered automatically
5. Services are updated with zero downtime

## Development

### Prerequisites

- Node.js 18+
- PHP 8.1+
- Docker and Docker Compose
- Composer

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sourcecodeguy1/crm-portfolio.git
   cd crm-portfolio
