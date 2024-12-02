<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class WorkRestrictions extends Model
{
    public $timestamps = false;
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for Work Restrictions
     *
     * @var string
     */
    protected $table = 'UFN.WorkRestrictions';

    /**
     * define the primary key for the table
     *
     * @var string
     */

    protected $fillable = [
        "Client",
        "AcctID",
        "Acctnumber",
        "WorkRestrictionTypeID",
        "WorkRestrictionSourceID",
        "StartDate",
        "EndDate"
    ];
}