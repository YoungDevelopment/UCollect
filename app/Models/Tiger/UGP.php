<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class UGP extends Model
{
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for UGP
     *
     * @var string
     */
    protected $table = 'CDS.UGP';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['UGP_CODE'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * UGP has many usr.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usr()
    {
        return $this->hasMany(USR::class,'UGP_CODE','USR_GROUP');
    }
}