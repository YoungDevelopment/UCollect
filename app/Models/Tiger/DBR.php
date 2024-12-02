<?php

namespace App\Models\Tiger;

use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class DBR extends Model
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
    protected $table = 'CDS.DBR';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = 'DBR_NO';

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * convert columns to their appropriate types
     *
     * @var array
     */
    protected $casts = [
        'DBR_LAST_WORKED_O'     => 'datetime:m/d/Y',
        'DBR_LAST_TRUST_DATE_O' => 'datetime:m/d/Y'
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('m/d/Y');
    }

    /**
     * hide columns that are not needed and for security
     *
     * @var array
     */
    protected $hidden = [
        'DBR_AGENCY',
        'DBR_ACN',
        'DBR_NEXT_LTR_DATE',
        'DBR_NEXT_LTR_NO',
        'DBR_LETTER_SET',
        'DBR_TIE_SERIES',
        'DBR_NAME1',
        'DBR_REVIEW_DATE',
        'DBR_PRIORITY',
        'DBR_RS',
        'DBR_ASSIGN_DATE',
        'DBR_PCASGN_DATE',
        'DBR_LAST_CHG_DATE',
        'DBR_LAST_PAY_DATE',
        'DBR_LAST_TRUST_DATE',
        'DBR_INT_THRU_DATE',
        'DBR_LAST_WORKED',
        'DBR_LAST_LETTER',
        'DBR_CLOSE_DATE',
        'DBR_JUDGMENT_DATE',
        'DBR_JUDGMENT_INT_STDT',
        'DBR_LAST_PDC_POST',
        'DBR_LST_PDC_DATE',
        'DBR_PC_CHARGES',
        'DBR_INT_TOT',
        'DBR_INT_DUE',
        'DBR_COURT_TOT',
        'DBR_LAST_PDC_DATE',
        'DBR_COURT_DUE',
        'DBR_ATTY_TOT',
        'DBR_ATTY_DUE',
        'DBR_OTHER_TOT',
        'DBR_OTHER_DUE',
        'DBR_MISC_TOT',
        'DBR_MISC_DUE',
        'DBR_CNTF_TOT',
        'DBR_CNTF_DUE',
        'DBR_JINT_DUE',
        'DBR_COMM_TO_DATE',
        'DBR_INT_RATE',
        'DBR_COM_RATE',
        'DBR_COM_RULE',
        'DBR_TRW_STATUS',
        'DBR_TRW_FIRST_DATE',
        'DBR_TRW_LAST_DATE',
        'DBR_TRW_FLAG',
        'DBR_TRW_FLAG_1',
        'DBR_TRW_FLAG_2',
        'DBR_TRW_FLAG_3',
        'DBR_TRW_FLAG_4',
        'DBR_1_FLAG',
        'DBR_2_FLAG',
        'DBR_3_FLAG',
        'DBR_4_FLAG',
        'DBR_CLIENT_INT_AMT',
        'DBR_PC_SER',
        'DBR_TIME_ZONE',
        'DBR_RJ_LETTER',
        'DBR_WS_RULE',
        'DBR_LT_COLL_FLAG',
        'DBR_CLASS',
        'DBR_CATEGORY',
        'DBR_PROVID_DBASE',
        'DBR_NO_ACK',
        'DBR_BATCH_NO',
        'DBR_BATCH_SEQ',
        'DBR_ADV_COSTS',
        'DBR_CL_CODES_1',
        'DBR_CL_CODES_2',
        'DBR_CL_CODES_3',
        'DBR_CL_CODES_4',
        'DBR_CL_MISC_2',
        'DBR_CL_MISC_3',
        'DBR_CL_MISC_4',
        'DBR_CL_DATES_1',
        'DBR_CL_DATES_2',
        'DBR_CL_DATES_3',
        'DBR_CL_DATES_4',
        'DBR_FIRST_DEL_DATE',
        'DBR_NEGOTIATE_AMT',
        'DBR_JUDGMENT_AMT',
        'DBR_WS_LTR_CNT',
        'DBR_WS_PHN_CONN_CNT',
        'DBR_WS_DAYS_WORKED_CNT',
        'DBR_WS_LTR_NCNT',
        'DBR_TTL_CRD_RPTS',
        'DBR_TTL_EXT_SKP_TR',
        'DBR_TTL_BANKOS',
        'DBR_COMM_STATUS',
        'DBR_YEARS_AT_RES',
        'DBR_YEARS_AT_EMP',
        'DBR_NO_REAL_ESTATE',
        'DBR_NO_AUTOS',
        'DBR_OS_SCORE',
        'DBR_TRW_CCC',
        'DBR_ORG_DB',
        'DBR_CR_FLAGS',
        'DBR_STL_PER',
        'DBR_STL_EXP',
        'DBR_STL_AMT',
        'DBR_STL_DIS',
        'DBR_NEXT_LTR_DATE_O',
        'DBR_REVIEW_DATE_O',
        'DBR_PCASGN_DATE_O',
        'DBR_LAST_CHG_DATE_O',
        'DBR_LAST_PAY_DATE_O',
        'DBR_COLL_FLAGS',
        'DBR_INT_THRU_DATE_O',
        'DBR_LAST_LETTER_O',
        'DBR_JUDGMENT_DATE_O',
        'DBR_JUDGMENT_INT_STDT_O',
        'DBR_TRW_FIRST_DATE_O',
        'DBR_TRW_LAST_DATE_O',
        'DBR_CL_DATES_1_O',
        'DBR_CL_DATES_2_O',
        'DBR_CL_DATES_3_O',
        'DBR_CL_DATES_4_O',
        'DBR_FIRST_DEL_DATE_O',
        'DBR_PAYMENTS_MADE',
        'DBR_TIGER_LINK',
        'DBR_INTEREST_AMT',
        'DBR_ORIG_INT_THRU_DATE',
        'DBR_LAST_ADJUSTMENT_DATE',
        'DBR_INT_COMP_FLAG',
        'DBR_JUDGMENT_FLAG',
        'DBR_CNTF_FLAG',
        'DBR_WS_START_DATE',
        'DBR_TIME_OF_DAY',
        'DBR_LINK_SERIES',
        'DBR_LAST_LETTER_CODE',
        'DBR_TIE_FLAG',
        'DBR_BILLING_CYCLE',
        'DBR_BILLING_CNTR',
        'DBR_CCCS',
        'DBR_REFUND',
        'DBR_LAST_DEL_DATE',
        'DBR_TIE_GROUP',
        'DBR_JINT_TOT',
        'DBR_WS1_LTR_CNT',
        'DBR_WS1_LTR_NCNT',
        'DBR_WS1_PHN_CONN_CNT',
        'DBR_WS1_DAYS_WORKED_CNT',
        'DBR_PROBABILITY',
        'DBR_CHARGE_OFF_AMT',
        'DBR_PRINCIPAL_DUE'
    ];

    /**
     * accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        // 'full_name', 'assigned_amount',
        // 'last_trust_amount', 'received_total',
        // 'client', 'last_worked', 'last_transaction'
        ];


     /**
     * A dbr has many trs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function adr()
    {
        return $this->hasMany(ADR::class, 'ADR_DBR_NO', 'DBR_NO');
    }

    /**
     * A dbr has many trs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function trs()
    {
        return $this->hasMany(TRS::class, 'TRS_DBR_NO', 'DBR_NO');
    }

    /**
     * A dbr has many chk.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function chk()
    {
        return $this->hasMany(CHK::class, 'CHK_DBR_NO', 'DBR_NO');
    }

    /**
     * A dbr has many udw.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function udw()
    {
        return $this->hasMany(UDW::class, 'UDW_DBR_NO', 'DBR_NO');
    }

    /**
     * A dbr has many udwst.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function viewUdwSt()
    {
        return $this->hasMany(ViewUdwSt::class, 'UDW_DBR_NO', 'DBR_NO');
    }

    /**
     * A dbr has many clt.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clt()
    {
        return $this->hasMany(CLT::class, 'CLT_NO', 'DBR_CLIENT');
    }

    /**
     * accessor to full name, capitalize first word, capitalize first word, capitalize first word, capitalize first word
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return mb_convert_encoding(ucwords(strtolower(str_replace(',', ', ', $this->DBR_NAME1))), 'UTF-8', 'ISO-8859-1');
    }

    /**
     * accessor to assigned amount, reformatted to proper decimal
     *
     * @return string
     */
    public function getAssignedAmountAttribute()
    {
        return number_format($this->DBR_ASSIGN_AMT, 2, '.', ',');
    }

    /**
     * accessor to last trust amount, reformatted to proper decimal
     *
     * @return string
     */
    public function getLastTrustAmountAttribute()
    {
        return number_format($this->DBR_LAST_TRUST_AMT, 2, '.', ',');
    }

    /**
     * accessor to received total, reformatted to proper decimal
     *
     * @return string
     */
    public function getReceivedTotalAttribute()
    {
        return number_format($this->DBR_RECVD_TOT, 2, '.', ',');
    }

    /**
     * accessor to client, make it lower case
     *
     * @return string
     */
    public function getClientAttribute()
    {
        return ucwords(strtolower($this->DBR_CL_MISC_1));
    }

    /**
     * accessor to last worked, reformatted date to carbon instance
     *
     * @return string
     */
    public function getLastWorkedAttribute()
    {
        if ($this->DBR_LAST_WORKED_O == '') {
            return 'never';
        }
        if (Carbon::parse($this->DBR_LAST_WORKED_O)->diffInDays(Carbon::now()) <= 5) {
            return Carbon::parse($this->DBR_LAST_WORKED_O)->diffForHumans();
        }

        return Carbon::parse($this->DBR_LAST_WORKED_O)->toFormattedDateString();
    }

    /**
     * accessor to last transaction, reformatted date to carbon instance
     *
     * @return string
     */
    public function getLastTransactionAttribute()
    {
        if ($this->DBR_LAST_TRUST_DATE_O == '') {
            return 'never';
        }
        if (Carbon::parse($this->DBR_LAST_TRUST_DATE_O)->diffInDays(Carbon::now()) <= 5) {
            return Carbon::parse($this->DBR_LAST_TRUST_DATE_O)->diffForHumans();
        }

        return Carbon::parse($this->DBR_LAST_TRUST_DATE_O)->toFormattedDateString();
    }

    /**
     * apply filters to relevant dbr
     *
     * @param $query
     * @param TableFilter $tableFilter
     * @return mixed
     */
    public function scopeTableFilters($query, TableFilter $tableFilter)
    {
       return $tableFilter->apply($query);
    }

    /**
     * get all dbr of the user
     *
     * @param $builder
     * @return mixed
     */
    public function scopeUserAccounts($builder)
    {
        return $builder->where('DBR_DESK', Auth::user()->desk);
    }

}
