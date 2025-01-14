import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"

interface Account {
  DBR_No: string
  DBR_Cli_Ref_No: string
  DBR_Client: string
  DBR_Status: string
  DBR_Desk: string
  DBR_Close_Date_O: string | null
}

interface AccountsTableProps {
  accounts: Account[]
  onAccountClick: (account: Account) => void
}

export function AccountsTable({ accounts, onAccountClick }: AccountsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>DBR No</TableHead>
          <TableHead>Client Ref No</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Desk</TableHead>
          <TableHead>Close Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow 
            key={account.DBR_No} 
            onClick={() => onAccountClick(account)}
            className="cursor-pointer hover:bg-muted/50"
          >
            <TableCell>{account.DBR_No}</TableCell>
            <TableCell>{account.DBR_Cli_Ref_No}</TableCell>
            <TableCell>{account.DBR_Client}</TableCell>
            <TableCell>{account.DBR_Status}</TableCell>
            <TableCell>{account.DBR_Desk}</TableCell>
            <TableCell>{account.DBR_Close_Date_O || 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

