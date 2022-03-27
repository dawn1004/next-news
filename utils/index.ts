import slugify from "slugify";
import ShortUniqueId from 'short-unique-id';
import moment from "moment";
const uuid = new ShortUniqueId({ length: 8 });

export const generateUniqueSlug = (slug: string): string => {
    return slugify(`${slug}-${uuid()}`, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
    })
}

export const dateFormatter = (date: Date): string => {
    return moment(date).startOf('hour').fromNow()
} 