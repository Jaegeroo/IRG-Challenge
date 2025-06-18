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
import { useClientStore } from "@/context/client/hook";
import { ClientsT } from "@/lib/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import AddClientButton from "./add-client-button";
import UpdateClientButton from "./update-client-button";
import DeleteClientButton from "./delete-client-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import ExportButton from "@/components/ui/export-button";

export default function ClientTable() {
  const { items, loading, ref } = useInfiniteScroll<ClientsT>({
    searchQuery: "", // empty searchquery
    storeHook: useClientStore,
  });

  const columns = ["Name", "Actions"];
  const csvRows = items.map((item) => [item.name]);

  return (
    <div>
      <Card className="flex-1 p-4">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="text-xl font-medium">Clients</h1>
          <div className="flex items-center gap-2">
            <ExportButton filename="clients" headers={columns} rows={csvRows} />
            <AddClientButton />
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
                  <TableCell className="flex items-center gap-1">
                    <UpdateClientButton item={item} />
                    <DeleteClientButton id={item.id} />
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
