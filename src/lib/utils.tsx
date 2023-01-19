import dayjs from 'dayjs';

export const formatDate = (date: number, format: string) => dayjs(date).format(format);