"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Receipt,
    CreditCard,
    Calendar,
    AlertCircle,
    DollarSign,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import ShinyButton from "@/components/ui/shiny-button";
import { ContactSideSheet } from "./ContactSideSheet";

// Sample data
const loanInfo = {
    assignedAmount: 10000,
    principalDue: 8500,
    receivedAmount: 1500,
    totalDue: 9000,
    chargeOffDate: "2023-05-15",
    oosDate: "2023-06-01",
    ccnDate: "2023-06-15",
    deathDescriptionDate: "2023-07-01",
};

const scheduledPayments = [
    { date: "2023-08-01", amount: 500 },
    { date: "2023-09-01", amount: 500 },
    { date: "2023-10-01", amount: 500 },
    { date: "2023-11-01", amount: 500 },
    { date: "2023-12-01", amount: 500 },
];

const transactions = [
    { date: "2023-07-01", amount: 500, type: "Payment" },
    { date: "2023-06-01", amount: 500, type: "Payment" },
    { date: "2023-05-01", amount: 500, type: "Payment" },
    { date: "2023-04-01", amount: 500, type: "Payment" },
    { date: "2023-03-01", amount: 500, type: "Payment" },
];

const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const FinanceCard = () => {
    const { theme } = useTheme();
    const [showAllScheduled, setShowAllScheduled] = useState(false);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    const calculateProgress = () => {
        const totalAmount = loanInfo.assignedAmount;
        const paidAmount = loanInfo.assignedAmount - loanInfo.totalDue;
        return (paidAmount / totalAmount) * 100;
    };

    return (
        <Card className="w-full max-w-2xl ">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <div className="text-2xl font-bold flex items-center gap-2">
                        <Receipt className="h-6 w-6" />
                        Payment Details
                    </div>
                    <ContactSideSheet />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Loan Progress</h3>
          <Progress value={calculateProgress()} className="w-full" />
          <p className="font-mono">
            {formatCurrency(loanInfo.assignedAmount - loanInfo.totalDue)} paid
            of {formatCurrency(loanInfo.assignedAmount)}
          </p>
        </div> */}

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Debt Information
                        </h3>
                        <dl className="grid grid-cols-2 gap-2 items-center">
                            <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                                <div className="font-mono">Assigned:</div>
                            </div>
                            <dd className="font-medium font-semibold">
                                {formatCurrency(loanInfo.assignedAmount)}
                            </dd>
                            <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                                <dt>Principal Due:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatCurrency(loanInfo.principalDue)}
                            </dd>
                            <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                                <dt>Received:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatCurrency(loanInfo.receivedAmount)}
                            </dd>
                            <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-red-500" />
                                <dt>Total Due:</dt>
                            </div>
                            <dd className="font-medium font-semibold">
                                {formatCurrency(loanInfo.totalDue)}
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Important Dates
                        </h3>
                        <dl className="grid grid-cols-2 gap-2 items-center">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                                <dt>Charge Off:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatDate(loanInfo.chargeOffDate)}
                            </dd>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
                                <dt>OOS Flag:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatDate(loanInfo.oosDate)}
                            </dd>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-pink-500" />
                                <dt>CCN Flag:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatDate(loanInfo.ccnDate)}
                            </dd>
                            <div className="flex items-center">
                                <AlertCircle className="mr-2 h-4 w-4 text-gray-500" />
                                <dt>Last Trs:</dt>
                            </div>
                            <dd className="font-medium">
                                {formatDate(loanInfo.deathDescriptionDate)}
                            </dd>
                        </dl>
                    </div>
                </div>

                <Tabs defaultValue="scheduled" className="mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="scheduled">
                            Scheduled Payments
                        </TabsTrigger>
                        <TabsTrigger value="transactions">
                            Transactions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="scheduled">
                        <ScrollArea className="h-[200px] w-full rounded-md border dark:border-slate-700">
                            <Table>
                                <TableHeader>
                                    <TableRow className="dark:border-slate-700">
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {scheduledPayments
                                        .slice(
                                            0,
                                            showAllScheduled ? undefined : 3
                                        )
                                        .map((payment, index) => (
                                            <TableRow
                                                className="dark:border-slate-700"
                                                key={index}
                                                // className={`${
                                                //   index % 2 === 0
                                                //     ? theme === "dark"
                                                //       ? "bg-gray-800"
                                                //       : "bg-gray-50"
                                                //     : theme === "dark"
                                                //     ? "bg-gray-700"
                                                //     : "bg-white"
                                                // }`}
                                            >
                                                <TableCell>
                                                    {formatDate(payment.date)}
                                                </TableCell>
                                                <TableCell>
                                                    {formatCurrency(
                                                        payment.amount
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                        <ShinyButton
                            onClick={() =>
                                setShowAllScheduled(!showAllScheduled)
                            }
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            {showAllScheduled
                                ? "Show less"
                                : "Show all scheduled payments"}
                        </ShinyButton>
                    </TabsContent>
                    <TabsContent value="transactions">
                        <ScrollArea className="h-[200px] w-full rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Type</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions
                                        .slice(
                                            0,
                                            showAllTransactions ? undefined : 3
                                        )
                                        .map((transaction, index) => (
                                            <TableRow
                                                key={index}
                                                // className={`${
                                                //   index % 2 === 0
                                                //     ? theme === "dark"
                                                //       ? "bg-gray-800"
                                                //       : "bg-gray-50"
                                                //     : theme === "dark"
                                                //     ? "bg-gray-700"
                                                //     : "bg-white"
                                                // }`}
                                            >
                                                <TableCell>
                                                    {formatDate(
                                                        transaction.date
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.type}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                        <ShinyButton
                            onClick={() =>
                                setShowAllTransactions(!showAllTransactions)
                            }
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            {showAllTransactions
                                ? "Show less"
                                : "Show all transactions"}
                        </ShinyButton>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
