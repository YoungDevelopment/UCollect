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
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
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
    {
        id: "7",
        date: "11/18/24",
        time: "09:00",
        dow: "MON",
        uid: "G12",
        description: "Meeting Scheduled",
        cr: "B",
        dsk: "MGR",
        nextRv: "11/19",
        txt: "",
        nextDir: "",
        st: "SCH",
    },
    {
        id: "8",
        date: "11/19/24",
        time: "14:00",
        dow: "TUE",
        uid: "H34",
        description: "Feedback Received",
        cr: "A",
        dsk: "DEV",
        nextRv: "11/20",
        txt: "",
        nextDir: "",
        st: "RCD",
    },
    {
        id: "9",
        date: "11/20/24",
        time: "16:30",
        dow: "WED",
        uid: "I56",
        description: "Project Update",
        cr: "C",
        dsk: "SUP",
        nextRv: "11/21",
        txt: "",
        nextDir: "",
        st: "UPD",
    },
    {
        id: "10",
        date: "11/21/24",
        time: "11:15",
        dow: "THU",
        uid: "J78",
        description: "Client Call",
        cr: "B",
        dsk: "REP",
        nextRv: "11/22",
        txt: "",
        nextDir: "",
        st: "CAL",
    },
    {
        id: "11",
        date: "11/22/24",
        time: "13:45",
        dow: "FRI",
        uid: "K90",
        description: "Documentation Completed",
        cr: "A",
        dsk: "DEV",
        nextRv: "11/23",
        txt: "",
        nextDir: "",
        st: "CMP",
    },
    {
        id: "12",
        date: "11/23/24",
        time: "15:30",
        dow: "SAT",
        uid: "L12",
        description: "Final Review",
        cr: "C",
        dsk: "MGR",
        nextRv: "11/24",
        txt: "",
        nextDir: "",
        st: "REV",
    },
    {
        id: "13",
        date: "11/24/24",
        time: "10:00",
        dow: "SUN",
        uid: "M34",
        description: "Launch Preparation",
        cr: "B",
        dsk: "DEV",
        nextRv: "11/25",
        txt: "",
        nextDir: "",
        st: "PREP",
    },
    {
        id: "14",
        date: "11/25/24",
        time: "09:30",
        dow: "MON",
        uid: "N56",
        description: "Launch Daykndvjsnvslknv",
        cr: "A",
        dsk: "SUP",
        nextRv: "11/26",
        txt: "",
        nextDir: "",
        st: "LD",
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
        cell: ({ row }) => <div className="w-full">{row.getValue("date")}</div>,
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => <div className="w-full">{row.getValue("time")}</div>,
    },
    {
        accessorKey: "dow",
        header: "DOW",
        cell: ({ row }) => <div className="w-full">{row.getValue("dow")}</div>,
    },
    {
        accessorKey: "uid",
        header: "Uid",
        cell: ({ row }) => <div className="w-full">{row.getValue("uid")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="min-w-[300px] w-full">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "cr",
        header: "CR",
        cell: ({ row }) => <div className="w-full">{row.getValue("cr")}</div>,
    },
    {
        accessorKey: "dsk",
        header: "Dsk",
        cell: ({ row }) => <div className="w-full">{row.getValue("dsk")}</div>,
    },
    {
        accessorKey: "nextRv",
        header: "NextRv",
        cell: ({ row }) => (
            <div className="w-full">{row.getValue("nextRv")}</div>
        ),
    },
    {
        accessorKey: "txt",
        header: "Txt",
        cell: ({ row }) => <div className="w-full">{row.getValue("txt")}</div>,
    },
    {
        accessorKey: "nextDir",
        header: "NextDir",
        cell: ({ row }) => (
            <div className="w-full">{row.getValue("nextDir")}</div>
        ),
    },
    {
        accessorKey: "st",
        header: "St",
        cell: ({ row }) => <div className="w-full">{row.getValue("st")}</div>,
    },
];

interface NotesTableProps {
    visibleColumns?: string[];
    className?: string; // Added className prop
}

export const NotesTable: React.FC<NotesTableProps> = ({
    visibleColumns,
    className,
}) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const [rowSelection, setRowSelection] = React.useState({});

    // Initialize column visibility based on the `visibleColumns` prop
    React.useEffect(() => {
        if (visibleColumns) {
            const visibilityState: VisibilityState = {};
            columns.forEach((column) => {
                const columnKey = (
                    "accessorKey" in column ? column.accessorKey : column.id
                ) as string;
                visibilityState[columnKey] = visibleColumns.includes(columnKey);
            });
            setColumnVisibility(visibilityState);
        }
    }, [visibleColumns]);

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
                pageSize: 8,
            },
        },
    });

    return (
        <div className={`w-full ${className}`}>
            {" "}
            <div className="flex flex-col sm:flex-row items-center py-4 gap-4">
                <Input
                    placeholder="Filter by description..."
                    value={
                        (table
                            .getColumn("description")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("description")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const visibleColumnsCount =
                                        headerGroup.headers.filter((h) =>
                                            h.column.getIsVisible()
                                        ).length;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="whitespace-nowrap"
                                            style={{
                                                width: header.column.getIsVisible()
                                                    ? `${
                                                          100 /
                                                          visibleColumnsCount
                                                      }%`
                                                    : "0",
                                                padding:
                                                    header.column.getIsVisible()
                                                        ? ""
                                                        : "0",
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-xs"
                                            style={{
                                                width: `${
                                                    100 /
                                                    row.getVisibleCells().length
                                                }%`,
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
