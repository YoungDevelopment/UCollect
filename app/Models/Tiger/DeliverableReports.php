<?php
namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class DeliverableReports extends Model
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
    protected $table = 'Deliverable.reports';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['Deliverable_ID'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        "Client_ID" 
    ];
   
    public function get_records($filter_data){

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // die();

        //DB::enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('Tiger.deliverable.Reports as a') 
        ->leftjoin('uPortal.Lynx.dbo.admins as ad', 'a.Assignee_ID', '=', 'ad.id')
        ->leftjoin('Tiger.Deliverable.Clients as c', 'a.Client_ID', '=', 'c.Client_ID')
        ->leftjoin('Tiger.Deliverable.vw_Frequency as f', 'a.Frequency_ID', '=', 'f.ID')
        ->leftjoin('Tiger.Deliverable.GeneralCodes as t', 'a.Team_ID', '=', 't.ID')
        ->leftjoin('Tiger.Deliverable.GeneralCodes as m', 'a.Method_ID', '=', 'm.ID');
        
        

        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){ 
                        
                        if($key == 'Due_Time'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Due_Time]'),'like','%'.$filter_data['Due_Time'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Due_Time]'),'like','%'.$filter_data['Due_Time'].'%'); 
                        }
                        elseif($key == 'Report_Name'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Report_Name]'),'like','%'.$filter_data['Report_Name'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Report_Name]'),'like','%'.$filter_data['Report_Name'].'%'); 
                        } 
                        elseif($key == 'Comment'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Comment]'),'like','%'.$filter_data['Comment'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Comment]'),'like','%'.$filter_data['Comment'].'%'); 
                        }
                        elseif($key == 'Sender_Contact'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Sender_Contact]'),'like','%'.$filter_data['Sender_Contact'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Sender_Contact]'),'like','%'.$filter_data['Sender_Contact'].'%'); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                }
            }
        }

        $records->select('a.Team_ID','a.Method_ID','a.Deliverable_ID','a.Is_Automated','a.Active','a.Effort_Hrs','a.Report_Name','a.Freq_Day','a.Freq_Date','a.Due_Time','a.Outgoing','a.Priority','a.Sender_Contact','a.Comment', 'ad.last_name','ad.first_name','c.Client_Name','f.Frequency as Frequency_Description','t.Description as Team_Description','m.Description as Method_Description');
        $records->orderBy('a.Deliverable_ID');
        $records = $records->paginate($per_page);
        //dd(DB::getQueryLog());

        return $records;
    }


    
}