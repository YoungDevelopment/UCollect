<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SCS_MN_File_Model extends Model
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
    protected $table = '';//'tiger.UFN.LetterMarkCriteria';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    // protected $primaryKey = ['Group_ID'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [ 
    ]; 

    public function get_records($filter_data){
        $from_date = $to_date = '';
        if(isset($filter_data['from_date'])){
            $from_date = $filter_data['from_date'];
        }
        if(isset($filter_data['to_date'])){
            $to_date = $filter_data['from_date'];
        }

        $query = "select distinct 'VMNT' as [Record_Type],
                        'UNI' as [Vendor_ID],
                        DBR_CL_MISC_3 as [SCS_Client],
                        DBR_CLI_REF_NO as [SCS_Account_Number],
                        replace(adr.ADR_NAME,'#','') as [Originator_Account_Number],
                        'NEW' as [Event_Code],
                        CONVERT(VARCHAR,DAT_TRX_DATE_O,101) AS [Event_Date],
                        adr01.ADR_TAX_ID as [Person_SSN],
                        adr01.ADR_ADDR1 as [Address],
                        replace(adr01.ADR_ADDR2,'.','') as [Unit],
                        adr01.ADR_CITY as [City],
                        adr01.ADR_STATE as [State],
                        left(adr01.ADR_ZIP_CODE,5) as [Zip_Code],
                        '' as [Phone],
                        '' as [POE],
                        '' as [POE_Address],
                        '' as [POE_Unit],
                        '' as [POE_City],
                        '' as [POE_State],
                        '' as [POE_Zip],
                        '' as [POE_Phone]
                        from cds.DBR dbr
                        inner join cds.adr adr on dbr.dbr_no = adr.ADR_DBR_NO
                        inner join cds.adr adr01 on adr01.ADR_DBR_NO = dbr.DBR_NO
                        inner join cds.DAT dat on dat.DAT_DBR_NO = dbr.DBR_NO
                        inner join cds.dnt dnt on dnt.DNT_DBR_NO = dat.DAT_DBR_NO AND DNT.DNT_SEQ_NO = DAT.DAT_SEQ_NO
                where DBR_CLIENT like 'scs%'
                and adr.ADR_SEQ_NO = 'R2'
                and adr01.ADR_SEQ_NO = '01'
                AND (DNT.DNT_NOTE LIKE 'Addr1 Chg%' 
                    OR DNT.DNT_NOTE LIKE 'Addr2 Chg%'
                    OR DNT.DNT_NOTE LIKE 'City Chg%'
                    OR DNT.DNT_NOTE LIKE 'ZipCd Chg%')
                and DBR.DBR_STATUS NOT IN ('SIF','PIF','XCR')	
                and DAT_TRX_DATE_O between '$from_date'and '$to_date'";
        $result = DB::connection('sqlsrv2')->select($query);
        return $result;
    }
}
