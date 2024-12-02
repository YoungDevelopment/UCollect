<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DeliverableClients extends Model
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
    protected $table = 'Deliverable.Clients';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['Client_ID'];
    
    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        "Client_ID",
    ];

    /**
     * UDW belongs to a dbr
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // public function dbr()
    // {
    //     return $this->belongsTo(DBR::class,'UDW_DBR_NO','DBR_NO');
    // }

}