<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
class DeliverableSchedules extends Model
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
    protected $table = 'Deliverable.Reports_Schedule';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['ID'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        // "Client_ID" 
    ];
   
    public function get_records($filter_data){


        //$tables = $users = DB::table('Tiger.Deliverable.vw_Teams')->get(); 

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // echo "</pre>";
        // die();

        // DB::enableQueryLog(); 

        // $data = self::from( 'Tiger.deliverable.Reports_Schedule as a' )
        // ->leftJoin('Tiger.Deliverable.Reports as r', function($join) {
        //     $join->on('a.Deliverable_ID', '=', 'r.Deliverable_ID');
        // })
        // ->leftJoin('Lynx.dbo.admins as ad', function($join) {
        //     $join->on('a.Assignee_ID', '=', 'ad.id');
        // })
        // ->leftJoin('Tiger.Deliverable.vw_Teams as t', function($join) {
        //     $join->on('a.Team_ID', '=', 't.ID');
        // })
        // ->leftJoin('Tiger.Deliverable.Clients as c', function($join) {
        //     $join->on('r.Client_ID', '=', 'c.Client_ID');
        // }) 
        // ->select('a.Deliverable_ID','a.ID','r.Report_Name','a.Due_date','t.Description as Team_Name','r.Outgoing','r.Priority','a.Comment', 'ad.last_name','ad.first_name','c.Client_Name')
        // ->where(DB::raw('CONVERT(VARCHAR(25),[a].[Due_date], 126)'),'like','%$filter_data[Due_Date]%')
        // ->toSql();



		

        $records = DB::connection('sqlsrv2')->table('deliverable.Reports_Schedule as a') 
        ->leftjoin('Deliverable.Reports as r', 'a.Deliverable_ID', '=', 'r.Deliverable_ID')
        ->leftjoin('uPortal.Lynx.dbo.admins as ad', 'a.Assignee_ID', '=', 'ad.id')
        ->leftjoin('Deliverable.vw_Teams as t', 'a.Team_ID', '=', 't.ID') 
        ->leftjoin('Deliverable.Clients as c', 'r.Client_ID', '=', 'c.Client_ID');   
        
        
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            //if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){  
                    if($val != ""){ 
                        if($key == 'Client_ID'){ 
                            if($run == 1)
                                $records->orWhere(array('r.'.$key => $val));
                            else
                                $records->where(array('r.'.$key => $val));
                        }
                        elseif($key == 'Due_date'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('CONVERT(VARCHAR(25),Due_date, 126)'),'like','%'.$filter_data['Due_date'].'%'); 
                            else
                                $records->where(DB::raw('CONVERT(VARCHAR(25),Due_date, 126)'),'like','%'.$filter_data['Due_date'].'%'); 
                        }
                        elseif($key == 'Overdue'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('CONVERT(VARCHAR(25),Due_date, 126)'),'<', $filter_data['Overdue']); 
                            else
                                $records->where(DB::raw('CONVERT(VARCHAR(25),Due_date, 126)'),'<', $filter_data['Overdue']); 
                        }
                        elseif($key == 'Report_Name'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[r].[Report_Name]'),'like','%'.$filter_data['Report_Name'].'%'); 
                            else
                                $records->where(DB::raw('[r].[Report_Name]'),'like','%'.$filter_data['Report_Name'].'%'); 
                        }
                        elseif($key == 'Priority'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[r].[Priority]'),$filter_data['Priority']); 
                            else
                                $records->where(DB::raw('[r].[Priority]'),$filter_data['Priority']); 
                        }
                        elseif($key == 'Outgoing'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[r].[Outgoing]'),$filter_data['Outgoing']); 
                            else
                                $records->where(DB::raw('[r].[Outgoing]'),$filter_data['Outgoing']); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                } 
            //}
        } 
		

        $records->where(array('a.Is_Deleted' => 0));
        $records->select('a.Deliverable_ID','a.Status_updated_at','a.Status','a.Effort_Hrs','a.ID','r.Report_Name','a.Due_date','a.Comment','t.Teams as Team_Name','r.Outgoing','r.Priority','a.Comment', 'ad.last_name','ad.first_name','c.Client_Name'); 
        $records->orderBy('a.Due_date','asc');
        $records->orderBy('r.Priority','asc');
        $data = $records->paginate($per_page);
        // dd(\DB::getQueryLog());

		
        //*******comment paginate line and just open the comment below 4 lines to print sql
        
        // echo "<pre>";
        // print_r($records->toSql());
        // echo "</pre>";
        // die();

        //**********//

        //dd($data);    
        return $data;
    }


    
}