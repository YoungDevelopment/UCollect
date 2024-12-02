<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Unifin\TableFilters\TableFilter;

class PendingRecalls extends Model
{
    public $timestamps = false;
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
    protected $table = 'UFN.PendingRecalls';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = [
        "ClientReferenceNumber",
        "RemoteNumber",
        "RecallReason",
        "Client",
        "FileName",
        "RecallProcessed",
        "Keeper",
        "objection_filename",
        "created_at",
        "processed_at",
        "approval_status",
        "approved_by"
    ];

    public function scopeTableFilters($query, TableFilter $paginate)
    {
        return $paginate->apply($query);
    }


}