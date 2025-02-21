<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Invoice extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'amount', 'status', 'due_date'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
