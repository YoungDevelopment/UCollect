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
export const ContactCard = ({
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
                        Contact Information
                    </div>
                    <ContactSideSheet />
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-3">
                        <div className="flex items-start gap-2">
                            <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Email
                                </Label>
                                <p
                                    id="email"
                                    className="text-pretty break-words text-sm"
                                    style={{
                                        wordBreak: "break-word",
                                        overflowWrap: "break-word",
                                        whiteSpace: "normal",
                                    }}
                                >
                                    {email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="borrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Borrower Phone 1
                                </Label>
                                <p id="borrowerPhone1" className="mt-1 text-sm">
                                    {borrowerPhone1}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="borrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Borrower Phone 2
                                </Label>
                                <p id="borrowerPhone2" className="mt-1 text-sm">
                                    {borrowerPhone2}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone1"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Co-Borrower Phone 1
                                </Label>
                                <p
                                    id="coBorrowerPhone1"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone1}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Co-Borrower Phone 2
                                </Label>
                                <p
                                    id="coBorrowerPhone2"
                                    className="mt-1 text-sm"
                                >
                                    {coBorrowerPhone2}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                            <div>
                                <Label
                                    htmlFor="coBorrowerPhone2"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Co-Borrower Phone 2
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
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Address
                    </h3>
                    <div className="grid grid-cols-4 gap-4 pl-7">
                        <div>
                            <Label
                                htmlFor="address"
                                className="text-xs font-medium text-muted-foreground"
                            >
                                Street
                            </Label>
                            <p id="address" className="mt-1 text-sm">
                                {address}
                            </p>
                        </div>
                        <div>
                            <Label
                                htmlFor="city"
                                className="text-xs font-medium text-muted-foreground"
                            >
                                City
                            </Label>
                            <p id="city" className="mt-1 text-sm">
                                {city}
                            </p>
                        </div>
                        <div>
                            <Label
                                htmlFor="state"
                                className="text-xs font-medium text-muted-foreground"
                            >
                                State
                            </Label>
                            <p id="state" className="mt-1 text-sm">
                                {state}
                            </p>
                        </div>
                        <div>
                            <Label
                                htmlFor="zip"
                                className="text-xs font-medium text-muted-foreground"
                            >
                                ZIP
                            </Label>
                            <p id="zip" className="mt-1 text-sm">
                                {zip}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
