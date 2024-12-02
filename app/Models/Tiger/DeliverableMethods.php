<?php

namespace App\Models\Tiger;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class DeliverableMethods extends Model
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
    protected $table = 'Deliverable.GeneralCodes';

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
        "Method" 
    ]; 

    public function get_records($filter_data){

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // die();

        // DB::enableQueryLog();
        // $records = DB::connection('sqlsrv2')->table('Tiger.Deliverable.vw_Method as a');
        $records = DB::connection('sqlsrv2')->table('Tiger.Deliverable.GeneralCodes as a')->where(array("a.Type" => 4));
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        if($key == 'Method'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Description]'),'like','%'.$filter_data['Method'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Description]'),'like','%'.$filter_data['Method'].'%'); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                }
            }
        }

        $records->select('a.*','a.Description as Method');
        $records = $records->paginate($per_page);
        // dd(DB::getQueryLog());

        return $records;
    }


}