<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EmailSubscriptionsModel extends Model
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
    protected $table = 'tiger.UFN.Emails';

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

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // die();

        // DB::enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('tiger.UFN.Emails as a');
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        // if($key == 'Group_Name'){ 
                        //     if($run == 1)
                        //         $records->orWhere(DB::raw('[a].[Group_Name]'),'like','%'.$filter_data['Group_Name'].'%'); 
                        //     else
                        //         $records->where(DB::raw('[a].[Group_Name]'),'like','%'.$filter_data['Group_Name'].'%'); 
                        // } 
                        // else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        // } 
                    }
                }
            }
        }

        $records->select('a.*');
        $records = $records->paginate($per_page);
        // dd(DB::getQueryLog());

        return $records;
    }

    public function subscribeUser($data){
        // echo "<pre>";
        // print_r($data);
        // die();
        $subscribed = false;
        if(isset($data['E_DBR_NO'])){
            $check = DB::connection('sqlsrv2')->table('tiger.UFN.Emails')->where(array('E_DBR_NO'=>$data['E_DBR_NO'],'Email_Address'=>$data['Email_Address']))->get(); 
            if(count($check) < 1){  
                $insert_data = array('Email_Priority' => 0,'E_DBR_NO' => $data['E_DBR_NO'], 'Email_Address' => $data['Email_Address'], 'Source' => 'Custom', 'Date_Created' => date("Y-m-d H:i:s"));
                $subscribed = DB::connection('sqlsrv2')->table('tiger.UFN.Emails')->insert($insert_data); 
            }
            else{
                $subscribed = true;
            }
        } 
        return $subscribed;
    }
}
