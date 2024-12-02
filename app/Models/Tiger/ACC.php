<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class ACC extends Model
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
    protected $table = 'CDS.ACC';

    /**
     * define the primary key for the table
     *
     * @var string
     */
//    protected $primaryKey = ['ADR_DBR_NO', 'ADR_SEQ_NO'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $timestamps = false;
    public $incrementing = false;

    /**
     * ADR belongs to a dbr
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dbr()
    {
        return $this->belongsTo(DBR::class,'ADR_DBR_NO','DBR_NO');
    }

}
