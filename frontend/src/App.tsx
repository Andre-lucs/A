import {RouterProvider} from 'react-router-dom'
import {router} from '../src/routes'
import { OccurrenceProvider } from './contexts/OccurrenceContext';
import "./index.css"

export default function App() {
 return (
  <OccurrenceProvider>
      <RouterProvider router={router}/>;
  </OccurrenceProvider>
 )  
}