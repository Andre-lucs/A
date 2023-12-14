
type DashboardInshightProps = {
    title: string,
    amount: number,
    id: string
}

export function DashboardInshight ({title, amount, id}: DashboardInshightProps) {
    return (
        <div className="flex flex-col gap-2 shadow p-3 w-40 bg-white rounded">
            <span id={`${id}-title`}>{title}</span>
            <span className="text-center text-3xl font-semibold text-blue-500" id={id}>{amount}</span>
        </div>
    )
}