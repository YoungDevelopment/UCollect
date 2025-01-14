import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Home, Mail, Phone, Briefcase, User, Users } from "lucide-react";
import { ContactSideSheet } from "@/components/workCard/ContactSideSheet";

interface ContactCardProps {
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    borrowerPhone1: string;
    borrowerPhone2: string;
    coBorrowerPhone1: string;
    coBorrowerPhone2: string;
    employerName: string;
    employerPhone: string;
}
export const MiscInfoCard = ({
    address = "123 Main St Main Road Flags",
    city = "Anytown",
    state = "ST",
    zip = "12345",
    email = "example@email.com",
    borrowerPhone1 = "(555) 123-4567",
    borrowerPhone2 = "(555) 987-6543",
    coBorrowerPhone1 = "(555) 234-5678",
    coBorrowerPhone2 = "(555) 876-5432",
    employerName = "ACME Corporation",
    employerPhone = "(555) 999-8888",
}: ContactCardProps) => {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <div className="text-2xl font-bold flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Misc Information
                    </div>
                    <ContactSideSheet />
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-3">
                        {/* Debt Description */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Debt Description
                                </Label>
                                <p
                                    id="coBorrowerPhone1"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone1}
                                </p>
                            </div>
                        </div>

                        {/* Current Creditor */}
                        <div className="flex items-start gap-2">
                            <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Current Creditor
                                </Label>
                                <p id="email" className="mt-1 text-sm">
                                    {email}
                                </p>
                            </div>
                        </div>

                        {/* Original Creditor */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="borrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Original Creditor
                                </Label>
                                <p id="borrowerPhone1" className="mt-1 text-sm">
                                    {borrowerPhone1}
                                </p>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="borrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Portfolio
                                </Label>
                                <p id="borrowerPhone2" className="mt-1 text-sm">
                                    {borrowerPhone2}
                                </p>
                            </div>
                        </div>

                        {/* Open Date */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Open Date
                                </Label>
                                <p
                                    id="coBorrowerPhone1"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone1}
                                </p>
                            </div>
                        </div>

                        {/* Open Credit */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Open Credit
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>
                        {/* OOS Date */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    OOS Date
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>

                        {/* Last Pay Date */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Last Pay Date
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>

                        {/* Last Payment */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Last Payment
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>

                        {/* Co-Amount */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Co-Amount
                                </Label>
                                <p
                                    id="coBorrowerPhone1"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone1}
                                </p>
                            </div>
                        </div>

                        {/* Total Paid */}
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Total Paid
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
