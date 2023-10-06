import { Map } from "../components/Map"

export function OccurrenceMap () {
    return (
        <div className="bg-slate-300 w-full h-full flex justify-center items-center flex-col gap-3 p-2 ">
            <Map className=" h-96 min-h-full max-w-full"/>
        </div>
    )
}