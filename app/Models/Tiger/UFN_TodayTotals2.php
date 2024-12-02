<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class UFN_TodayTotals2 extends Model
{
    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for UFN.TodayTotals2
     *
     * @var string
     */
    protected $table = 'UFN.TodayTotals2';

}