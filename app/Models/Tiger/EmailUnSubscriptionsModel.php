<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EmailUnSubscriptionsModel extends Model
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
    protected $table = 'tiger.UFN.EmailReturns';

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
        $page = 0;

        if(isset($filter_data['page'])){
            $page = $filter_data['page'];
        }

        $offset = $page * $per_page;

        // echo "<pre>";
        // print_r($filter_data);
        // die();

        // DB::enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('tiger.UFN.EmailReturns as a');
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
             
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

        $records->select('a.*');
        $records->offset($offset);
        $records = $records->paginate($per_page);
        // dd(DB::getQueryLog());

        return $records;
    }

    public function unsubsucribe($data){
        // echo "<pre>";
        // print_r($data);
        // die();
        $unsubscribed = false;
        if(isset($data['R_Email'])){
            $check = DB::connection('sqlsrv2')->table('tiger.UFN.EmailReturns')->where(array('R_Email'=>$data['R_Email']))->get(); 
            if(count($check) < 1){
                $dbr_no = '';
                $record = DB::connection('sqlsrv2')->table('tiger.UFN.Emails')->where(array('Email_Address'=>$data['R_Email']))->get(); 
                
                if(count($record) > 0){
                    $email_data = $record->first();
                    $dbr_no = $email_data->E_DBR_NO;
                }
                else{
                    $record2 = DB::connection('sqlsrv2')->table('tiger.CDS.ADR')->where(array('ADR_NOTE2'=>$data['R_Email']))->get(); 
                    if(count($record2) > 0){
                        $email_data = $record2->first();
                        $dbr_no = $email_data->ADR_DBR_NO;
                    }
                    else{
                        $message = 'Record not found in tiger.CDS.ADR';
                    }
                }

                //if(isset($dbr_no)){
                    $insert_data = array('R_DBR_NO' => $dbr_no, 'R_Email' => $data['R_Email'], 'Status' => 'Unsubscribe', 'Date' => date("Y-m-d H:i:s"));
                    $unsubscribed = DB::connection('sqlsrv2')->table('tiger.UFN.EmailReturns')->insert($insert_data);
                    $message = 'Email has unsubscribed successfully';
                //}
            }
            else{
                $unsubscribed = true;
                $message = 'This email has already been unsubscribed!';
            }
        }

        $msg['status'] = $unsubscribed;
        $msg['message'] = $message;
        return $msg;;
    }
}
