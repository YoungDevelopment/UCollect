import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { AccountDetailsCard } from "@/Components/CustomComponents/AccountDetailsCard";
import { FinanceCard } from "@/Components/CustomComponents/FinanceCard";
import { CollectionNotes } from "@/Components/CustomComponents/CollectionNotes";
import { ContactCard } from "@/Components/CustomComponents/ContactCard";
import { MiscInfoCard } from "@/Components/CustomComponents/MiscInfoCard";
import { AccountControlCard } from "@/Components/CustomComponents/AccountControlCard";
import { NotesSection } from "@/Components/CustomComponents/NotesSection";
import { useEffect, useState } from "react";
import { WorkCardNavBar } from "@/Components/CustomComponents/WorkCardNavBar";
import { Toaster } from "sonner";
import axios from "axios";
import AccountSearchBar from "@/Components/CustomComponents/AccountSearchBar";

import { AccountDetailsAPI, UDWMenuItemsAPI } from "@/lib/apiRoutes";
import { usePage } from "@inertiajs/react";

/*
    We will use the DBR_NO for the Search

    First the Search bar Component will Return the DBR_NO
    we will pass the DBR_NO to functions that will fetch data and pass it to components
    these Fetching function will also handle the loading states for the components
    be default the loader state will be true

    Before we do any API Calls we need to reset all the UI Elements that have to information binded with an account
    

*/

export default function Dashboard() {
    // =================================================================
    const { initialDbrNo } = usePage().props;

    // =================================================================

    // =================================================================
    // States
    // =================================================================
    const [isTabletMode, setIsTabletMode] = useState(false);
    const [DBR_NO, setDBR_NO] = useState(initialDbrNo || "0000000006");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------API Fetch States--------

    const [AccountDetailsData, setAccountDetailsData] = useState();
    const [AccountDetailsLoader, setAccountDetailsLoader] = useState(true);

    const [MenuItemsUDW, setMenuItemsUDW] = useState([]);
    const [MenuItemsUDWLoader, setMenuItemsUDWLoader] = useState(true);

    // =================================================================
    // Functions
    // =================================================================

    // --------UI Control Functions---------
    const GetAccountNumber = (DBR_NO: any) => {
        setDBR_NO(DBR_NO);
    };

    const ResetAccountDataInUI = async () => {
        setMenuItemsUDW([]);
    };

    const openUDWPopup = () => {
        setIsModalOpen(true);
    };

    // --------API Control Functions--------

    const AccountDetailsFunction = async (DBR_NO: any) => {
        try {
            setAccountDetailsLoader(true);
            const response = await axios.get(AccountDetailsAPI(DBR_NO));
            setAccountDetailsData(response.data);
            setAccountDetailsLoader(false);
        } catch (error) {
            console.error(error);
        }
    };

    const UDWMenuItemsFunction = async (DBR_NO: any) => {
        try {
            setMenuItemsUDWLoader(true);
            const response = await axios.get(UDWMenuItemsAPI(DBR_NO));
            setMenuItemsUDW(response.data);
            setMenuItemsUDWLoader(false);
            console.log("menuItems", response.data);
        } catch (error) {
            console.error(error);
        }
    };
    // =================================================================
    // Hooks
    // =================================================================

    useEffect(() => {
        // --------API Calls--------
        ResetAccountDataInUI();
        AccountDetailsFunction(DBR_NO);
        UDWMenuItemsFunction(DBR_NO);

        const handleResize = () => {
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;

            if (viewportHeight >= pageHeight * 0.8) {
                setIsTabletMode(true);
            } else {
                setIsTabletMode(false);
            }
        };

        window.addEventListener("scroll", handleResize);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleResize);
            window.removeEventListener("resize", handleResize);
        };
    }, [DBR_NO]);

    // =================================================================
    // User Interface
    // =================================================================
    return (
        <SidebarProvider
            defaultOpen={false}
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex p-3 shrink-0 items-center justify-between gap-2 px-4 space-x-4">
                    <div className="flex items-center space-x-2">
                        <SidebarTrigger className="-ml-1" />
                        <WorkCardNavBar
                            MenuItemsUDWLoader={MenuItemsUDWLoader}
                            MenuItemsUDW={MenuItemsUDW}
                            UDW_DBR_NO={DBR_NO}
                        />
                    </div>
                    <AccountSearchBar DBR_NO={GetAccountNumber} />
                </header>

                {/* Responsive Grid Layout */}
                <div
                    className={`bg-background grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pt-0 m-0 ${
                        isTabletMode ? "md:grid-cols-2" : "lg:grid-cols-3"
                    }`}
                >
                    <div className="space-y-6">
                        <AccountDetailsCard
                            accountDetails={AccountDetailsData}
                            isLoading={AccountDetailsLoader}
                        />
                        <FinanceCard />
                    </div>

                    {/* Column B: ContactCard */}
                    <div className="space-y-6">
                        <MiscInfoCard />
                        <ContactCard />
                    </div>

                    {/* Column C: Empty, goes below in tablet and mobile >*/}
                    <div className="space-y-6">
                        <AccountControlCard />
                        <NotesSection />
                    </div>
                </div>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
}
