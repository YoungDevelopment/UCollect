const BASE_URL = `http://127.0.0.1:8000`;

export const AccountDetailsAPI = (DBR_NO: any) => {
    return `${BASE_URL}/api/AccountDetails/${DBR_NO}`;
};

export const DBR_NOValidationAPI = (DBR_NO: any) => {
    return `${BASE_URL}/api/DBR_NO_Validator/${DBR_NO}`;
};

export const UDWMenuItemsAPI = (UDW_DBR_NO: any) => {
    return `${BASE_URL}/api/getUDWMenuItems/${UDW_DBR_NO}`;
};
export const UDWFieldItemsAPI = (UDW_DBR_NO: any, SEQ_NO: any) => {
    return `${BASE_URL}/api/getUDWFieldItems/${SEQ_NO}/${UDW_DBR_NO}`;
};
