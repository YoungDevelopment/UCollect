<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Disputes extends Model
{
    public $timestamps = false;
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for Disputes
     *
     * @var string
     */
    protected $table = 'UFN.Disputes';

    /**
     * define the primary key for the table
     *
     * @var string
     */

    protected $fillable = [
        "Client",
        "AcctID",
        "Acctnumber",
        "DisputeID",
        "DisputeDate",
        "DisputeTypeID",
        "DisputeCommunicationTypeID",
        "DisputeSourceID",
        "DisputeResponsibilityID",
        "DisputeResolutionDate",
        "DisputeResolutionTypeID"
    ];
}