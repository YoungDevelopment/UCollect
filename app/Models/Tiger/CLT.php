<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Unifin\TableFilters\TableFilter;

class CLT extends Model
{
    public $timestamps = false;

    protected $connection = 'sqlsrv2';

    protected $table = 'CDS.CLT';

    protected $primaryKey = 'CLT_NO';

    protected $fillable = [
        'CLT_NO',
        'CLT_NAME_1',
        'CLT_NAME_2',
        'CLT_ADDR_1',
        'CLT_ADDR_2',
        'CLT_ADDR_3',
        'CLT_ZIP_CODE',
        'CLT_COUNTRY',
        'CLT_PHONE',
        'CLT_EXTN',
        'CLT_SMAN',
        'CLT_INT_RATE',
        'CLT_CATEGORY',
        'CLT_NBREG_RULE',
        'CLT_NBPCL_RULE',
        'CLT_COMM_RULE',
        'CLT_COMM_RATE',
        'CLT_GROSS_AC_BYTE',
        'CLT_DEDUCT_BYTE',
        'CLT_PAY_CYCLE',
        'CLT_REMIT_TO',
        'CLT_CONSOLIDATE_TO',
        'CLT_ACK_PRT_BYTE',
        'CLT_ACK_FMT_BYTE',
        'CLT_STM_PRT_BYTE',
        'CLT_STM_FMT_BYTE',
        'CLT_DAR_PRT_BYTE',
        'CLT_DAR_FMT_BYTE',
        'CLT_ACT_PRT_BYTE',
        'CLT_IAN_PRT_BYTE',
        'CLT_STS_PRT_BYTE',
        'CLT_STS_FMT_BYTE',
        'CLT_STS_OPEN',
        'CLT_STS_CLOSE',
        'CLT_ACK_OPEN',
        'CLT_ACK_CLOSE',
        'CLT_PACK_PRT_BYTE',
        'CLT_PACK_FMT_BYTE',
        'CLT_PACK_OPEN',
        'CLT_PACK_CLOSE',
        'CLT_CHG_DSK_MNA',
        'CLT_SRULE',
        'CLT_SLS_COMM_RULE',
        'CLT_TRW_REPORT',
        'CLT_TRW_MINIMUM',
        'CLT_TRW_DELAY',
        'CLT_TRW_LPAY_DELAY',
        'CLT_REV_DATE',
        'CLT_STS_CYCLE',
        'CLT_DAR_CYCLE',
        'CLT_NOTE_TO_COLL',
        'CLT_SALUTATION',
        'CLT_ACTRY_SIF_PIF',
        'CLT_PC_RATE',
        'CLT_PC_SER',
        'CLT_STM_AR_INV',
        'CLT_FAX',
        'CLT_LAST_ASS',
        'CLT_FROM_COMM',
        'CLT_THRU_COMM',
        'CLT_SLS_COMM_RATE',
        'CLT_ASS_CNT_LTR',
        'CLT_MEMO_1',
        'CLT_MEMO_2',
        'CLT_REMIT_TO_AGY',
        'CLT_ALT_CODE',
        'CLT_PL_NAME_1',
        'CLT_PL_NAME_2',
        'CLT_PL_ADDR_1',
        'CLT_PL_ADDR_2',
        'CLT_PL_ADDR_3',
        'CLT_PL_ZIP_CODE',
        'CLT_PL_PHONE',
        'CLT_PL_SALUTATION',
        'CLT_CHECK_FEE',
        'CLT_COLL_FEE_PER',
        'CLT_PAY_TO',
        'CLT_GOAL',
        'CLT_TAX_EX',
        'CLT_CNTF_TYPE',
        'CLT_CNTF_FACT',
        'CLT_CLASS',
        'CLT_STM_OPEN',
        'CLT_STM_CLOSE',
        'CLT_SMAN2',
        'CLT_FROM_COMM2',
        'CLT_THRU_COMM2',
        'CLT_SLS_COMM_RATE2',
        'CLT_SLS_COMM_RULE2',
        'CLT_INT_RC_UID',
        'CLT_PP_CHK_FEE',
        'CLT_PP_CC_FEE',
        'CLT_PP_EFT_FEE',
        'CLT_STL_PER',
        'CLT_STL_EXP',
        'CLT_TRW_FULL_BALANCE',
        'CLT_FIRST_ASSIGNMENT',
        'CLT_FIRST_ASSIGNMENT_DATE_O',
        'CLT_LAST_ASSIGNMENT_DATE_O',
        'CLT_EFT_BANK_CODE',
        'CLT_TIGER_LINK',
        'CLT_MASK_TAX_ID',
        'CLT_MASK_BANK_ACCOUNT_NO',
        'CLT_MASK_CLIENT_REF_NO',
        'CLT_CLI_REF_VIEWABLE_CHARS',
        'CLT_MARKET_CODE',
        'CLT_SERVICE_CODE',
        'CLT_MISC_FLAGS',
        'CLT_EMAIL_3',
        'CLT_BILL_CYCLES',
        'CLT_BILL_LTR_CD',
        'CLT_BILL_COMP_ACT',
        'CLT_INT_FRM_TBL',
        'CLT_ACTIVE',
        'CLT_INT_COMPOUND',
        'CLT_PACKED_FLAGS',
        'CLT_DBR_NO',
        'CLT_REMIT_TO_NAME',
        'CLT_REMIT_TO_ADDR_1',
        'CLT_REMIT_TO_ADDR_2',
        'CLT_REMIT_TO_CITY',
        'CLT_REMIT_TO_STATE',
        'CLT_REMIT_TO_ZIP',
        'CLT_TIE_GROUP',
        'CLT_TRW_LCHG_DELAY',
        'CLT_SET_AUTH',
        'CLT_PLACEMENT_DAYS',
        'CLT_LET_AUTH',
        'CLT_STATUS',
        'CLT_DEMAND_LETTER'
    ];

