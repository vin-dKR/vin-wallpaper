import { NextResponse } from 'next/server';
import { autoPostWallpaper } from '@/actions/wallpaper-actions';
import { getDeterministicHours } from '@/lib/deterministic-scheduler';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const secretEnv = process.env.CRON_SECRET;

    if (!secretEnv) {
        return NextResponse.json({ success: false, error: 'CRON_SECRET is not set on the server.' }, { status: 500 });
    }

    if (secret !== secretEnv) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const now = new Date();
    const currentHour = now.getUTCHours();
    const { hour1, hour2 } = getDeterministicHours(now, secretEnv);

    console.log(`[CRON] Hourly check. Current UTC Hour: ${currentHour}. Scheduled Hours for today: ${hour1}, ${hour2}.`);

    const shouldPost = (currentHour === hour1 || currentHour === hour2);

    if (shouldPost) {
        console.log(`[CRON] Time matched! Triggering post for ${currentHour}:00 UTC.`);
        const result = await autoPostWallpaper();
        return NextResponse.json(result);
    } else {
        return NextResponse.json({ success: true, message: "Not a scheduled hour to post." });
    }
} 