import {createBrowserRouter} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard'
import {CreateOccurrence} from './pages/CreateOccurrence'
import {OccurrenceMap} from './pages/OccurrenceMap'
import {Occurrence} from './pages/Occurrence'
import {DashboardLayout} from './DashboardLayout'
import { UpdateOccurrence } from './pages/UpdateOccurrence';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: 'mapa',
                element: <OccurrenceMap/>
            }, 
        ]
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
])