    public $incrementing = false;

    public function scopeTableFilters($query, TableFilter $paginate)
    {
        return $paginate->apply($query);
    }

    /**
     * CLT belongs to dbr.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dbr()
    {
        return $this->belongsTo(DBR::class,'CLT_NO','DBR_CLIENT');
    }

    public static function createClient($validatedData)
    {
        $validatedData['CLT_NBREG_RULE'] = 100;
        $validatedData['CLT_GROSS_AC_BYTE'] = 'P';
        $validatedData['CLT_DEDUCT_BYTE'] = 'Y';
        $validatedData['CLT_PAY_CYCLE'] = 'M';
        $validatedData['CLT_ACK_PRT_BYTE'] = '1';
        $validatedData['CLT_ACK_FMT_BYTE'] = 'C';
        $validatedData['CLT_STM_PRT_BYTE'] = '1';
        $validatedData['CLT_STM_FMT_BYTE'] = 'Z';
        $validatedData['CLT_DAR_PRT_BYTE'] = '1';
        $validatedData['CLT_DAR_FMT_BYTE'] = 'Y';
        $validatedData['CLT_ACT_PRT_BYTE'] = 'Y';
        $validatedData['CLT_IAN_PRT_BYTE'] = 'Y';
        $validatedData['CLT_STS_PRT_BYTE'] = '1';
        $validatedData['CLT_STS_FMT_BYTE'] = 'C';
        $validatedData['CLT_PACK_PRT_BYTE'] = '1';
        $validatedData['CLT_PACK_FMT_BYTE'] = 'C';
        $validatedData['CLT_CHG_DSK_MNA'] = 'Y';
        $validatedData['CLT_SLS_COMM_RULE'] = '1';
        $validatedData['CLT_TRW_REPORT'] = 'N';
        $validatedData['CLT_TRW_MINIMUM'] = '1';
        $validatedData['CLT_PC_SER'] = 'N';
        $validatedData['CLT_STM_AR_INV'] = 'N';
        $validatedData['CLT_PAY_TO'] = 'UNIFIN INC';
        $validatedData['CLT_TRW_FULL_BALANCE'] = 'Y';
        $validatedData['CLT_MASK_TAX_ID'] = 'Y';
        $validatedData['CLT_MASK_BANK_ACCOUNT_NO'] = 'Y';
        $validatedData['CLT_MASK_CLIENT_REF_NO'] = 'N';
        $validatedData['CLT_MISC_FLAGS'] = '         YYNYNYE 1M';
        $validatedData['CLT_TIE_GROUP'] = 'DEF000';
        $validatedData['CLT_CNTF_FACT'] = 0.00000;


        self::create($validatedData);
    }

}