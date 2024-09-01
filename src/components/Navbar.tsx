"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

// import { Input } from "@/components/ui/input"
//@ts-ignore
function getInitials(name) {
    if (!name) return '';
  
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    } else {
      return (
        nameParts[0][0].toUpperCase() +
        nameParts[nameParts.length - 1][0].toUpperCase()
      );
    }
  }


export function Navbar() {
    const session = useSession();
    return <div className="flex justify-between px-20 pt-4 border-b-2 border-black dark:border-white p-4">
        <div className="text-lg font-bold flex flex-col justify-center">
            <a href="/">PayViaUPI</a>
        </div>
        <ModeToggle />
        <div>

            {session.data?.user && 
            <div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            
               <Avatar>
                <AvatarImage src={session.data.user.image} />
                <AvatarFallback>{getInitials(session.data.user.name)}</AvatarFallback>
                </Avatar>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            </div>
                
            }

            {/* {session.data?.user && <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => signOut()}>Logout</Button>} */}

            
            {!session.data?.user &&<Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => signIn()}>Log in</Button>}
        </div>
    </div>
}