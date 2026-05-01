<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $type
 * @property string $description
 * @property string|null $subject_type
 * @property int|null $subject_id
 * @property Carbon $created_at
 */
class ActivityLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'type',
        'description',
        'subject_type',
        'subject_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    public static function record(string $type, string $description, ?string $subjectType = null, ?int $subjectId = null): void
    {
        static::create([
            'type' => $type,
            'description' => $description,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
        ]);
    }
}
