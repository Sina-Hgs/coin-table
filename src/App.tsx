import { Table } from "./components/Table";
import { SearchInput } from "./components/SearchInput";
import { useGetData } from "./services/useGetData";
import { useUrlSearch } from "./hooks/useUrlSearch";
import { useDebounce } from "./hooks/useDebounce";
import type { Coin } from "./types/coins";

function App() {
  const { value: search, setValue: setSearch } = useUrlSearch("search");

  const debouncedSearch = useDebounce(search, 600);

  const { data = [], isLoading, isError } = useGetData(debouncedSearch);

  const columns = [
    {
      key: "logo_url",
      title: "Logo",
      id: "0",
      render: (value?: string, row?: Coin, index?: number) => (
        <img
          src={value ?? ""}
          alt=""
          loading={index !== undefined && index < 8 ? "eager" : "lazy"}
          className="h-12 w-12 object-cover"
        />
      ),
    },
    { key: "name", title: "Name", id: "1" },
    { key: "symbol", title: "Symbol", id: "2" },
    {
      key: "price",
      title: "Price",
      render: (value: number) => <span>${value}</span>,
      id: "3",
    },
    {
      key: "price_change_percentage_24h",
      title: "24h",
      id: "4",
      render: (value: number) => (
        <span className={value > 0 ? "text-green-600" : "text-red-600"}>
          {value.toFixed(2)}%
        </span>
      ),
    },
  ];

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Something went wrong</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* 🔍 Search input */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by name or symbol..."
      />

      {/* 🗂 Table */}
      <Table<Coin>
        data={data}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}

export default App;
