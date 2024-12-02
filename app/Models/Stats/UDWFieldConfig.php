<?php

namespace App\Models\Stats;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class UDWFieldConfig extends Model
{
    //
     use HasFactory;

    protected $connection = 'sqlsrv3';

    protected $table = 'udw_fields_config';

     protected $fillable = [
        'udw_seq_no',
        'field_name',
        'ud_column_name'
    ];

      public function menu()
    {
        return $this->belongsTo(UdwMenuConfig::class, 'udw_seq_no', 'udw_seq_no');
    }

}
