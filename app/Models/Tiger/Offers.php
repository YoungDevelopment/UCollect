<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class Offers extends Model
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
    protected $table = 'UFN.Offers';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = 'Offer_ID';

    protected $fillable = [
        "Account_Number",
        "Offer_Date",
        "Offer_Expire_Days",
        "Offer_Balance",
        "Offer_Method",
        "Offer1_Amt",
        "Offer2_Amt",
        "Offer3_Amt",
        "Offer4_Amt",
        "Offer5_Amt",
        "Offer6_Amt"
    ];


}