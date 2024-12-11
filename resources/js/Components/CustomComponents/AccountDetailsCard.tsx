import {
    CreditCard,
    DollarSign,
    User,
    Copy,
    Users,
    CalendarFold,
    IdCard,
    BookOpenCheck,
    ScanText,
    Ratio,
    EyeClosed,
    Mail,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/Components/ui/badge";
import { useTheme } from "next-themes";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";

type AccountDetailsCardProps = {
    accountDetails?: {
        DBR_NO: string;
        Borrower_Name: string;
        CoBorrower_Name: string;
        DBR_Assign_Date_O: string;
        DBR_Cli_REF_No: string;
        DOB: string;
        DBR_Client: string;
        DBR_Close_Date_O: string | null;
        DBR_Desk: string;
        DBR_Status: string;
        SSN: string;
    };
    isLoading: boolean;
};

export const AccountDetailsCard = ({
    accountDetails,
    isLoading,
}: AccountDetailsCardProps) => {
    // =================================================================
    // States
    // =================================================================
    const { theme, setTheme } = useTheme();

    // =================================================================
    // Functions
    // =================================================================
    const formatted_DBR_Assign_Date_O = accountDetails?.DBR_Assign_Date_O
        ? format(
              parse(
                  accountDetails.DBR_Assign_Date_O,
                  "yyyy-MM-dd HH:mm:ss.SSS",
                  new Date()
              ),
              "MM/dd/yyyy"
          )
        : "Invalid Date";

    const formatted_DOB = accountDetails?.DOB
        ? format(
              parse(accountDetails.DOB, "yyyy-MM-dd", new Date()),
              "MM/dd/yyyy"
          )
        : "Invalid Date";

    // =================================================================
    // User Interface
    // =================================================================
    return (
        <Card className="w-full max-w-3xl overflow-hidden">
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className=""
                >
                    <CardHeader className="pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                {isLoading ? (
                                    <Skeleton className="w-32 h-6" />
                                ) : (
                                    accountDetails?.DBR_NO
                                )}
                                <Copy
                                    className="h-4 w-4 muted-foreground"
                                    onClick={() =>
                                        toast("Event has been created", {
                                            description:
                                                "Sunday, December 03, 2023 at 9:00 AM",
                                            action: {
                                                label: "Undo",
                                                onClick: () =>
                                                    console.log("Undo"),
                                            },
                                        })
                                    }
                                />
                            </CardTitle>
                            <Badge
                                className="place-self-end text-1xl z-10"
                                onClick={() => {
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    );
                                    toast("Theme Color has been changed", {
                                        action: {
                                            label: "Undo",
                                            onClick: () =>
                                                setTheme(
                                                    theme === "dark"
                                                        ? "light"
                                                        : "dark"
                                                ),
                                        },
                                    });
                                }}
                            >
                                {isLoading ? (
                                    <Skeleton className="w-24 h-6" />
                                ) : (
                                    accountDetails?.DBR_Client
                                )}
                            </Badge>
                        </div>
                        <CardDescription className="text-lg font-bold">
                            {isLoading ? (
                                <Skeleton className="w-32 h-6" />
                            ) : (
                                accountDetails?.DBR_Cli_REF_No
                            )}
                        </CardDescription>
                        <div
                            className="h-1 border-t border-transparent"
                            style={{ borderWidth: "4px" }}
                        />
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-start gap-2">
                                <User className="h-5 w-5 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="account-holder"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Account Holder
                                    </Label>
                                    <p
                                        id="account-holder"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.Borrower_Name
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* SSN */}
                            <div className="flex items-start gap-2">
                                <IdCard className="h-5 w-5 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="ssn"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        SSN
                                    </Label>
                                    <p
                                        id="ssn"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.SSN
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="flex items-start gap-2">
                                <CalendarFold className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="date-of-birth"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Date of Birth
                                    </Label>
                                    <p
                                        id="date-of-birth"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            formatted_DOB
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Users className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="co-borrower"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Co-Borrower
                                    </Label>
                                    <p
                                        id="co-borrower"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.CoBorrower_Name
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-start gap-2">
                                <BookOpenCheck className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="assigned-date"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Assigned Date
                                    </Label>
                                    <p
                                        id="assigned-date"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            formatted_DBR_Assign_Date_O
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <ScanText className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="status"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Status
                                    </Label>
                                    <p
                                        id="status"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.DBR_Status
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Ratio className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="desk"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Desk
                                    </Label>
                                    <p
                                        id="desk"
                                        className="text-pretty break-words font-mono text-sm"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.DBR_Desk
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                    <Label
                                        htmlFor="DBR_Close_Date_O"
                                        className="text-xs font-medium text-muted-foreground"
                                    >
                                        Email
                                    </Label>
                                    <p
                                        id="DBR_Close_Date_O"
                                        className="text-pretty break-words"
                                        style={{
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {accountDetails?.DBR_Close_Date_O}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </motion.div>
            </AuroraBackground>
        </Card>
    );
};
