"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../../ui/card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { ConsultantsT } from "@/lib/types";
import { useConsultantStore } from "@/context/consultant/hook";
import AddConsultantButton from "./add-consultant-button";
import UpdateConsultantButton from "./update-consultant-button";
import DeleteConsultantButton from "./delete-cosultant-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import ExportButton from "@/components/ui/export-button";

export default function ConsultantTable() {
  const { items, loading, ref } = useInfiniteScroll<ConsultantsT>({
    searchQuery: "", // empty searh query
    storeHook: useConsultantStore,
  });

  const columns = ["Name", "Cost/hr", "Bill Rate/hr", "Capacity hrs/wk", ""];
  const csvRows = items.map((item) => [
    item.name,
    item.cost,
    item.bill,
    item.capacity,
  ]);

  return (
    <div>
      <Card className="flex-1 p-4">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="text-xl font-medium">Consultants</h1>
          <div className="flex items-center gap-2">
            <ExportButton headers={columns} rows={csvRows} filename="test" />
            <AddConsultantButton />
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.cost}</TableCell>
                  <TableCell>${item.bill}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <UpdateConsultantButton item={item} />
                    <DeleteConsultantButton id={item.id} />
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
