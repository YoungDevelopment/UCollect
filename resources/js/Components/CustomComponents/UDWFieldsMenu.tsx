import { useState, useEffect, useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/Components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Search, Save, RotateCcw, Edit3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { UDWFieldItemsAPI } from "@/lib/apiRoutes";

interface UDWField {
    field_name: string;
    udw_column_name: string;
    value: string;
    is_populated: boolean;
}

interface UDWModalProps {
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    data: {
        menu_name: string;
        fields: UDWField[];
    };
}

export function UDWFieldManagementModal({
    isOpen,
    onClose,
    data,
    isLoading,
}: UDWModalProps) {
    // =================================================================
    // States
    // =================================================================
    const [fields, setFields] = useState<UDWField[]>([]);
    const [showAllFields, setShowAllFields] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // --------API Fetch States--------
    const [fieldItemsUDWLoader, setfieldItemsUDWLoader] = useState(true);
    const [fieldItemsUDW, setfieldItemsUDW] = useState();

    // =================================================================
    // Hooks
    // =================================================================
    useEffect(() => {
        setFields(data.fields.map((field) => ({ ...field })));
    }, [data]);

    // =================================================================
    // Functions
    // =================================================================

    // --------API Control Functions--------
    const UDWFieldsFunction = async (DBR_NO: any, SEQ_NO: any) => {
        try {
            setfieldItemsUDWLoader(true);
            const response = await axios.get(UDWFieldItemsAPI(DBR_NO, SEQ_NO));
            setfieldItemsUDW(response.data);
            setfieldItemsUDWLoader(false);
        } catch (error) {
            console.error(error);
        }
    };

    // =================================================================
    // User Interface
    // =================================================================
    const filteredFields = useMemo(() => {
        return fields.filter(
            (field) =>
                (showAllFields || field.is_populated) &&
                (field.udw_column_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                    field.field_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    field.value
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
        );
    }, [fields, showAllFields, searchQuery]);

    const handleFieldChange = (index: number, newValue: string) => {
        const updatedFields = [...fields];
        updatedFields[index].value = newValue;
        updatedFields[index].is_populated = newValue.trim() !== "";
        setFields(updatedFields);
    };

    const handleResetFields = () => {
        setFields(data.fields.map((field) => ({ ...field })));
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    };

    const handleSaveChanges = () => {
        const updatedFields = fields.reduce((acc, field) => {
            acc[field.udw_column_name] = field.value;
            return acc;
        }, {} as Record<string, string>);

        console.log(JSON.stringify(updatedFields, null, 2));

        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[900px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Info className="h-6 w-6" />
                        {data.menu_name}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-4 my-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="show-all-fields"
                            checked={showAllFields}
                            onCheckedChange={setShowAllFields}
                        />
                        <label htmlFor="show-all-fields" className="text-sm">
                            {showAllFields
                                ? "Show All Fields"
                                : "Show Populated Fields"}
                        </label>
                    </div>
                    <div className="flex-grow relative">
                        <Input
                            type="text"
                            placeholder="Search fields..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto pr-4">
                    <AnimatePresence>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : filteredFields.length > 0 ? (
                            filteredFields.map((field, index) => (
                                <motion.div
                                    key={field.udw_column_name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-4 p-4 rounded-md"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <label
                                            htmlFor={`field-${field.udw_column_name}`}
                                            className="text-sm font-medium flex items-center"
                                        >
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            {field.field_name}
                                        </label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4" />
                                                </TooltipTrigger>
                                                <TooltipContent side="left">
                                                    <p className="text-xs">
                                                        {field.udw_column_name}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id={`field-${field.udw_column_name}`}
                                        value={field.value}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter value..."
                                        className="w-full bg-transparent border focus:ring focus:border"
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground">
                                No fields available
                            </div>
                        )}
                    </AnimatePresence>
                </div>
                <DialogFooter className="mt-6">
                    <Button
                        variant="outline"
                        onClick={handleResetFields}
                        className="flex items-center"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleSaveChanges}
                        className="flex items-center"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
