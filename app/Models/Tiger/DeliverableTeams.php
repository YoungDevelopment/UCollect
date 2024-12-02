<?php

namespace App\Models\Tiger;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DeliverableTeams extends Model
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
    protected $table = 'Deliverable.vw_Teams';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['Id'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        "Team" 
    ];


    public function get_records($filter_data){

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // die();

        // DB::connection('sqlsrv2')->enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('Tiger.Deliverable.GeneralCodes as a')->where(array("a.Type" => 3));
        // if(count($records) > 0){
        //     foreach($records as $key => $value){
        //         echo "<pre>";
        //         print_r($value);
        //         echo "</re>";
        //     }
        // }

        // die();
        // ->Join('Tiger.deliverable.vw_TeamUsers as b', function($join) {
        //     $join->on('a.id', '=', 'b.GeneralCodes_ID');
        // });
        
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        if($key == 'Team'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Description]'),'like','%'.$filter_data['Team'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Description]'),'like','%'.$filter_data['Team'].'%'); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                }
            }
        }
 
        $records->select('a.ID','a.Active','a.created_at','a.Description as Teams');
        // $records->select(DB::raw('GROUP_CONCAT([b].[UserName]) as users'));
        // $records->groupBy('a.ID');
        // $records->toSql();
        $records = $records->paginate($per_page);
        // dd(DB::connection('sqlsrv2')->getQueryLog());

        return $records;
    }






   

}