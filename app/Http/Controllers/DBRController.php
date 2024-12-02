<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Tiger\DBR;

class DBRController extends Controller
{
    //
      public function getTopRecords(): JsonResponse
    {
        
        $topRecords = DBR::orderBy('DBR_ASSIGN_DATE_O', 'desc')->take(5)->get();
        $myAccount = DBR::select('DBR_NO','DBR_Cli_REF_NO') -> where([['DBR_NO','0000000006']])->get();
        
        $myList = [$topRecords,$myAccount];
        return response()->json($myList, 200);
    }
}
