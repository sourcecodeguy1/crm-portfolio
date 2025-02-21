<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run()
    {
        Client::factory()
            ->count(10)
            ->has(Invoice::factory()->count(3))
            ->create();
    }
}
