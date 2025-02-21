<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @method static \App\Models\Client create(array $attributes)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereCompany($value)
 */

class Client extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone_number', 'company'];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
