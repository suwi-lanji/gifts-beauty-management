'use server'
import { type z } from 'zod'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { credits, expenses, orders, products, productsToOrders } from '@/server/db/schema'
import { type ProductSchema } from '@/app/(main)/products/create/page'
import { put } from '@vercel/blob'
import { eq } from 'drizzle-orm'
import { type OrderSchema } from '@/components/create-order-form'
import { type ExpenseSchema } from '@/app/(main)/expenses/create/page'
import { type CreditSchema } from '@/app/(main)/credits/create/page'


// products
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProduct(url: string, values: z.infer<typeof ProductSchema>) {
    
    const data = {
        image: url,
        name: values.name,
        description: values.description,
        price: values.price,
        is_available: values.is_available
    }
    await db.insert(products).values(data)
    revalidatePath("/products")
}

export async function updateProduct(id: string, values: z.infer<typeof ProductSchema>) {
    
    if(values.image?.name != "default-image.png") {
        const { url } = await put(values.image!.name, values.image!, { access: 'public' });
        const data = {
            image: url,
            name: values.name,
            description: values.description,
            price: values.price,
            is_available: values.is_available
        }
        console.log(data)
        await db.insert(products).values(data)
        
    } else {
        const data = {
            name: values.name,
            description: values.description,
            price: values.price,
            is_available: values.is_available
        }
        await db.update(products).set(data).where(eq(products.id, id))
        
    }
    revalidatePath("/products")
}
// orders

export const createOrder = async (values: z.infer<typeof OrderSchema>) => {
    const order = await db.insert(orders).values({amount: values.amount, date: values.date.toISOString().split('T')[0]}).returning({insertedId: orders.id})

    if(order[0]?.insertedId) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        values.products.forEach(async (product) => {
            for(let i=0; i<product.quantity; i++) {
                await db.insert(productsToOrders).values({orderId: order[0]!.insertedId, productId: product.id})
            }
        });
    }
    revalidatePath("/orders")
}

// expenses
export const createExpense = async (values: z.infer<typeof ExpenseSchema>) => {
    await db.insert(expenses).values({name: values.name, category: values.category, amount: values.amount, date: values.date.toISOString().split('T')[0]})

    revalidatePath("/expenses")
}
// credits

export const createCredit = async (values: z.infer<typeof CreditSchema>) => {
    await db.insert(credits).values({debtor_name: values.name, status: values.status, amount: values.amount, date: values.date.toISOString().split('T')[0], description: values.description})

    revalidatePath("/credits")
}
