import React, { useState } from "react";
import Ripple from "@/Components/ui/ripple";
import AccountSearchBar from "@/Components/CustomComponents/AccountSearchBar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { router } from "@inertiajs/react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { ModeToggle } from "@/Components/ui/theme-toggle";

const Search = () => {
    const [DBR_NO, setDBR_NO] = useState("");

    const GetAccountNumber = (DBR_NO: string) => {
        // Navigate directly to dashboard
        router.visit("/dashboard", {
            data: { dbr_no: DBR_NO },
            preserveState: true,
        });
    };

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
                    </div>
                    <ModeToggle />
                </header>
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
                    <div className="z-10 text-xl font-medium">
                        <AccountSearchBar DBR_NO={GetAccountNumber} />
                    </div>
                    <Ripple />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Search;
