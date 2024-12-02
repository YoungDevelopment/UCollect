<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LetterGroupsCriteria extends Model
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
    protected $table = 'tiger.UFN.LetterMarkCriteria';

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

        // DB::connection('sqlsrv2')->enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('tiger.UFN.LetterMarkCriteria as a')
        ->leftjoin('Tiger.UFN.LetterMarkGroups as r', 'a.Group_ID', '=', 'r.Group_ID')
        ->leftjoin('Tiger.UFN.LetterMarkFields as f', 'a.Field_ID', '=', 'f.Field_ID'); 
        
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){    
                       $records->where(array('a.'.$key => $val)); 
                    }
                }
            }
        }
        
        $records->select('a.Group_ID','a.Field_ID','a.Operator', 'a.Criteria', 'a.Is_OR', 'a.Active','a.ID','f.Sort_Order','r.Group_Name','f.Field_Description'); 
        
        $records = $records->orderBy('f.Sort_Order','asc');
        $records = $records->paginate($per_page);
        // dd(DB::connection('sqlsrv2')->getQueryLog());
        // echo 'hello';
        // die();
        return $records;
    }
}
