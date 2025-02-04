'use client'
import { Banknote, HandCoins, Home, Inbox, List } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: Inbox,
    },
    {
        title: "Products",
        url: "/products",
        icon: List,
    },
    {
        title: "Expenses",
        url: "/expenses",
        icon: Banknote,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: HandCoins,
    },
]

export function AppSidebar() {

    const isMobile = useIsMobile()
    const { setOpenMobile } = useSidebar()
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild onClick={() => {
                                        if (isMobile) {
                                            setOpenMobile(false)
                                        }
                                    }}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
