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
import { ProjectsT } from "@/lib/types";
import { useProjectStore } from "@/context/project/hook";
import UpdateProjectButton from "./update-project-button";
import DeleteProjectButton from "./delete-project-button";
import AddProjectButton from "./add-projects-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import ExportButton from "@/components/ui/export-button";

export default function ProjectTable() {
  const { items, loading, ref } = useInfiniteScroll<ProjectsT>({
    searchQuery: "", // empty searchquery
    storeHook: useProjectStore,
  });

  const columns = ["Project Name", "Client", "Billing Model", "Flat Fee $", ""];
  const csvRows = items.map((item) => [
    item.name,
    item.client.name,
    item.billing_model,
    item?.flat_fee || "",
  ]);

  return (
    <div>
      <Card className="flex-1 p-4 max-h-[800px]">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="text-xl font-medium">Projects</h1>
          <div className="flex items-center gap-2">
            <ExportButton
              filename="projects"
              headers={columns}
              rows={csvRows}
            />
            <AddProjectButton />
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
                  <TableCell>{item.client.name}</TableCell>
                  <TableCell>{item.billing_model}</TableCell>
                  <TableCell>${item.flat_fee?.toLocaleString()}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <UpdateProjectButton item={item} />
                    <DeleteProjectButton id={item.id} />
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
