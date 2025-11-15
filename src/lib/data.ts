import { type ChartData, type AttendanceRecord } from '@/lib/types'
import { format } from 'date-fns'

export async function getChartData(records: AttendanceRecord[]): Promise<ChartData[]> {
    const dataByDate: { [key: string]: { Present: number; Absent: number } } = {};

    records.filter(r => r.status === 'Present' || r.status === 'Absent').forEach(record => {
        const date = format(new Date(record.date), 'MMM d');
        if (!dataByDate[date]) {
            dataByDate[date] = { Present: 0, Absent: 0 };
        }
        if (record.status === 'Present') {
            dataByDate[date].Present++;
        } else if (record.status === 'Absent') {
            dataByDate[date].Absent++;
        }
    });

    return Object.entries(dataByDate)
      .map(([date, counts]) => ({
          date,
          ...counts,
      }))
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7); // Last 7 days
}
