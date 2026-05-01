<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkInvoicesOverdue extends Command
{
    protected $signature = 'invoices:mark-overdue';

    protected $description = 'Mark pending invoices past their due date as overdue';

    public function handle(): void
    {
        $updated = Invoice::where('status', 'pending')
            ->whereDate('due_date', '<', Carbon::today())
            ->update(['status' => 'overdue']);

        $this->info("Marked {$updated} invoice(s) as overdue.");
    }
}
