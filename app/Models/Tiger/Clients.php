<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use DB;
class Clients extends Model
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
    protected $table = 'Deliverable.Clients';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['Client_ID'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        "Client_ID",
    ];
   
    public function get_records($filter_data){

        $where = [];
        $per_page = 300;
        
        // echo "<pre>";
        // print_r($where);

        //DB::enableQueryLog(); 
        $records = DB::connection('sqlsrv2')->table('Tiger.deliverable.Clients as a') ->select('a.*' );
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page']); 
            $run = 0;
            foreach($filter_data as $key => $val){ 
                
                if($val != ""){ 
                    if($key == 'Client_Name'){ 
                        if($run == 1)
                            $records->orWhere('a.'.$key, 'LIKE', '%'.$val.'%');
                        else
                            $records->where('a.'.$key, 'LIKE', '%'.$val.'%');
                    }
                    else{
                        $records->where(array('a.'.$key => $val));
                        $run = 1;
                    } 
                }
            }
        }
        
        $records = $records->paginate($per_page);
        //dd(DB::getQueryLog());

        return $records;
    }


    
}