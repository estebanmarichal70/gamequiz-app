import {format, register} from "timeago.js";
import es from "timeago.js/lib/lang/es";

export const timeago = (date) => {
    register('es', es);
    return format(date, 'es');
}