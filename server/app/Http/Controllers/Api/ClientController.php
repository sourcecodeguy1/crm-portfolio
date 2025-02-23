<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(Client::with('invoices')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone_number' => 'nullable|string',
            'company' => 'nullable|string',
        ]);

        $client = Client::create($validated);

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client): JsonResponse
    {
        return response()->json($client->load('invoices'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone_number' => 'nullable|string',
            'company' => 'nullable|string',
        ]);

        $client->update($validated);

        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client): Response
    {
        $client->delete();
        return response()->noContent();
    }

    public function count(): JsonResponse
    {
        return response()->json(['count' => Client::query()->count()]);
    }
}
