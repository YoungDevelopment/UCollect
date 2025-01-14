import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import axios from "axios";
import { DBR_NOValidationAPI } from "@/lib/apiRoutes";
import { NoAccountFound } from "./NoAccountFoundDialog";
import { SelectableAccountsPopup } from "./SelectableList/AccountSelectablePopup";
import { router } from "@inertiajs/react";
import { set } from "date-fns";

/**
 * Dynamic Account Search Component
 *
 * This component allows users to search for accounts based on either the `DBR_NO`
 * or the `DBR_Cli_REF_No`. It dynamically handles the input and performs validations
 * based on the button state.
 *
 * ## Process Overview
 * 1. Check if the user has entered `DBR_NO` or `Cli Ref No` by checking the button state.
 * 2. Restrict the search bar to accept numeric input only.
 *
 * ## DBR_NO Search:
 * - Validate that the input is exactly 10 digits.
 * - If the input is not 10 digits, prepend `0`s to make it 10 digits.
 * - Search for the `DBR_NO`:
 *   - If no records are found, show a toast notification.
 *   - If the record is found, return the `DBR_NO` to the parent component.
 *
 * ## DBR_Cli_REF_No Search:
 * - Fetch the following fields: `DBR_NO`, `DBR_Client`, `DBR_Cli_REF_No`, `DBR_Assign_Date`, `DBR_Close_Date`, and `DBR_Status`.
 * - If no records are found, show a toast notification for "no available records".
 * - If exactly one record is found, return the `DBR_NO` to the parent component.
 * - If multiple records are found, display a table with clickable rows for the user to select an account. Return the selected `DBR_NO` to the parent component.
 *
 * ## Notes:
 * - Ensure that the input field accepts only numeric values.
 * - Use a toast notification for feedback on no records found.
 */



const AccountSearchBar = ({ DBR_NO }: AccountSearchBarProps) => {
    // =================================================================
    // States
    // =================================================================
    const [buttonText, setButtonText] = useState("Unifin ID");
    const placeholders = ["Search Here"];
    const [loader, setloader] = useState(false);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);

    // =================================================================
    // Functions
    // =================================================================

    const handlePopupSelection = (selectedAccountNumber: string) => {
        DBR_NO(selectedAccountNumber);
    };

    // --------API Control Functions--------
    const DBR_NO_Validator = async (DBR_NO: any) => {
        try {
            const response = await axios.get(DBR_NOValidationAPI(DBR_NO));
            const count = response.data;
            console.log("DBR_NO_Validator count:", count);

            return count;
        } catch (error) {
            console.error(error);
        }
    };

    //--------UI Control Functions---------

    const DynamicSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        const form = e.currentTarget;
        const inputElement = form.elements.namedItem(
            "searchBar"
        ) as HTMLInputElement;
        const inputValue = inputElement.value.trim();

        const handleDBRValidation = async (value: string) => {
            const paddedValue = value.padStart(10, "0");
            console.log("DynamicSearch: ", paddedValue);

            const DBR_NO_Count = await DBR_NO_Validator(paddedValue);
            console.log("DynamicSearch: DBR_NO_Count: ", DBR_NO_Count);

            if (DBR_NO_Count === 0) {
                alert("This will handle the decline");
                <NoAccountFound />;
            } else {
                console.log(paddedValue);
                DBR_NO(paddedValue);
            }
        };

        if (buttonText === "Unifin ID") {
            const validValue =
                inputValue.length < 10
                    ? inputValue.padStart(10, "0")
                    : inputValue;
            await handleDBRValidation(validValue);
        } else {
            alert("This will handle the Client Ref ID");
            setIsPopupOpen(true);
        }

        setloader(false);
    };
    // --------UI Control Functions---------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        {
        }
    };
    const handleButtonClick = () => {
        setButtonText((prev) =>
            prev === "Unifin ID" ? "Client Ref ID" : "Unifin ID"
        );
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="rounded-xl bg-primary text-white "
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </Button>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={DynamicSearch}
                />
            </div>
            {IsPopupOpen && (
                <SelectableAccountsPopup
                    onAccountSelect={handlePopupSelection}
                />
            )}
        </div>
    );
};

export default AccountSearchBar;
