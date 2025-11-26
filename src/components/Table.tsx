type TableColumn<T> = {
  key: keyof T | string;
  title: React.ReactNode;
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  id: string | number;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  emptyState?: React.ReactNode;
  className?: string;
};

export const Table = <T,>({
  columns,
  data,
  keyExtractor,
  emptyState = "No data available",
  className = "",
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-auto rounded-2xl border border-gray-200">
      <div className="w-full overflow-x-auto">
        <table className={`min-w-full border-collapse ${className}`}>
          {/* Header */}
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap ${
                    column.className ?? ""
                  }`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  {emptyState}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const key = keyExtractor?.(row, index) ?? index;

                return (
                  <tr
                    key={key}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    } hover:bg-gray-100`}
                  >
                    {columns.map((column) => {
                      const value =
                        typeof column.key === "string"
                          ? (row as any)[column.key]
                          : (row as any)[column.key];

                      return (
                        <td
                          key={column.id}
                          className={`px-4 py-3 text-sm text-gray-700 ${
                            column.className ?? ""
                          }`}
                        >
                          {column.render
                            ? column.render(value, row, index)
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
