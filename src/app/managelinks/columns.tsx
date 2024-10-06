"use client"

import { useSession } from "next-auth/react"; // Import useSession
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
export type UPILinks = {
    id: string;
    upi_id: string;
    upi_link: string;
    clicks: number;
    created_date: Date;
}

const deleteLink = (upi_link: string, session: any) => {
    console.log('deleting link with:', upi_link, session);

    fetch('/api/deletelink', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "upi_link": upi_link,
        "userEmail": session?.user?.email, // Pass the user email from session
        "session": session,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.upi_link) {
        console.log('Link deleted:', data.upi_link);
        
        
      } else {
        console.error('Failed to delete link');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const columns: ColumnDef<UPILinks>[] = [
    {
      accessorKey: "upi_id",
      header: "UPI ID",
    },
    {
      accessorKey: "clicks",
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Clicks
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        }
    },
    {
      accessorKey: "created_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }
    },
    {
      accessorKey: "upi_link",
      header: "UPI Link",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const upi_data = row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: session } = useSession();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${upi_data.upi_link}`)}>
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/${upi_data.upi_link}`)}>
                Visit Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                deleteLink(upi_data.upi_link, session);
                window.location.reload();
              }
              }>Delete Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
];
