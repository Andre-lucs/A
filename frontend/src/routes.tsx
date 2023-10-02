import {createBrowserRouter} from 'react-router-dom';
import {PoliceOccurrences} from './pages/PoliceOccurrences'
import {CreateOccurrence} from './pages/CreateOccurrence'
import {OccurrenceMap} from './pages/OccurrenceMap'
import {Occurrence} from './pages/Occurrence'
import {RootLayout} from './RootLayout'

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