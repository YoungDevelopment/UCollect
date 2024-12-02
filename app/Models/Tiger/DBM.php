<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class DBM extends Model
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
    protected $table = 'CDS.DBM';

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
    public $incrementing = false;

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
