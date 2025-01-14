"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AccountsTable } from "./ClientReferenceNumberTable";

interface Account {
    DBR_No: string;
    DBR_Cli_Ref_No: string;
    DBR_Client: string;
    DBR_Status: string;
    DBR_Desk: string;
    DBR_Close_Date_O: string | null;
}

const availableAccounts: Account[] = [
    {
        DBR_No: "1001",
        DBR_Cli_Ref_No: "CL-REF-001",
        DBR_Client: "Client A",
        DBR_Status: "Open",
        DBR_Desk: "Desk 1",
        DBR_Close_Date_O: null,
    },
    {
        DBR_No: "1002",
        DBR_Cli_Ref_No: "CL-REF-002",
        DBR_Client: "Client B",
        DBR_Status: "Closed",
        DBR_Desk: "Desk 2",
        DBR_Close_Date_O: "2025-01-01",
    },
    {
        DBR_No: "1003",
        DBR_Cli_Ref_No: "CL-REF-003",
        DBR_Client: "Client C",
        DBR_Status: "Pending",
        DBR_Desk: "Desk 3",
        DBR_Close_Date_O: null,
    },
    {
        DBR_No: "1004",
        DBR_Cli_Ref_No: "CL-REF-004",
        DBR_Client: "Client D",
        DBR_Status: "Open",
        DBR_Desk: "Desk 1",
        DBR_Close_Date_O: null,
    },
];

type AccountSelectablePopupProps = {
    openState: boolean;
    onAccountSelect: (account: Account) => void;
};

export function SelectableAccountsPopup({
    onAccountSelect,
}: AccountSelectablePopupProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(
        null
    );

    const handleAccountClick = (account: Account) => {
        setSelectedAccount(account);
        setIsOpen(false);
        console.log("Selected account:", account);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Select an Account</DialogTitle>
                </DialogHeader>
                <AccountsTable
                    accounts={availableAccounts}
                    onAccountClick={handleAccountClick}
                />
            </DialogContent>
        </Dialog>
    );
}
