<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Client extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone_number', 'company'];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
