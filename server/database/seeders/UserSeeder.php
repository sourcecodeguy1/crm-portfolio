<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 fake users
        User::factory()->count(10)->create();

        // Ensure a deterministic demo user exists (idempotent)
        $pass = env('DEMO_PASSWORD', 'password');
        User::updateOrCreate(
            ['email' => 'demo@juliowebmaster.com'],
            ['name' => 'Demo User', 'password' => Hash::make($pass)]
        );
    }
}
