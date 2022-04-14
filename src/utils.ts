import { format as timeAgoFormatter } from 'timeago.js';

type Style = Intl.DateTimeFormatOptions['dateStyle'];

export const formatDate = (date: any, style: Style = 'short') =>
    new Date(date).toLocaleString('en-IN', {
        dateStyle: style,
        timeStyle: style,
    });

export const formatTimeAgo = (date: any) => timeAgoFormatter(date);

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' })
        .format(value)
        .replace(/\$/, '');
