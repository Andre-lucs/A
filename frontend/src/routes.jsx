import {createBrowserRouter} from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <PoliceOccurrences/>
            },
            {
                path: 'mapa',
                element: <OccurrenceMap/>
            }, 
            {
                path: 'criar-ocorrencia',
                element: <CreateOccurrence/>
            }, 
            {
                path: 'ocorrencia/:id',
                element: <Occurrence/>
            }
        ]
    }
])