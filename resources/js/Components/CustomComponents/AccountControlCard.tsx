import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Home, Mail, Phone, Briefcase, User, Users } from "lucide-react";
import { ContactSideSheet } from "@/components/customComponents/ContactSideSheet";
import { Button } from "../ui/button";
import Particles from "../ui/particles";
import { useTheme } from "next-themes";
import Meteors from "../ui/meteors";
import { AddNotes } from "./AddNotes";

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
export const AccountControlCard = ({
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
            <div className="relative  overflow-hidden rounded-lg border ">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <div className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            Account Controls
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 z-50">
                    <div className="grid gap-2 z-10">
                        <Button
                            variant="outline"
                            onClick={() => console.log("Letter")}
                        >
                            Letter Action
                        </Button>
                        <AddNotes />
                    </div>
                    <Meteors number={30} />
                </CardContent>
            </div>
        </Card>
    );
};
