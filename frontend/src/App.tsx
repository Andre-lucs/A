import {RouterProvider} from 'react-router-dom'
import {router} from '../src/routes'
import { OccurrenceProvider } from './contexts/OccurrenceContext';


export default function App() {

  
  return (
      <OccurrenceProvider>
          <RouterProvider router={router}/>;
      </OccurrenceProvider>
  )  
}