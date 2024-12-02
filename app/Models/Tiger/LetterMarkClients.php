<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LetterMarkClients extends Model
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
    protected $table = 'tiger.UFN.LetterMarkClients';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    // protected $primaryKey = ['CLT_NO'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    // public $incrementing = false;

    // protected $fillable = [
    //     "SIF" 
    // ];
 
}
