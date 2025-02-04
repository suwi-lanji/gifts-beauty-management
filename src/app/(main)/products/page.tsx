import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { productsQuery } from "@/lib/query";
import Link from "next/link";

export default async function Page() {
    const data = await productsQuery()
    console.log(data)
    return (
        <div className="grid gap-7">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Products</p>
                <Button className="text-xs rounded-full bg-black/80" asChild>
                    <Link href={'/products/create'}>Add new product</Link>
                </Button>
            </div>

            <div className="">
                <ProductsTable data={data} />
            </div>
        </div>
    )
}