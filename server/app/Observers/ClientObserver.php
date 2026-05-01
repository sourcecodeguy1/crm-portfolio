<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Client;

class ClientObserver
{
    public function created(Client $client): void
    {
        ActivityLog::record(
            'client_added',
            "Client {$client->name} was added.",
            Client::class,
            $client->id
        );
    }

    public function deleted(Client $client): void
    {
        ActivityLog::record(
            'client_deleted',
            "Client {$client->name} was deleted.",
            Client::class,
            $client->id
        );
    }
}
