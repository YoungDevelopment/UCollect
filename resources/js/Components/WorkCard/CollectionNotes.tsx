import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Home, Mail, Phone, User, Users } from "lucide-react";
import { ContactSideSheet } from "@/components/workCard/ContactSideSheet";

interface ContactCardProps {
  note: string;
  client: string;
  sif: string;
  com: string;
}
export const CollectionNotes = ({
  note = "SIF 65% (35% DISC) MGR55-3",
  client = "Effingham",

}: ContactCardProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="grid gap-6">
        <div className="grid gap-2"></div>
        <div className="grid gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7 items-center items-start ">
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Client
                </Label>
                <p id="email" className="mt-1">
                  {client}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <Label
                  htmlFor="borrowerPhone1"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Collection Note
                </Label>
                <p id="borrowerPhone1" className="mt-1">
                  {note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
