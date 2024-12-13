"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Receipt,
    Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { NotesTable } from "./NotesTable";
import { ContactSideSheet } from "./ContactSideSheet";
import { DataTable } from "./DataTable";

interface Message {
    id: string;
    date: string;
    time: string;
    dow: string;
    uid: string;
    description: string;
    cr: string;
    dsk: string;
    nextRv: string;
    txt: string;
    nextDir: string;
    st: string;
}

const data: Message[] = [
    {
        id: "1",
        date: "11/17/24",
        time: "10:53",
        dow: "SUN",
        uid: "AR3",
        description: "THIRD PARTY MESSAGE",
        cr: "C",
        dsk: "MGR",
        nextRv: "11/18",
        txt: "",
        nextDir: "",
        st: "CON",
    },
    {
        id: "2",
        date: "11/06/24",
        time: "11:29",
        dow: "WED",
        uid: "E77",
        description: "Promise Deleted",
        cr: "C",
        dsk: "MGR",
        nextRv: "11/06",
        txt: "",
        nextDir: "",
        st: "CON",
    },
    {
        id: "3",
        date: "11/05/24",
        time: "09:15",
        dow: "TUE",
        uid: "B22",
        description: "Follow-up Required",
        cr: "A",
        dsk: "REP",
        nextRv: "11/07",
        txt: "",
        nextDir: "",
        st: "OPN",
    },
    {
        id: "4",
        date: "11/04/24",
        time: "14:30",
        dow: "MON",
        uid: "C45",
        description: "Customer Inquiry",
        cr: "B",
        dsk: "SUP",
        nextRv: "11/05",
        txt: "",
        nextDir: "",
        st: "NEW",
    },
    {
        id: "5",
        date: "11/03/24",
        time: "16:45",
        dow: "SUN",
        uid: "D78",
        description: "Escalation Resolved",
        cr: "C",
        dsk: "MGR",
        nextRv: "11/10",
        txt: "",
        nextDir: "",
        st: "CLS",
    },
    {
        id: "6",
        date: "11/02/24",
        time: "11:00",
        dow: "SAT",
        uid: "F91",
        description: "New Feature Request",
        cr: "A",
        dsk: "DEV",
        nextRv: "11/15",
        txt: "",
        nextDir: "",
        st: "PND",
    },
];

export const columns: ColumnDef<Message>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("date")}</div>
        ),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => (
            <div className="w-[70px]">{row.getValue("time")}</div>
        ),
    },
    {
        accessorKey: "dow",
        header: "DOW",
        cell: ({ row }) => (
            <div className="w-[50px]">{row.getValue("dow")}</div>
        ),
    },
    {
        accessorKey: "uid",
        header: "Uid",
        cell: ({ row }) => (
            <div className="w-[60px]">{row.getValue("uid")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="min-w-[180px]">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "cr",
        header: "CR",
        cell: ({ row }) => <div className="w-[40px]">{row.getValue("cr")}</div>,
    },
    {
        accessorKey: "dsk",
        header: "Dsk",
        cell: ({ row }) => (
            <div className="w-[50px]">{row.getValue("dsk")}</div>
        ),
    },
    {
        accessorKey: "nextRv",
        header: "NextRv",
        cell: ({ row }) => (
            <div className="w-[70px]">{row.getValue("nextRv")}</div>
        ),
    },
    {
        accessorKey: "txt",
        header: "Txt",
        cell: ({ row }) => (
            <div className="w-[40px]">{row.getValue("txt")}</div>
        ),
    },
    {
        accessorKey: "nextDir",
        header: "NextDir",
        cell: ({ row }) => (
            <div className="w-[70px]">{row.getValue("nextDir")}</div>
        ),
    },
    {
        accessorKey: "st",
        header: "St",
        cell: ({ row }) => <div className="w-[50px]">{row.getValue("st")}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const message = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(message.id)
                            }
                        >
                            Copy message ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View history</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const NotesSection = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 3, // Changed from 5 to 10
            },
        },
    });

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <div className="text-2xl font-bold flex items-center gap-2">
                        <Receipt className="h-6 w-6" />
                        Notes Section
                    </div>
                    <DataTable />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <NotesTable
                    visibleColumns={["date", "description", "actions", "st"]}
                />
            </CardContent>
        </Card>
    );
};
