
type DashboardInshightProps = {
    title: string,
    amount: number
}

export function DashboardInshight ({title, amount}: DashboardInshightProps) {
    return (
        <div className="flex flex-col gap-2 shadow p-3 w-40 bg-white rounded">
            <span>{title}</span>
            <span className="text-center text-3xl font-semibold text-blue-500">{amount}</span>
        </div>
    )
}