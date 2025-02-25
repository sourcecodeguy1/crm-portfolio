<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Invoice::with('client')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric',
            'status' => 'required|in:pending,paid',
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
            'status' => 'required|in:pending,paid',
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

}
