"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { graphql } from "@/fuse";
import { useQuery } from "@/fuse/client";
import { useEffect, useState } from "react";

const CustomerQuery = graphql(`
  query AllCustomers {
    customers {
      id
      name
      ... on Customer @defer {
        orders {
          nodes {
            id
          }
        }
      }
    }
  }
`);

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [result] = useQuery({
    query: CustomerQuery,
  });

  return isClient ? (
    <>
      <header className="container m-auto text-center py-12 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">GraphQL</h1>
        <h2 className="text-2xl">Incremental Data Fetching</h2>
        <p className="text-slate-500">
          This application demonstrates loading data via `@defer`.
        </p>
      </header>
      <main className="container flex flex-col m-auto border rounded-2xl my-8">
        <Table className="divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden w-full border">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Count
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {result.data?.customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">{customer.id}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {customer.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {customer.orders === undefined ? (
                    <span className="animate-pulse text-xs">Loading…</span>
                  ) : (
                    customer.orders?.nodes.length
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  ) : null;
}
