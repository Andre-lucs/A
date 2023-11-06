import moment from "moment";

export function useDateTime () {
    const formatDateTime = (dateTimeString: string): {date: string, time: string} => {
        const dateTime = moment(dateTimeString);
        const formattedDate = dateTime.format('DD/MM/YYYY');
        const formattedTime = dateTime.format('HH:mm');
        return {date: formattedDate, time: formattedTime};
    }
    return {formatDateTime};
}

export function calculateRecentsOccurences (date: string) {
    const currentDate = moment(moment().format("YYYY-MM-DD"));
    return currentDate.diff(moment(date), "days");
}