import { OrdersTable } from "@/components/orders-table";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { orderQuery } from "@/lib/query";
import Link from "next/link";

export default async function Page() {
    const data = await orderQuery()
    console.log(data)
    return (
        <div className="grid gap-7">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Orders</p>
                <Button className="text-xs rounded-full bg-black/80" asChild>
                    <Link href={'/orders/create'}>Add new order</Link>
                </Button>
            </div>

            <div className="">
                <OrdersTable data={data} />
            </div>
        </div>
    )
}