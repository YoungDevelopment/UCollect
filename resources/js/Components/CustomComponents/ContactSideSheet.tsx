import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShinyButton from "@/components/ui/shiny-button";

export const ContactSideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full max-w-3xl overflow-hidden">
        <ShinyButton className="w-auto">View All</ShinyButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Deatils</SheetTitle>
          <SheetDescription>
            All of the contact details of the account
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address 1
            </Label>
            <Input
              id="name"
              value={"123 Street"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address 2
            </Label>
            <Input
              id="name"
              value={"Near Expo Center"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              City
            </Label>
            <Input
              id="name"
              value={"Mexico City"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              State
            </Label>
            <Input
              id="name"
              value={"NA"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Zip
            </Label>
            <Input
              id="name"
              value={"0000"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Phone 1
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Phone 2
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Phone 3
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Co-Borrower Phone 1
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Co-Borrower Phone 2
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Co-Borrower Phone 3
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Employer Name
            </Label>
            <Input
              id="name"
              value={"ACME Corp."}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Employeer Phone
            </Label>
            <Input
              id="name"
              value={"123456789"}
              className="col-span-3"
              onChange={() => {
                console.log("changed");
              }}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
