import { CreditsTable } from "@/components/credits-table";
import { ExpensesTable } from "@/components/expenses-table";
import { OrdersTable } from "@/components/orders-table";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { creditsQuery, expensesQuery } from "@/lib/query";
import Link from "next/link";

export const dynamic = 'force-dynamic'
export default async function Page() {
    const data = await creditsQuery()
    console.log(data)
    return (
        <div className="grid gap-7">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Credits</p>
                <Button className="text-xs rounded-full bg-black/80" asChild>
                    <Link href={'/credits/create'}>Add new credit</Link>
                </Button>
            </div>

            <div className="w-full">
                <CreditsTable data={data} />
            </div>
        </div>
    )
}