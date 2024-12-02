<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Http\JsonResponse;

// Stats Table Imports
use App\Models\Stats\UdwMenuConfig;
use App\Models\Stats\UDWFieldConfig;


// Tiger Table Imports
use App\Models\Tiger\DBR;
use App\Models\Tiger\ADR;
use App\Models\Tiger\UDW;



class AccountSearchController extends Controller
{
public function getUDWFieldData($UDW_SEQ_NO, $UDW_DBR_NO)
{
    try {
        // Step 1: Fetch the menu name from the UdwMenuConfig model using UDW_SEQ_NO
        $menu = UdwMenuConfig::where('udw_seq_no', $UDW_SEQ_NO)->first();
        
        if (!$menu) {
            return response()->json(['error' => 'Menu not found for the given UDW_SEQ_NO'], 404);
        }
        
        // Fetch the field configuration for the given UDW_SEQ_NO
        $fieldsConfig = UdwFieldConfig::where('udw_seq_no', $UDW_SEQ_NO)->get(['field_name', 'udw_column_name']);
        
        // Step 2: Fetch the UDW data for the given UDW_DBR_NO and UDW_SEQ_NO
        $udwData = UDW::where('UDW_DBR_NO', $UDW_DBR_NO)
                      ->where('UDW_SEQ', $UDW_SEQ_NO)  // Corrected column name to UDW_SEQ
                      ->first(); // Assuming first() to get the relevant data for the account and menu
        
        if (!$udwData) {
            return response()->json([
                'error' => 'Data not found for this account and menu combination'
            ], 404);
        }

        // Step 3: Prepare the response for each field in the field configuration
        $fieldData = [];

        foreach ($fieldsConfig as $fieldConfig) {
            // Dynamically access the field value using the `udw_column_name`
            $fieldValue = $udwData->{$fieldConfig->udw_column_name}; // Access the field dynamically

            // Determine if the field is populated
            $isPopulated = !empty($fieldValue); // Field is populated if there's a value
            
            // Prepare the field response
            $fieldData[] = [
                'field_name'      => $fieldConfig->field_name,
                'udw_column_name' => $fieldConfig->udw_column_name,
                'value'           => $fieldValue,
                'is_populated'    => $isPopulated
            ];
        }

        // Step 4: Return the menu name along with the field data
        return response()->json([
            'menu_name' => $menu->menu_name,
            'fields' => $fieldData
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Server Error',
            'details' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Fetch UDW Menu Items
     * 
     * This fundtion will fetch the UDW Menu Items label
     * 
     * ## Process
     * 1. Fetch all the SEQ No Avaiable for an Account from the UDW table
     * 2.Look for those itemm in UDW Menu Config Table
     * 3.If the menu it is found then return the menu name if not then show not Configured
     * 
     * Test the API with:
     * http://127.0.0.1:8000/api/getUDWMenuItems/0000000009
     * 
     * ## UI Component
     * Dashboard/AccountSearchBar
     * 
     * @param string $dbrNo The `UDW_DBR_NO` used to fetch UDW_SEQ_NO.
     * @return \Illuminate\Http\JsonResponse The combined `DBR` and `ADR` data in JSON format.
     */
    public function getUDWMenuItems($UDW_DBR_NO)
    {
        try{
        $availableSeqNo = UDW::where('UDW_DBR_NO', $UDW_DBR_NO)->pluck('UDW_SEQ');
        $menuItemsUDW = UdwMenuConfig::whereIn('UDW_SEQ_NO', $availableSeqNo)->get(['udw_seq_no','menu_name']);
        $response = [];

        foreach ($availableSeqNo as $seqNo) {
            
            $menu = $menuItemsUDW->firstWhere('udw_seq_no', $seqNo);
            
            if ($menu) {
               
                $response[] = [
                    'udw_seq' => $seqNo,
                    'menu_name'  => $menu->menu_name
                ];
            } else {
               
                $response[] = [
                    'udw_seq' => $seqNo,
                    'menu_name'  => 'Not Configured'
                ];
            }
        }


        return response()->json($menuItemsUDW);



        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }

    }




    /**
     * Fetch DBR_NO Count from DB
     * 
     * This function retrieves count of DBR_NO in the CDS.DBR Table to see 
     * if the given Account Number is available or not
     * 
     * ## Process
     * 1. Fetch count(DBR_NO) from the `DBR` table.
     * 
     * Test the API with:
     * http://127.0.0.1:8000/api/DBR_NO_Validator/0000000009
     * 
     * ## UI Component
     * Dashboard/AccountSearchBar
     * 
     * @param string $dbrNo The `DBR NO` used to fetch account details.
     * @return \Illuminate\Http\JsonResponse The combined `DBR` and `ADR` data in JSON format.
     */

     public function checkDBR_NO($dbrNo)
    {
        try{
        $count = DBR::where('DBR_NO', $dbrNo)->count();
        return response()->json($count);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }
    




    /**
     * Fetch Account Details
     * 
     * This function retrieves account information from the `CDS.DBR` and `CDS.ADR` tables
     * based on the provided `DBR NO`.
     * 
     * ## Process
     * 1. Fetch data from the `DBR` table.
     * 2. Retrieve related data from the `ADR` table using the `DBR NO`.
     * 3. Filter `ADR` data by `SEQ_NO` and append it to the `DBR` results.
     * 
     * Test the API with:
     * http://127.0.0.1:8000/api/dbr/0000000009
     * 
     * ## UI Component
     * Dashboard/AccountDetails
     * 
     * @param string $dbrNo The `DBR NO` used to fetch account details.
     * @return \Illuminate\Http\JsonResponse The combined `DBR` and `ADR` data in JSON format.
     */

     public function getAccountDetails($dbrNo)
    {
        try {
            $record = DBR::select([
                    'DBR_NO',
                    'DBR_Cli_REF_No',
                    'DBR_Client',
                    'DBR_Status',
                    'DBR_Desk',
                    'DBR_Assign_Date_O',
                    'DBR_Close_Date_O',

                ])
                ->where('DBR_NO', $dbrNo)
                ->first();


             $adrRecords = ADR::select('ADR_SEQ_NO', 'ADR_Name', 'ADR_DBR_NO', 'ADR_TAX_ID')->where('ADR_DBR_NO', $dbrNo)->get();
             
             $borrowerName = null;
             $coBorrowerName = null;
             $SSN = null;


               foreach ($adrRecords as $adr) {
                    if ($adr->ADR_SEQ_NO == 1) {
                         $borrowerName = $adr->ADR_Name;
                         $SSN = $adr->ADR_TAX_ID;
                    } elseif ($adr->ADR_SEQ_NO == 2) {
                         $coBorrowerName = $adr->ADR_Name;
                    } 
               }

                $record->Borrower_Name = $borrowerName;
                $record->CoBorrower_Name = $coBorrowerName;
                $record->SSN = $SSN;

               return response()->json($record);


            if (!$record) {
                return response()->json(['message' => 'Record not found'], 404);
            }

            return response()->json($record, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

}
