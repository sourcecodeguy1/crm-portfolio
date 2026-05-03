<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $invoices = Invoice::with('client')->paginate($perPage);
        return response()->json($invoices);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric',
            'status' => 'required|in:pending,paid,overdue',
            'due_date' => 'required|date',
        ]);

        $invoice = Invoice::create($validated);

        return response()->json($invoice, 201);
    }

    public function show(Invoice $invoice): JsonResponse
    {
        return response()->json($invoice->load('client'));
    }

    public function update(Request $request, Invoice $invoice): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric',
            'status' => 'required|in:pending,paid,overdue',
            'due_date' => 'required|date',
        ]);

        $invoice->update($validated);

        return response()->json($invoice);
    }

    public function destroy(Invoice $invoice): Response
    {
        $invoice->delete();
        return response()->noContent();
    }

    public function count(): JsonResponse
    {
        $count = Invoice::count();
        Log::info("Invoice count: {$count}");
        return response()->json(['count' => $count]);
    }

    public function pending(): JsonResponse
    {
        return response()->json(['count' => Invoice::where('status', 'pending')->count()]);
    }

    public function totalRevenue(): JsonResponse
    {
        return response()->json(['total_revenue' => Invoice::sum('amount')]);
    }

    public function statusBreakdown(): JsonResponse
    {
        return response()->json([
            'paid' => Invoice::where('status', 'paid')->count(),
            'pending' => Invoice::where('status', 'pending')->count(),
            'overdue' => Invoice::where('status', 'overdue')->count(),
        ]);
    }

    public function revenueOverTime(): JsonResponse
    {
        $revenueData = Invoice::selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        return response()->json([
            'dates' => $revenueData->pluck('date'),
            'revenue' => $revenueData->pluck('total')
        ]);
    }

    public function revenueThisMonth(): JsonResponse
    {
        $thisMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        $thisMonthRevenue = Invoice::where('status', 'paid')
            ->where('created_at', '>=', $thisMonth)
            ->sum('amount');

        $lastMonthRevenue = Invoice::where('status', 'paid')
            ->whereBetween('created_at', [$lastMonth, $lastMonthEnd])
            ->sum('amount');

        $change = $lastMonthRevenue > 0
            ? round((($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1)
            : null;

        return response()->json([
            'this_month' => (float) $thisMonthRevenue,
            'last_month' => (float) $lastMonthRevenue,
            'change_percent' => $change,
        ]);
    }

    public function topClients(): JsonResponse
    {
        $clients = Invoice::where('status', 'paid')
            ->select('client_id', DB::raw('SUM(amount) as total_revenue'), DB::raw('COUNT(*) as invoice_count'))
            ->with('client:id,name,company')
            ->groupBy('client_id')
            ->orderByDesc('total_revenue')
            ->limit(5)
            ->get()
            ->map(fn($row) => [
                'id' => $row->client_id,
                'name' => $row->client->name ?? 'Unknown',
                'company' => $row->client->company ?? null,
                'total_revenue' => (float) $row->total_revenue,
                'invoice_count' => $row->invoice_count,
            ]);

        return response()->json($clients);
    }

    public function overdueCount(): JsonResponse
    {
        return response()->json(['count' => Invoice::where('status', 'overdue')->count()]);
    }

    public function download(Invoice $invoice): \Illuminate\Http\Response
    {
        $invoice->load('client');
        $pdf = Pdf::loadView('invoices.pdf', ['invoice' => $invoice]);
        $filename = 'invoice-' . str_pad($invoice->id, 5, '0', STR_PAD_LEFT) . '.pdf';

        return $pdf->download($filename);
    }

}
