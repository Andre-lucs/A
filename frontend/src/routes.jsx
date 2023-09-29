import {createBrowserRouter} from 'react-router-dom';
import {PoliceOccurrences} from '../src/pages/PoliceOccurrences'
import {CreateOccurrence} from '../src/pages/CreateOccurrence'
import {OccurrenceMap} from '../src/pages/OccurrenceMap'
import {Occurrence} from '../src/pages/Occurrence'
import {RootLayout} from '../src/RootLayout'

export const router = createBrowserRouter([
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