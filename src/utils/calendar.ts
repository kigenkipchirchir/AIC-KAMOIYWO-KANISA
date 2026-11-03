import { ChurchEvent } from '../types/church';

export function createGoogleCalendarUrl(event: ChurchEvent): string {
  // Assume start date at 10:00 AM local East Africa Time (UTC+3)
  const [year, month, day] = event.startDate.split('-').map(Number);
  const startHours = 10;
  const startMinutes = 0;
  
  // Format for Google Calendar: YYYYMMDDTHHmmssZ
  // Kenya is UTC+3, so UTC is -3 hours
  const startUtc = new Date(Date.UTC(year, month - 1, day, startHours - 3, startMinutes, 0));
  const endUtc = new Date(startUtc.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

  const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const datesParam = `${formatUtc(startUtc)}/${formatUtc(endUtc)}`;
  const titleParam = encodeURIComponent(`${event.title} - AIC Kamoiywo`);
  const detailsParam = encodeURIComponent(`${event.description}\n\nPreacher/Speaker: ${event.speaker || 'Pastoral Team'}\nHost: AIC Kamoiywo Church, Nandi County`);
  const locationParam = encodeURIComponent(`${event.location}, Kamoiywo, Nandi County, Kenya`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleParam}&dates=${datesParam}&details=${detailsParam}&location=${locationParam}`;
}

export function downloadIcsFile(event: ChurchEvent): void {
  const [year, month, day] = event.startDate.split('-').map(Number);
  const startHours = 10;
  const startMinutes = 0;
  const startUtc = new Date(Date.UTC(year, month - 1, day, startHours - 3, startMinutes, 0));
  const endUtc = new Date(startUtc.getTime() + 3 * 60 * 60 * 1000);

  const formatIcsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AIC Kamoiywo Church//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-${Date.now()}@aickamoiywo.org`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startUtc)}`,
    `DTEND:${formatIcsDate(endUtc)}`,
    `SUMMARY:${event.title} - AIC Kamoiywo Church`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}, Kamoiywo, Nandi County, Kenya`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-aic-kamoiywo.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
