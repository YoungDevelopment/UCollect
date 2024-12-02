<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Account_Triggers extends Model
{
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
    protected $table = 'UFN.Account_Triggers';

    /**
     * define the primary key for the table
     *
     * @var string
     */

    protected $fillable = [
        "unifin_id_number",
        "vendor",
        "unique_identifier",
        "trigger_code",
        "kob",
        "trigger_date",
        "amount",
        "consumer_statement",
        "record_id",
        "collection_group",
        "notice_date"
    ];
}