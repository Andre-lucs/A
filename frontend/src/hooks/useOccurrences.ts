import { useContext } from "react";
import { OccurrencesContext } from "../contexts/OccurrenceContext";

export function useOccurrence () {
    return useContext(OccurrencesContext);
}