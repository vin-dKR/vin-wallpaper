import { NextResponse } from 'next/server';
import { getScheduledTimes } from '@/lib/scheduler-state';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Protect this endpoint with the same secret used for cron jobs.
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }
    
    const times = await getScheduledTimes();

    if (times) {
        return NextResponse.json({
            success: true,
            scheduledUTCHours: [times.hour1, times.hour2],
            message: `Posts are scheduled to run at ${times.hour1}:00 and ${times.hour2}:00 UTC.`
        });
    } else {
        // This might happen for a brief moment when the server is first starting up.
        return NextResponse.json({
            success: false,
            error: "The schedule has not been initialized yet. Please try again in a moment."
        }, { status: 503 });
    }
} 