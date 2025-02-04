"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/date-picker"
import { createExpense } from "@/lib/actions"


const formSchema = z.object({
    name: z.string(),
    category: z.string(),
    amount: z.number(),
    date: z.date(),
})

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            amount: 0,
            date: new Date()
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createExpense(values)
        window.location.href = "/expenses"
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg mx-auto">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expense name</FormLabel>
                            <FormControl>
                                <Input placeholder="Expense name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Expense Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Rent">Rent</SelectItem>
                                        <SelectItem value="Utilities and bills">Utilities and bills</SelectItem>
                                        <SelectItem value="Salaries">Salaries</SelectItem>
                                        <SelectItem value="Supplies">Supplies</SelectItem>
                                        <SelectItem value="Shipping and Delivery">Shipping and delivery</SelectItem>
                                        <SelectItem value="Stationary">Stationary</SelectItem>
                                        <SelectItem value="Discount">Discount</SelectItem>
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export { formSchema as ExpenseSchema }