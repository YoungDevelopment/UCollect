<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class ViewUdwSt extends Model
{
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for DBR
     *
     * @var string
     */
    protected $table = 'UFN.UDW_0ST';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['UDW_DBR_NO'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * UDW belongs to a dbr
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dbr()
    {
        return $this->belongsTo(DBR::class,'UDW_DBR_NO','DBR_NO');
    }

}