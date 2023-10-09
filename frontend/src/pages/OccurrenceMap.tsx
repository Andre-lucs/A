import { Map } from "../components/Map";
import { Card } from "../components/Card";
import { useState } from "react";

export function OccurrenceMap () {

    const [isDisplay, setIsDisplay] = useState(false);
    const [occurrenceInfo, setOccurenceInfo] = useState({id: 0, title: '', date: '', description: ''});


    function handleMarkerClick (occurrenceInfoEv: {id:number, description: string, date: string, title: string}) {
        setOccurenceInfo(occurrenceInfoEv)
        setIsDisplay(true);
    }

    function handleClickCard () {
        setIsDisplay(false);
    }

    return (
        <div className=" w-full h-full flex flex-col p-2 ">
            <Card isDisplay={isDisplay} 
                  title={occurrenceInfo.title} 
                  description={occurrenceInfo.description} 
                  id={occurrenceInfo.id}
                  date={occurrenceInfo.date}
                  handleClick={handleClickCard}
                />
            <Map className=" h-96 min-h-full max-w-full" handleClick={handleMarkerClick}/>
        </div>
    )
}