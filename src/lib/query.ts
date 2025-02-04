'use server'

import { db } from "@/server/db"
import { credits, expenses, orders, products, productsToOrders } from "@/server/db/schema"
import { eq, gt } from "drizzle-orm"

export const revenueOverview = async () => {
    const data = await db.select().from(orders)
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const productsSold = async () => {
    const data = await db.select().from(productsToOrders)
    
    return data.length
}

export const totalExpenses = async () => {
    const data = await db.select().from(expenses)
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const totalCredits = async () => {
    const data = await db.select().from(credits)
    let total = 0
    data.map(entry => {
        total += entry.amount
    })
    return total
}

export const productsQuery = async () => {
    const data = await db.select().from(products)

    return data
}

export const getProduct = async (id: string) => {
    const data = await db.select().from(products).where(eq(products.id, id))

    return data[0]
}

export const getProducts = async () => {
    const data = await db.select().from(products)

    return data
}

export const orderQuery = async () => {
    const data = await db.select().from(orders)

    return data
}

export const expensesQuery = async () => {
    const data = await db.select().from(expenses)

    return data
}

export const creditsQuery = async () => {
    const data = await db.select().from(credits)

    return data
}