<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Scrub_Hits extends Model
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
    protected $table = 'UFN.Scrub_Hits';

    /**
     * define the primary key for the table
     *
     * @var string
     */

    protected $fillable = [
        "unifin_id_number",
        "notice_date",
        "vendor",
        "hit_type",
        "match_code",
        "file_date_dod",
        "name",
        "case_number",
        "atty_name",
        "court_name",
        "judge",
        "bkp_chapter",
        "bkp_discharge_date",
        "bkp_closed_date",
        "lit_actions"
    ];
}