import { NextResponse } from 'next/server';
import { autoPostWallpaper, getScheduledTimes } from '@/actions/wallpaper-actions';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cronSecret = searchParams.get('secret');
    const checkSchedule = searchParams.get('check') === 'true';

    if (checkSchedule) {
        const times = await getScheduledTimes();
        return NextResponse.json({
            success: true,
            scheduledTimes: {
                firstPost: `${times.hour1}:00`,
                secondPost: `${times.hour2}:00`
            }
        });
    }

    if (!cronSecret) {
        return NextResponse.json(
            { success: false, error: 'Missing cron secret' },
            { status: 401 }
        );
    }

    const result = await autoPostWallpaper(cronSecret);
    return NextResponse.json(result);
} 