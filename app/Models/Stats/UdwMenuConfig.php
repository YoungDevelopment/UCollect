<?php

namespace App\Models\Stats;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UdwMenuConfig extends Model
{
     use HasFactory;

    protected $connection = 'sqlsrv3';

    protected $table = 'udw_menu_config';




    // Fillable attributes (mass-assignable fields)
    protected $fillable = [
        'udw_seq_no',
        'menu_name',
    ];

    // Optional: Define relationships
    public function fields()
    {
        return $this->hasMany(UdwFieldConfig::class, 'udw_seq_no', 'udw_seq_no');
    }
}
