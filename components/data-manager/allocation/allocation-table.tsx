"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { AllocationsT } from "@/lib/types";
import { useAllocationStore } from "@/context/allocation/hook";
import AddAllocationButton from "./add-allocation-button";
import UpdateAllocationButton from "./update-allocation-button";
import DeleteAllocationButton from "./delete-allocation-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import ExportButton from "@/components/ui/export-button";

export default function AllocationTable() {
  const { items, loading, ref } = useInfiniteScroll<AllocationsT>({
    searchQuery: "", // empty searchquery
    storeHook: useAllocationStore,
  });

  const columns = [
    "Consultant",
    "Project",
    "Start Date",
    "End Date",
    "Hours/Wk",
    "Util % of cap",
    "",
  ];
  const cvsRows = items.map((item) => [
    item.consultant.name,
    item.project.name,
    new Date(item.start_date).toLocaleDateString(),
    new Date(item.end_date).toLocaleDateString(),
    item.hours_per_week,
    "",
  ]);

  return (
    <div>
      <Card className="flex-1 p-4">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="text-xl font-medium">Allocations</h1>
          <div className="flex items-center gap-2">
            <ExportButton
              filename="allocations"
              headers={columns}
              rows={cvsRows}
            />
            <AddAllocationButton />
          </div>
        </div>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                {columns.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.consultant.name}</TableCell>
                  <TableCell>{item.project.name}</TableCell>
                  <TableCell>
                    {new Date(item.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.hours_per_week}</TableCell>
                  <TableCell>No calculation provided.</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <UpdateAllocationButton item={item} />
                    <DeleteAllocationButton id={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Loader */}
          {loading ? (
            <TableSkeleton count={20} />
          ) : (
            !loading &&
            items.length === 0 && (
              <span className="flex justify-center py-2">No data</span>
            )
          )}
        </div>
      </Card>
      {/* Infinite Scroll */}
      {items.length > 0 && <div ref={ref} className="h-10" />}
    </div>
  );
}
