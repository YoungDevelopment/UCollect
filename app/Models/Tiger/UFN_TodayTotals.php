<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class UFN_TodayTotals extends Model
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
    protected $table = 'UFN.TodayTotals';

    /**
     * define the primary key for the table
     *
     * @var string
     */
//    protected $primaryKey = 'GroupName';

    
}