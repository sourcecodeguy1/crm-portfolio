<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;

class ActivityLogController extends Controller
{
    public function index(): JsonResponse
    {
        $logs = ActivityLog::orderByDesc('created_at')
            ->limit(20)
            ->get(['id', 'type', 'description', 'subject_type', 'subject_id', 'created_at']);

        return response()->json($logs);
    }
}
