export function Graphics () {
    return (
        <div className="p-2 flex flex-col gap-2" id="cy-graphics">
            <div className="flex gap-2">
                <iframe width="355" height="250" className="bg-white rounded shadow" src="https://charts.mongodb.com/charts-project-0-ctvan/embed/charts?id=6544f2db-903f-4ac6-89db-5ccc49b325ff&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                <iframe width="350" height="250" className="bg-white rounded shadow" src="https://charts.mongodb.com/charts-project-0-ctvan/embed/charts?id=6544f5c8-419c-411e-8fa1-fef75714810d&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            </div>
            <iframe
             width="710" 
             height="200" 
             className="bg-white rounded shadow"
             src="https://charts.mongodb.com/charts-project-0-ctvan/embed/charts?id=6544f79e-085c-473a-8a2b-f54af70a4482&maxDataAge=3600&theme=light&autoRefresh=true">
             </iframe>
        </div>
    )
}