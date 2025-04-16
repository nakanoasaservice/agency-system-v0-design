"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string
  filterValue?: string
  pageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterValue,
  pageSize = 5,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowsToShow, setRowsToShow] = React.useState(pageSize)

  // フィルター値が変更されたら適用
  React.useEffect(() => {
    if (filterColumn && filterValue !== undefined) {
      setColumnFilters([
        {
          id: filterColumn,
          value: filterValue,
        },
      ])
    } else {
      setColumnFilters([])
    }
  }, [filterColumn, filterValue])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 100, // 大きな値を設定して内部ページネーションを無効化
      },
    },
  })

  // フィルタリングと並べ替え後のデータ
  const filteredSortedData = table.getFilteredRowModel().rows

  // 表示する行数を制限
  const visibleRows = filteredSortedData.slice(0, rowsToShow)

  // さらに読み込むボタンを表示するかどうか
  const hasMoreRows = rowsToShow < filteredSortedData.length

  // さらに読み込むボタンがクリックされたときの処理
  const handleLoadMore = () => {
    setRowsToShow((prev) => prev + pageSize)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  該当するデータがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasMoreRows && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} className="w-full max-w-sm">
            さらに読み込む...
          </Button>
        </div>
      )}
    </div>
  )
}

