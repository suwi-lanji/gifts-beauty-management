import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <main className="flex-grow">
                <div className="flex items-center justify-between border-b p-3">
                    <div className=""><SidebarTrigger /></div>
                    <Link href={'/dashboard'}>
                        <p className="text-lg font-bold font-[cursive]">Gift&apos;s Beauty Salon</p>
                    </Link>
                    <div className=""></div>
                </div>
                <div className="p-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}
