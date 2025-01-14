import React, { useEffect, useState } from "react";
import Ripple from "@/Components/ui/ripple";
import AccountSearchBar from "@/Components/WorkCard/AccountSearchBar";
import { router } from "@inertiajs/react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { ModeToggle } from "@/Components/ui/theme-toggle";
import { Clock } from "@/Components/ui/clock";
import Particles from "@/Components/ui/particles";
import { useTheme } from "next-themes";
import BlurIn from "@/Components/ui/blur-in-text";
import { SelectableAccountsPopup } from "@/Components/WorkCard/SelectableList/AccountSelectablePopup";

const Search = () => {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

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
                <div>
                    <header className="flex p-3 shrink-0 items-center justify-between gap-2 px-4 bg-background space-x-4">
                        <div className="flex items-center space-x-2">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                        <ModeToggle />
                    </header>
                    <div className="flex w-full justify-end items-end pr-5 text-2xl bg-background">
                        <Clock />
                    </div>
                </div>

                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-xl font-medium  flex flex-col items-center space-y-4">
                        <BlurIn
                            word="What can I help with?"
                            className="font-heading text-pretty text-center text-[29px] font-semibold tracking-tighter sm:text-[32px] md:text-[46px] mb-5"
                        />
                        <AccountSearchBar DBR_NO={GetAccountNumber} />
                    </div>

                    <Ripple />
                    <Particles
                        className="absolute inset-0"
                        quantity={100}
                        ease={90}
                        color={color}
                        refresh
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Search;
