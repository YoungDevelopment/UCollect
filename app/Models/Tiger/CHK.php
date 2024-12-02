<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class CHK extends Model
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
    protected $table = 'CDSMSC.CHK';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['CHK_POST_IDATE', 'CHK_DBR_NO'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    public function scopeSetupToday($query)
    {
        return $query->whereDate('EntryDate', Carbon::now()->toDateString());
    }

    /**
     * CHK belongs to a dbr
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dbr()
    {
        return $this->belongsTo(DBR::class,'CHK_DBR_NO','DBR_NO');
    }

    /**
     * CHK belongs to a usr
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function usr()
    {
        return $this->belongsTo(USR::class, 'CHK_USERID', 'USR_CODE');
    }
}