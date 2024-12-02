<?php 
namespace App\Models\Tiger;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class DeliverableFrequency extends Model
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
    protected $table = 'Deliverable.vw_Frequency';

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
        "Frequency" 
    ]; 

    public function get_records($filter_data){

        $where = [];
        $per_page = 300;
         
        // echo "<pre>";
        // print_r($filter_data);
        // die();

        // DB::enableQueryLog();
        $records = DB::connection('sqlsrv2')->table('Tiger.Deliverable.vw_Frequency as a');
        if(sizeof($filter_data) > 0){ 
            $per_page = $filter_data['per_page'];
            if( $filter_data['reset'] != 'reset'){
                unset($filter_data['_token'],$filter_data['per_page'],$filter_data['page'],$filter_data['reset']); 
                $run = 0;
                foreach($filter_data as $key => $val){ 
                    
                    if($val != ""){  
                        if($key == 'Frequency'){ 
                            if($run == 1)
                                $records->orWhere(DB::raw('[a].[Frequency]'),'like','%'.$filter_data['Frequency'].'%'); 
                            else
                                $records->where(DB::raw('[a].[Frequency]'),'like','%'.$filter_data['Frequency'].'%'); 
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
        $records = $records->paginate($per_page);
        // dd(DB::getQueryLog());

        return $records;
    }

   

}