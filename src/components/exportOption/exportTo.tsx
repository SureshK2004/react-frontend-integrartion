import React from "react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeXls } from "react-icons/bs";
import { PiFileCsv } from "react-icons/pi";
import { BsPrinter } from "react-icons/bs";

interface ExportComponentProps {
  tableId: string;
  filename: string;
  data?: any[];
  onExportPDF?: (props: { tableId: string; filename: string }) => void;
  onExportExcel?: (props: { tableId: string; filename: string; data?: any[] }) => void;
  onExportCSV?: (props: { tableId: string; filename: string; data?: any[] }) => void;
  onPrint?: (props: { tableId: string; filename: string }) => void;
  onError?: (message: string) => void;
}

const ExportComponent: React.FC<ExportComponentProps> = ({
  tableId,
  filename,
  data,
  onExportPDF,
  onExportExcel,
  onExportCSV,
  onPrint,
  onError,
}) => {
  // Helper function to extract data from table if `data` prop is not provided
  const getTableData = (): any[] | null => {
    const table = document.getElementById(tableId);
    if (!table) {
      onError?.(`Table with ID "${tableId}" not found`);
      return null;
    }
    const rows = Array.from(table.querySelectorAll("tr"));
    if (rows.length === 0) {
      onError?.("Table is empty");
      return null;
    }
    const headers = Array.from(rows[0].querySelectorAll("th")).map((th) => th.textContent?.trim() || "");
    return rows.slice(1).map((row) =>
      Array.from(row.querySelectorAll("td")).reduce((obj, td, i) => {
        obj[headers[i]] = td.textContent?.trim() || "";
        return obj;
      }, {} as Record<string, string>)
    );
  };

  // Helper function to get styles for PDF/print
  const getStyles = (): string => {
    return Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules).map((rule) => rule.cssText).join("");
        } catch (e) {
          return "";
        }
      })
      .filter(Boolean)
      .join("");
  };

  // Default PDF export
  const defaultExportToPDF = () => {
    const content = document.getElementById(tableId);
    if (!content) {
      onError?.(`Table with ID "${tableId}" not found`);
      return;
    }
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const styles = getStyles();
      printWindow.document.write(`
        <html>
          <head>
            <title>${filename}</title>
            <style>${styles}</style>
          </head>
          <body>${content.outerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.onafterprint = () => printWindow.close();
      printWindow.print();
    } else {
      onError?.("Failed to open print window");
    }
  };

  // Default Excel export
  const defaultExportToExcel = () => {
    const exportData = data && data.length > 0 ? data : getTableData();
    if (!exportData || exportData.length === 0) {
      onError?.("No data available for Excel export");
      return;
    }
    try {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
      onError?.("Failed to export to Excel: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  // Default CSV export
  const defaultExportToCSV = () => {
    const exportData = data && data.length > 0 ? data : getTableData();
    if (!exportData || exportData.length === 0) {
      onError?.("No data available for CSV export");
      return;
    }
    try {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${filename}.csv`);
    } catch (error) {
      onError?.("Failed to export to CSV: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  // Default Print (reuses PDF logic)
  const defaultPrintTable = defaultExportToPDF;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 dark:text-gray-400">Export to</span>
      
      <button
        onClick={() => onExportPDF?.({ tableId, filename }) || defaultExportToPDF()}
        className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-11 h-11 flex flex-col items-center justify-center transition-colors"
        aria-label="Export table to PDF"
      >
        <FaRegFilePdf className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium"></span>
      </button>

      <button
        onClick={() => onExportExcel?.({ tableId, filename, data }) || defaultExportToExcel()}
        className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-11 h-11 flex flex-col items-center justify-center transition-colors"
        aria-label="Export table to Excel"
      >
        <BsFiletypeXls className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium"></span>
      </button>

      <button
        onClick={() => onExportCSV?.({ tableId, filename, data }) || defaultExportToCSV()}
        className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-11 h-11 flex flex-col items-center justify-center transition-colors"
        aria-label="Export table to CSV"
      >
        <PiFileCsv className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium"></span>
      </button>

      <button
        onClick={() => onPrint?.({ tableId, filename }) || defaultPrintTable()}
        className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-11 h-11 flex flex-col items-center justify-center transition-colors"
        aria-label="Print table"
      >
        <BsPrinter className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium"></span>
      </button>
    </div>
  );
};

export default ExportComponent;