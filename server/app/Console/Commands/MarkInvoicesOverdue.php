<?php

namespace App\Console\Commands;

use App\Models\ActivityLog;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkInvoicesOverdue extends Command
{
    protected $signature = 'invoices:mark-overdue';

    protected $description = 'Mark pending invoices past their due date as overdue';

    public function handle(): void
    {
        $invoices = Invoice::where('status', 'pending')
            ->whereDate('due_date', '<', Carbon::today())
            ->with('client:id,name')
            ->get();

        foreach ($invoices as $invoice) {
            $invoice->updateQuietly(['status' => 'overdue']);
            ActivityLog::record(
                'invoice_overdue',
                "Invoice #{$invoice->id} for \"{$invoice->client?->name}\" is now overdue.",
                Invoice::class,
                $invoice->id
            );
        }

        $this->info("Marked {$invoices->count()} invoice(s) as overdue.");
    }
}
