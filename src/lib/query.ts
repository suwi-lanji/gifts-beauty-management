'use server'

import { db } from "@/server/db"
import { credits, expenses, orders, products, productsToOrders } from "@/server/db/schema"
import { eq } from "drizzle-orm"
export const revenueOverview = async () => {
    const data = await db.select().from(orders).execute()
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const productsSold = async () => {
    const data = await db.select().from(productsToOrders).execute()
    
    return data.length
}

export const totalExpenses = async () => {
    const data = await db.select().from(expenses).execute()
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const totalCredits = async () => {
    const data = await db.select().from(credits).execute()
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const productsQuery = async () => {
    const data = await db.select().from(products).execute()

    return data
}

export const getProduct = async (id: string) => {
    const data = await db.select().from(products).where(eq(products.id, id)).execute()

    return data[0]
}

export const getProducts = async () => {
    const data = await db.select().from(products).execute()

    return data
}

export const orderQuery = async () => {
    const data = await db.select().from(orders).execute()

    return data
}

export const expensesQuery = async () => {
    const data = await db.select().from(expenses).execute()

    return data
}

export const creditsQuery = async () => {
    const data = await db.select().from(credits).execute()

    return data
}

