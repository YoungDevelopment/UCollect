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
    /**=====================================================================================
     * Fetch UDW Field Data
     * 
     * This function will fetch the UDW field data for a specific menu and account
     * 
     * ## Process
     * 1. Fetch Address Information
     * 2. Fetch borrower Contact Information (Phone, Email)
     * 3. Fetch co-borrower Contact Information (Phone, Email)
     * 4. Fetch other Contact Information like Employeer Number, Employeer Name
     * 5. Append Everything together
     * 
     * Test the API with:
     * http://127.0.0.1:8000/api/getContactInformation/{ADR_DBR_NO}/
     * 
     * ## UI Component
     * Dashboard/ContactCard
     * 
     * @param string $ADR_DBR_NO The account number
     * @return \Illuminate\Http\JsonResponse Field data with population status
     * =====================================================================================
     */

    public function getContactNotes($ADR_DBR_NO)
    {
        try{
        return response()->json($ADR_DBR_NO);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }


    /**=====================================================================================
     * Fetch UDW Field Data
     * 
     * This function will fetch the UDW field data for a specific menu and account
     * 
     * ## Process
     * 1. Fetch menu name from UdwMenuConfig using UDW_SEQ_NO
     * 2. Fetch field configuration for the UDW_SEQ_NO
     * 3. Fetch UDW data for given UDW_DBR_NO and UDW_SEQ_NO
     * 4. Prepare response with field data and population status
     * 
     * Test the API with:
     * http://127.0.0.1:8000/api/getUDWFieldData/{UDW_SEQ_NO}/{UDW_DBR_NO}
     * 
     * ## UI Component
     * Dashboard/AccountDetails
     * 
     * @param string $UDW_SEQ_NO The menu sequence number
     * @param string $UDW_DBR_NO The account number
     * @return \Illuminate\Http\JsonResponse Field data with population status
     * =====================================================================================
     */


    public function getUDWFieldData($UDW_SEQ_NO, $UDW_DBR_NO)
    {
        try {
            $menu = UdwMenuConfig::where('udw_seq_no', $UDW_SEQ_NO)->first();
            
            if (!$menu) {
                return response()->json(['error' => 'Menu not found for the given UDW_SEQ_NO'], 404);
            }
            
            $fieldsConfig = UdwFieldConfig::where('udw_seq_no', $UDW_SEQ_NO)->get(['field_name', 'udw_column_name']);
            
            $udwData = UDW::where('UDW_DBR_NO', $UDW_DBR_NO)
                          ->where('UDW_SEQ', $UDW_SEQ_NO)
                          ->first();
            
            if (!$udwData) {
                return response()->json([
                    'error' => 'Data not found for this account and menu combination'
                ], 404);
            }

            $fieldData = [];

            foreach ($fieldsConfig as $fieldConfig) {
                $fieldValue = $udwData->{$fieldConfig->udw_column_name};
                $isPopulated = !empty($fieldValue);
                
                $fieldData[] = [
                    'field_name'      => $fieldConfig->field_name,
                    'udw_column_name' => $fieldConfig->udw_column_name,
                    'value'           => $fieldValue,
                    'is_populated'    => $isPopulated
                ];
            }

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

    /**=====================================================================================
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
     * =====================================================================================
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




    /**=====================================================================================
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
     * =====================================================================================
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
    




    /**=====================================================================================
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
     * =====================================================================================
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


             $adrRecords = ADR::select('ADR_SEQ_NO', 'ADR_Name', 'ADR_DBR_NO', 'ADR_TAX_ID', 'ADR_DOB_O')->where('ADR_DBR_NO', $dbrNo)->get();
             
             $borrowerName = null;
             $coBorrowerName = null;
             $SSN = null;


               foreach ($adrRecords as $adr) {
                    if ($adr->ADR_SEQ_NO == 1) {
                         $borrowerName = $adr->ADR_Name;
                         $SSN = $adr->ADR_TAX_ID;
                         $DOB = $adr->ADR_DOB_O;
                    } elseif ($adr->ADR_SEQ_NO == 2) {
                         $coBorrowerName = $adr->ADR_Name;
                    } 
               }

                $record->Borrower_Name = $borrowerName;
                $record->CoBorrower_Name = $coBorrowerName;
                $record->SSN = $SSN;
                $record->DOB = $DOB;
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
