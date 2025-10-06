<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ClientSeeder extends Seeder
{
    public function run()
    {
        // In non-production, use factories (requires Faker)
        if (!app()->environment('production')) {
            Client::factory()
                ->count(10)
                ->has(Invoice::factory()->count(3))
                ->create();
            return;
        }

        // In production, seed a small deterministic dataset without Faker
        $now = Carbon::now();
        $areaCodes = [202, 212, 213, 305, 312, 415, 469, 503, 602, 617, 646, 702, 703, 708, 718, 808, 832, 917];
        $streets   = ['Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Lake', 'Hill', 'Sunset', 'Riverview', 'Broad', 'Ash', 'Birch', 'Willow'];
        $types     = ['St', 'Ave', 'Blvd', 'Rd', 'Dr', 'Ln', 'Way'];
        $cities    = ['Austin', 'Denver', 'Seattle', 'Miami', 'Chicago', 'Boston', 'Portland', 'Phoenix', 'Atlanta', 'Dallas', 'San Jose', 'San Diego', 'Tampa'];
        $states    = ['TX', 'CO', 'WA', 'FL', 'IL', 'MA', 'OR', 'AZ', 'GA', 'CA', 'NY', 'NV', 'VA'];
        $companies = ['Acme Corp', 'Globex LLC', 'Initech', 'Umbrella Co', 'Soylent Inc', 'Stark Industries', 'Wayne Enterprises', 'Hooli', 'Wonka Industries', 'Gekko & Co'];

        for ($i = 1; $i <= 10; $i++) {
            // Random phone like (415) 234-5678
            $area = $areaCodes[array_rand($areaCodes)];
            $phone = sprintf('(%03d) %03d-%04d', $area, random_int(200, 999), random_int(1000, 9999));

            // Random address like 123 Maple Ave, Denver, CO
            $addrNo = random_int(100, 9999);
            $street = $streets[array_rand($streets)];
            $type   = $types[array_rand($types)];
            $city   = $cities[array_rand($cities)];
            $state  = $states[array_rand($states)];
            $address = "$addrNo $street $type, $city, $state";
            $company = $companies[array_rand($companies)] . ' - ' . $city;

            $client = Client::updateOrCreate(
                ['email' => "client{$i}@example.com"],
                [
                    'name' => "Client {$i}",
                    // Match DB columns: phone_number and company
                    'phone_number' => $phone,
                    'company' => $company,
                ]
            );

            // 3 invoices each
            for ($j = 1; $j <= 3; $j++) {
                $amount = 100 * $j + $i; // simple deterministic amount
                $due = $now->copy()->addDays($i + $j);
                Invoice::updateOrCreate(
                    [
                        'client_id' => $client->id,
                        'number' => "INV-{$client->id}-{$j}",
                    ],
                    [
                        'amount' => $amount,
                        'status' => $j % 3 === 0 ? 'paid' : 'pending',
                        'due_date' => $due,
                        'notes' => 'Demo invoice (deterministic seed)'
                    ]
                );
            }
        }
    }
}

