import { useOccurrence } from "../hooks/useOccurrences";
import { DashboardInshight } from "./DashboardInshight";
import { calculateRecentsOccurences } from "../hooks/useDateTime";

export function DashboardOverview () {
    const {occurrences} = useOccurrence();

    const lastWeekDays = occurrences.filter(occurence => calculateRecentsOccurences(occurence.date) <= 7).length;
    const lastFifteenDays = occurrences.filter(occurrence => calculateRecentsOccurences(occurrence.date) <= 15).length;
    const lastThirstDays = occurrences.filter(occurrence => calculateRecentsOccurences(occurrence.date) <= 30).length;

    return (
        <div className="flex gap-2 flex-col">
            <div className="flex justify-between ml-3">
                <DashboardInshight title="Últimos 7 dias:" amount={lastWeekDays} id="cy-last-7"/>
                <DashboardInshight title="Últimos 15 dias:" amount={lastFifteenDays} id="cy-last-15"/>
                <DashboardInshight title="Últimos 30 dias:" amount={lastThirstDays} id="cy-last-30"/>
            </div>
            <div className="flex gap-6 shadow items-center px-2 py-1 w-full ml-2 mr-3 my-1 rounded bg-white">
                <span className="text-xl">Total:</span>
                <span className=" text-xl font-semibold text-blue-500" id="cy-occurrences-amount">{occurrences.length}</span>
                </div>
            </div>
    )
}