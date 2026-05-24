// src/utils/formatDate.ts

export function formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('YYYY')) {
        options.year = 'numeric';
    }
    if (format.includes('MM')) {
        options.month = '2-digit';
    }
    if (format.includes('DD')) {
        options.day = '2-digit';
    }

    return new Intl.DateTimeFormat('ja-JP', options).format(date);
}

export function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('ja-JP', options).format(date);
}