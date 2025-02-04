import { ExpensesTable } from "@/components/expenses-table";
import { OrdersTable } from "@/components/orders-table";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { expensesQuery } from "@/lib/query";
import Link from "next/link";

export default async function Page() {
    const data = await expensesQuery()
    console.log(data)
    return (
        <div className="grid gap-7">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Expenses</p>
                <Button className="text-xs rounded-full bg-black/80" asChild>
                    <Link href={'/expenses/create'}>Add new expense</Link>
                </Button>
            </div>

            <div className="">
                <ExpensesTable data={data} />
            </div>
        </div>
    )
}