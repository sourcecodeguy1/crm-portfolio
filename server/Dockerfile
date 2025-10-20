# Use official PHP FPM image
FROM php:8.3-fpm

# Build-time version (CI will pass APP_VERSION; defaults to 'unknown')
ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Add custom PHP-FPM pool config for better concurrency
RUN echo '[www]\n\
pm = dynamic\n\
pm.max_children = 20\n\
pm.start_servers = 5\n\
pm.min_spare_servers = 3\n\
pm.max_spare_servers = 10\n\
pm.max_requests = 500' > /usr/local/etc/php-fpm.d/zz-custom.conf

# Expose FPM port for CRM-Portfolio API
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
