<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Invoice;

class InvoiceObserver
{
    /**
     * Handle the Invoice "created" event.
     */
    public function created(Invoice $invoice): void
    {
        $client = $invoice->client?->name ?? 'Unknown';
        ActivityLog::record(
            'invoice_created',
            "Invoice #{$invoice->id} created for {$client} (\${$invoice->amount}).",
            Invoice::class,
            $invoice->id
        );
    }

    /**
     * Handle the Invoice "updated" event.
     */
    public function updated(Invoice $invoice): void
    {
        if ($invoice->wasChanged('status')) {
            $status = $invoice->status;
            $client = $invoice->client?->name ?? 'Unknown';
            ActivityLog::record(
                "invoice_{$status}",
                "Invoice #{$invoice->id} for {$client} marked as {$status}.",
                Invoice::class,
                $invoice->id
            );
        }
    }

    /**
     * Handle the Invoice "deleted" event.
     */
    public function deleted(Invoice $invoice): void
    {
        $client = $invoice->client?->name ?? 'Unknown';
        ActivityLog::record(
            'invoice_deleted',
            "Invoice #{$invoice->id} for {$client} was deleted.",
            Invoice::class,
            $invoice->id
        );
    }

    /**
     * Handle the Invoice "restored" event.
     */
    public function restored(Invoice $invoice): void
    {
        //
    }

    /**
     * Handle the Invoice "force deleted" event.
     */
    public function forceDeleted(Invoice $invoice): void
    {
        //
    }
}
