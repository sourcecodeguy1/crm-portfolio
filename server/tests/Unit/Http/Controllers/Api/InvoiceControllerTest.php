<?php

namespace Tests\Unit\Http\Controllers\Api;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class InvoiceControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        Artisan::call('db:seed', ['--class' => 'UserSeeder']);
        $this->user = User::where('email', 'admin@juliowebmaster.com')->first();
        Sanctum::actingAs($this->user);
    }

    public function testStoreAcceptsAllValidStatuses(): void
    {
        $client = Client::factory()->create();
        $validStatuses = ['pending', 'paid', 'overdue'];

        foreach ($validStatuses as $status) {
            $response = $this->postJson('/api/invoices', [
                'client_id' => $client->id,
                'amount' => 100.00,
                'status' => $status,
                'due_date' => now()->addWeek()->format('Y-m-d'),
            ]);

            $response->assertCreated();
            $this->assertDatabaseHas('invoices', [
                'client_id' => $client->id,
                'status' => $status,
            ]);
        }
    }

    public function testUpdateAcceptsOverdueStatus(): void
    {
        $client = Client::factory()->create();
        $invoice = Invoice::factory()->create([
            'client_id' => $client->id,
            'status' => 'pending',
        ]);

        $response = $this->putJson("/api/invoices/{$invoice->id}", [
            'client_id' => $client->id,
            'amount' => $invoice->amount,
            'status' => 'overdue',
            'due_date' => $invoice->due_date,
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('invoices', [
            'id' => $invoice->id,
            'status' => 'overdue',
        ]);
    }

    public function testStoreRejectsInvalidStatus(): void
    {
        $client = Client::factory()->create();

        $response = $this->postJson('/api/invoices', [
            'client_id' => $client->id,
            'amount' => 100.00,
            'status' => 'invalid_status',
            'due_date' => now()->addWeek()->format('Y-m-d'),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['status']);
    }

    public function testStatusBreakdownIncludesOverdue(): void
    {
        $client = Client::factory()->create();
        Invoice::factory()->count(2)->create(['client_id' => $client->id, 'status' => 'paid']);
        Invoice::factory()->count(3)->create(['client_id' => $client->id, 'status' => 'pending']);
        Invoice::factory()->count(1)->create(['client_id' => $client->id, 'status' => 'overdue']);

        $response = $this->getJson('/api/invoices/status-breakdown');

        $response->assertOk();
        $response->assertJson([
            'paid' => 2,
            'pending' => 3,
            'overdue' => 1,
        ]);
    }
}
