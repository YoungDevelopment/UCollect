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
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
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
                        <CardDescription className="text-xl font-bold">
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Account Holder
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <div className="font-semibold">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.Borrower_Name
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    SSN
                                </div>
                                <div className="flex items-center gap-2">
                                    <IdCard className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.SSN
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Date of Birth
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarFold className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            formatted_DOB
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Co-Borrower
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.CoBorrower_Name
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Assigned Date
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpenCheck className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            formatted_DBR_Assign_Date_O
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Status
                                </div>
                                <div className="flex items-center gap-2">
                                    <ScanText className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.DBR_Status
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Desk
                                </div>
                                <div className="flex items-center gap-2">
                                    <Ratio className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.DBR_Desk
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                    Closed Date
                                </div>
                                <div className="flex items-center gap-2">
                                    <EyeClosed className="h-4 w-4" />
                                    <div className="font-mono">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4" />
                                        ) : (
                                            accountDetails?.DBR_Close_Date_O
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </motion.div>
            </AuroraBackground>
        </Card>
    );
};
