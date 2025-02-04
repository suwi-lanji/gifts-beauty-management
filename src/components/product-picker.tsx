"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogContent } from "./ui/dialog"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Product } from "./products-table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function ProductPicker({ products, selectedValues, setSelectedValues }: { products: Product[], selectedValues: { id: string, quantity: number }[], setSelectedValues: any }) {
    const [open, setOpen] = React.useState(false)

    const toggleValue = (value: { id: string, amount: number }) => {
        const existingProduct = selectedValues.find(item => item.id === value.id);
        if (existingProduct) {
            const newSelected = selectedValues.filter(item => item.id !== value.id);
            setSelectedValues(newSelected);
        } else {
            setSelectedValues([...selectedValues, { id: value.id, quantity: 1, amount: value.amount }]);
        }
    }

    const updateQuantity = (value: string, quantity: number) => {
        const newSelected = selectedValues.map(item => item.id === value ? { ...item, quantity } : item);
        setSelectedValues(newSelected);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between bg-pink-50"
                >
                    {selectedValues.length > 0
                        ? selectedValues
                            .map(({ id, quantity }) => {
                                const product = products.find((product) => product.id === id);
                                return `${product?.name} (${quantity})`;
                            })
                            .join(", ")
                        : "Select products..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-[90%] rounded-xl bg-pink-50">
                <DialogTitle className="sr-only">Select Product</DialogTitle>
                <Command>
                    <CommandInput placeholder="Search product..." />
                    <CommandList>
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup>
                            {products.map((product) => {
                                const selectedProduct = selectedValues.find(item => item.id === product.id);
                                const quantity = selectedProduct ? selectedProduct.quantity : 0;

                                return (
                                    <CommandItem
                                        key={product.id}
                                        value={product.id}
                                        onSelect={() => {
                                            const value = { id: product.id, amount: product.price! }
                                            toggleValue(value)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedProduct
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        <Avatar>
                                            <AvatarImage src={product.image!} />
                                            <AvatarFallback>P</AvatarFallback>
                                        </Avatar>
                                        {product.name}
                                        {selectedProduct && (
                                            <div className="ml-auto flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(product.id, Math.max(1, quantity - 1));
                                                    }}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span>{quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(product.id, quantity + 1);
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <Button onClick={() => setOpen(false)} className="w-fit mx-auto">Done</Button>
            </DialogContent>
        </Dialog>
    )
}