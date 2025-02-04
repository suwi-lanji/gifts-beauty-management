import ProductEditForm from "@/components/edit-product"
import { getProduct } from "@/lib/query"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const product = await getProduct(id)

    return (
        <div className="">
            <ProductEditForm product={product!} id={id} />
        </div>
    )
}