import {createBrowserRouter} from 'react-router-dom';
import {PoliceOccurrences} from './pages/PoliceOccurrences'
import {CreateOccurrence} from './pages/CreateOccurrence'
import {OccurrenceMap} from './pages/OccurrenceMap'
import {Occurrence} from './pages/Occurrence'
import {RootLayout} from './RootLayout'
import { UpdateOccurrence } from './pages/UpdateOccurrence';

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
                path: 'ocorrencia/:idOccurrence',
                element: <Occurrence/>
            }, 
            {
                path: 'atualizar-ocorrencia/:idOccurrence',
                element: <UpdateOccurrence/>
            }
        ]
    }
])