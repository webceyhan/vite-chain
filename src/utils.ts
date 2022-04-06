import { format as timeAgoFormatter } from 'timeago.js';

export const formatDate = (date: any) => new Date(date).toLocaleString();

export const formatTimeAgo = (date: any) => timeAgoFormatter(date);

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' })
        .format(value)
        .replace(/\$/, '');
