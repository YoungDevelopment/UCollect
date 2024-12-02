import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { UDWFieldItemsAPI } from "@/lib/apiRoutes";
import axios from "axios";
import { UDWFieldManagementModal } from "./UDWFieldsMenu";

type MenuItem = {
    udw_seq_no?: string;
    menu_name?: string;
};

type DynamicMenuProps = {
    menuItems?: MenuItem[] | null;
    isLoading?: boolean;
    NavBarItemName?: string;
    MenuTitle?: string;
    UDW_DBR_NO?: string;
};

export const UDWMenu = ({
    menuItems,
    isLoading,
    NavBarItemName,
    MenuTitle,
    UDW_DBR_NO,
}: DynamicMenuProps) => {
    // =================================================================
    // States
    // =================================================================
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------API Fetch States--------
    const [fieldItemsUDWLoader, setfieldItemsUDWLoader] = useState(true);

    // Initialize with a default shape that matches the expected type
    const [fieldItemsUDW, setfieldItemsUDW] = useState<{
        menu_name: string;
        fields: any[];
    }>({
        menu_name: "",
        fields: [],
    });

    // =================================================================
    // Hooks
    // =================================================================

    // =================================================================
    // Functions
    // =================================================================

    // --------UI Control Functions---------

    // Filter the menu items based on the search term
    const filteredItems = menuItems?.filter(
        (item: any) =>
            item?.menu_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.udw_seq_no.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // When an item is clicked, open the modal to show the UDW fields
    const handleItemClick = useCallback((item: MenuItem) => {
        console.log(`Selected: ${item.menu_name} (SEQ No: ${item.udw_seq_no})`);
        UDWFieldsFunction(UDW_DBR_NO, item.udw_seq_no);
        openUDWPopup();
        setIsOpen(false);
    }, []);

    // Function to open the modal
    const openUDWPopup = () => {
        setIsModalOpen(true);
    };

    // --------API Control Functions--------

    // Fetch UDW Field data
    const UDWFieldsFunction = async (DBR_NO: any, SEQ_NO: any) => {
        try {
            setfieldItemsUDWLoader(true);
            const response = await axios.get(UDWFieldItemsAPI(DBR_NO, SEQ_NO));
            setfieldItemsUDW({
                menu_name: response.data.menu_name || "",
                fields: response.data.fields || [],
            });

            setfieldItemsUDWLoader(false);
        } catch (error) {
            console.error(error);
            setfieldItemsUDWLoader(false);
        }
    };

    // =================================================================
    // User Interface
    // =================================================================

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <span className="flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
                    {NavBarItemName}
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{MenuTitle} Options</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or SEQ NO..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : filteredItems && filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.udw_seq_no}
                                className="flex justify-between items-center p-2 hover:bg-accent rounded-md group cursor-pointer"
                                onClick={() => handleItemClick(item)}
                            >
                                <span>{item.menu_name}</span>
                                <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.udw_seq_no}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground">
                            No menu items available
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
            <UDWFieldManagementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={fieldItemsUDW}
                isLoading={fieldItemsUDWLoader}
            />
        </Dialog>
    );
};
