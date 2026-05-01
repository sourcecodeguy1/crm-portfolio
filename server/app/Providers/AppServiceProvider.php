<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\Invoice;
use App\Observers\ClientObserver;
use App\Observers\InvoiceObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Client::observe(ClientObserver::class);
        Invoice::observe(InvoiceObserver::class);
    }
}
