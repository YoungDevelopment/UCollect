<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class SCD extends Model
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
    protected $table = 'CDSMSC.SCD';

    /**
     * define the primary key for the table
     *
     * @var string
     */

    protected $fillable = [
        "SCD_DBR_NO",
        "SCD_IDATE",
        "SCD_SEQ_NO",
        "SCD_DESCRIPTION",
        "SCD_FILENAME",
        "SCD_EXT",
        "SCD_DATE_O",
        "SCD_ARCHIVE_DATE",
        "SCD_TYPE",
        "SCD_INVOICE_NO",
        "SCD_USER_ID",
        "SCD_TIME"
    ];
}