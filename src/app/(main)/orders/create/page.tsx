import OrderCreateForm from "@/components/create-order-form";
import { getProducts } from "@/lib/query";

export const dynamic = 'force-dynamic'
export default async function Page() {
    const products = await getProducts()

    return (
        <div className="">
            <OrderCreateForm products={products} />
        </div>
    )
}