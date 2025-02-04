export interface CardData {
    title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    content: string,
    description?: string
}
export default function OverviewCard({ data }: { data: CardData }) {
    return (
        <div className="space-y-1 shadow-md border p-2 rounded-xl">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium">{data.title}</p>
                <data.icon className="size-3" />
            </div>
            <div className="">
                <p className="font-medium">{data.content}</p>
            </div>
            <div className="">
                <p className="text-xs text-gray-500 font-medium">{data.description!}</p>
            </div>
        </div>
    )
}