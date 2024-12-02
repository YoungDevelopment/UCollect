<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PRM extends Model
{
    public $timestamps = false;
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for DAT
     *
     * @var string
     */
    protected $table = 'CDS.PRM';


    protected $casts = [
        'PRM_PROM_DATE_O' => 'datetime:m-d-Y',
        'PRM_ENTRY_DATE_O' => 'datetime:m-d-Y',
    ];

//    protected function PrmPromDateO(): Attribute
//    {
//        return Attribute::make(
//            get: fn (string $value) => date($value),
//        );
//    }


//    public function getPrmFlagAttribute()
//    {
//        return ($this->attributes['PRM_FLAG'] == 1) ? 'Paid!' : '';
////        return 0;
//    }
    /**
     * define the primary key for the table
     *
     * @var string
     */

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */

    /**
     * convert columns to their appropriate types
     *
     * @var array
     */


    /**
     * hide columns that are not needed and for security
     *
     * @var array
     */

    /**
     * accessors to append to the model's array form
     *
     * @var array
     */

    /**
     * A dbr has many trs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

}
