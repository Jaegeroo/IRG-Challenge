import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { DashboardDataT } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function DashboardTable({ data }: { data: DashboardDataT[] }) {
  const columns = [
    "Week",
    "Cap hrs",
    "Sch hrs",
    "Util %",
    "Cost $",
    "Rev $",
    "Profit $",
  ];

  return (
    <Card className="w-full lg:flex-1 p-4 max-h-[800px]">
      <Table className="border-b">
        <TableHeader>
          <TableRow>
            {columns.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>W{item.week}</TableCell>
              <TableCell>{item.cap_hours}</TableCell>
              <TableCell>{item.sched_hours}</TableCell>
              <TableCell
                className={cn(
                  "font-medium",
                  item.util <= 100
                    ? "text-green-400"
                    : item.util >= 100 && item.util < 120
                    ? "text-orange-400"
                    : item.util >= 120
                    ? "text-red-500"
                    : ""
                )}
              >
                {item.util}%
              </TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.rev}</TableCell>
              <TableCell
                className={cn(
                  "font-medium",
                  item.profit > 0 ? "text-green-400" : "text-red-500"
                )}
              >
                ${item.profit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="text-muted-foreground text-sm">
        Profit column colors red when &lt; 0
      </span>
    </Card>
  );
}
