"use client";

import { Button } from "./button";
import { Download } from "lucide-react";

export default function ExportButton({
  headers,
  rows,
  filename,
}: {
  headers: string[];
  rows: (string | number)[][];
  filename: string;
}) {
  const handleExportCSV = () => {
    if (rows.length === 0) {
      alert("No data to export");
      return;
    }

    // Convert data to CSV format with proper escaping
    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((field) => {
            const stringField = String(field);
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (
              stringField.includes(",") ||
              stringField.includes('"') ||
              stringField.includes("\n")
            ) {
              return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
          })
          .join(",")
      )
      .join("\n");

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split("T")[0];
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${timestamp}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Button
      onClick={handleExportCSV}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
