<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LetterFields extends Model
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
    protected $table = 'tiger.UFN.LetterMarkFields';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = ['Field_ID'];

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    protected $fillable = [
        "Field_Name",
        "Field_Description",
        "Active"

    ]; 

    public function get_records($filter_data=array()){

        $where = [];
        $per_page = 300; 
        // echo "<pre>";
        // print_r($filter_data);
        // die(); 
        // DB::connection('sqlsrv2')->enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('tiger.UFN.LetterMarkFields as a');
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        if($key == 'Field_Name'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Field_Name]'),'like','%'.$filter_data['Field_Name'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Field_Name]'),'like','%'.$filter_data['Field_Name'].'%'); 
                        } 
                        else{
                            $records->where(array('a.'.$key => $val));
                            $run = 1;
                        } 
                    }
                }
            }
        }

        $records->select('a.*');
        $records = $records->orderBy('a.Sort_Order','asc');
        $records = $records->paginate($per_page);
        // $records = $records->toSql();;
        // echo $records;
        // dd(\DB::getQueryLog());

        return $records;
    }
}
