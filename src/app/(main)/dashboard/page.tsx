import OverviewCard from "@/components/overview-card";
import { productsSold, revenueOverview, totalCredits, totalExpenses } from "@/lib/query";
import { Boxes, CreditCard, DollarSign, HandCoins } from "lucide-react";


export const dynamic = 'force-dynamic'
export default async function Page() {

    const revenueData = await revenueOverview();
    const _productsSold: number = await productsSold();
    const _totalExpenses: number = await totalExpenses();
    const _totalCredits: number = await totalCredits()
    return (
        <div className="grid gap-10">
            <div className="grid grid-cols-2 gap-4">
                <OverviewCard data={{ title: "Total revnue", icon: DollarSign, content: `K${revenueData}` }} />
                <OverviewCard data={{ title: "Products sold", icon: Boxes, content: `+${_productsSold}` }} />
                <OverviewCard data={{ title: "Total expenses", icon: CreditCard, content: `K${_totalExpenses}` }} />
                <OverviewCard data={{ title: "Total credits", icon: HandCoins, content: `K${_totalCredits}` }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <OverviewCard data={{ title: "Revenue this month", icon: DollarSign, content: `K${revenueData}` }} />
                <OverviewCard data={{ title: "Products sold this month", icon: Boxes, content: `+${_productsSold}` }} />
                <OverviewCard data={{ title: "Expenses this month", icon: CreditCard, content: `K${_totalExpenses}` }} />
                <OverviewCard data={{ title: "Credits this month", icon: HandCoins, content: `K${_totalCredits}` }} />
            </div>
        </div>
    )
}