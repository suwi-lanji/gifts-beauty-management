"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/date-picker"
import { products } from "@/server/db/schema"
import { ProductPicker } from "@/components/product-picker"
import { Product } from "@/components/products-table"
import { createOrder } from "@/lib/actions"

const formSchema = z.object({
    amount: z.number(),
    date: z.date(),
    products: z.array(z.object({
        id: z.string(),
        amount: z.number(),
        quantity: z.number()
    }))
})

export default function OrderCreateForm({ products }: { products: Product[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            date: new Date(),
            products: []
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        createOrder(values)
        window.location.href = "/orders"
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type={'number'}
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="grid">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker date={field.value} setDate={(date: Date) => field.onChange(date)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                        <FormItem className="grid">
                            <FormLabel>Products</FormLabel>
                            <FormControl>
                                <ProductPicker selectedValues={field.value} setSelectedValues={(data: any) => {
                                    field.onChange(data)
                                    let total = 0
                                    data.map((entry: any) => total += (entry.amount * entry.quantity))
                                    form.setValue("amount", total)
                                }} products={products} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export { formSchema as OrderSchema }