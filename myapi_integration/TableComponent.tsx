import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import ExportComponent from "../exportOption/exportTo";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: any, index: number) => React.ReactNode;
}

interface TableComponentProps {
  tableId?: string;
  columns: Column[];
  data: any[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;

  // optional checkbox features
  selectable?: boolean;
  selectAll?: boolean;
  selectedRows?: Set<number>;
  onSelectAll?: (total: number) => void;
  onRowSelect?: (index: number, total: number) => void;

  // optional helpers
  getDepartmentColor?: (dept: string) => string;
  renderActionColumn?: (row: any, index: number) => React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableId,
  columns,
  data,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  selectable = false,
  selectAll = false,
  selectedRows = new Set(),
  onSelectAll,
  onRowSelect,
  getDepartmentColor,
  renderActionColumn,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-start">
        <ExportComponent
          tableId={tableId}
          filename={tableId}
        />
      </div>

      <div className="bg-white-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">

        <div className="overflow-x-auto">
          <table id={tableId} className="min-w-full" style={{ minWidth: "120%" }}>
            <thead>
              <tr className="bg-primary">
                {selectable && (
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => onSelectAll && onSelectAll(data.length)}
                        className="w-4 h-4 text-white border-white rounded focus:ring-white bg-primary checked:bg-white"
                      />
                      <span className="text-sm font-semibold text-white">Select</span>
                    </div>
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <ArrowUpDown className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(startIndex + index)}
                          onChange={() =>
                            onRowSelect && onRowSelect(startIndex + index, data.length)
                          }
                          className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-white dark:bg-gray-800"
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                      >
                        {col.render
                          ? col.render(row, startIndex + index)
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm mr-4 text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                  }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === page
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
