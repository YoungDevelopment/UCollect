<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LetterEmailAllClients extends Model
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
    protected $table = 'tiger.CDS.CLT';

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


    public function get_records($filter_data){

        $where = [];
        $per_page = 100;
        
        $laod_data_type = $filter_data['LoaddataType'];
         
        // echo "<pre>";
        // print_r($filter_data);
        // echo "</pre>";
        // die();
        
        unset($filter_data['LoaddataType'] );

        //DB::connection('sqlsrv2')->enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('tiger.CDS.CLT as a');
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        if($key == 'CLT_NO'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[CLT_NO]'),'like','%'.$filter_data['CLT_NO'].'%'); 
                            else
                                $records->where(DB::raw('[a].[CLT_NO]'),'like','%'.$filter_data['CLT_NO'].'%'); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                }
            }
        }

        if($laod_data_type == 1){
            $records->where('a.CLT_SIF_Letter1','!=','000');
            $records->where('a.CLT_SIF_Letter1','!=','.000');
        }  

        $records->select('CLT_NO','CLT_NAME_1','CLT_SIF_Letter1','CLT_SIF_Letter2','CLT_SIF_Active');
        $records = $records->paginate($per_page);
        //dd(DB::connection('sqlsrv2')->getQueryLog());

        return $records;
    }
}
