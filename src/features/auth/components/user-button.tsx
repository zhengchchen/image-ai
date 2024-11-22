"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Loader, LogOutIcon, CreditCard } from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const UserButton = () => {
    const session = useSession()

    if (session.status === "loading") {
        return <Loader className="animate-spin size-4 text-muted-foreground" />
    }

    if(session.status === "unauthenticated" || !session.data){
        redirect("/sign-in")
    }

    const name = session.data.user?.name!
    const imageUrl = session.data.user?.image!

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage src={imageUrl || ""} alt={name} />
                    <AvatarFallback className="bg-blue-500 text-white font-medium flex items-center justify-center">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem className="h-10">
                    <CreditCard className="size-4 mr-2"/>
                    Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="h-10" onClick={() => signOut()}>
                    <LogOutIcon className="size-4 mr-2"/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
