export default function getDateNow(date = new Date()) {
    
    return ((date.getMonth() + 1) < 10 ? "0" : "") +
        (date.getMonth() + 1).toString() + "-" + date.getDate().toString()
        + "-" + date.getFullYear().toString();
}