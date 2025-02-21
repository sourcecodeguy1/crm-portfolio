<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @method static \App\Models\Invoice create(array $attributes)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueDate($value)
 */


class Invoice extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'amount', 'status', 'due_date'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
