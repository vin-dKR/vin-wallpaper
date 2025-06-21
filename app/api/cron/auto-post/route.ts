import { NextResponse } from 'next/server';
import { autoPostWallpaper, getScheduledTimes } from '@/actions/wallpaper-actions';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cronSecret = searchParams.get('secret');

    // Always check for the secret first.
    if (cronSecret !== process.env.CRON_SECRET) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized or missing cron secret' },
            { status: 401 }
        );
    }

    const times = await getScheduledTimes();
    const currentHour = new Date().getUTCHours();

    console.log(`[CRON] Hourly check. Current UTC Hour: ${currentHour}. Scheduled Hours: ${times.hour1}, ${times.hour2}.`);

    // Check if the current hour matches either of the scheduled hours.
    const shouldPost = (currentHour === times.hour1 || currentHour === times.hour2);

    if (shouldPost) {
        console.log(`[CRON] Time matched (${currentHour}:00 UTC). Attempting to post wallpaper...`);
        try {
            const result = await autoPostWallpaper(cronSecret);

            if (result.success) {
                console.log(`[CRON] SUCCESS: Wallpaper posted successfully. Tweet ID: ${result.tweetId}`);
            } else {
                console.error(`[CRON] FAILURE: The autoPostWallpaper action failed. Reason: ${result.error}`);
            }
            return NextResponse.json(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error during post attempt';
            console.error(`[CRON] CRITICAL FAILURE: An unexpected error occurred. Error: ${errorMessage}`);
            return NextResponse.json(
                { success: false, error: `Critical error during auto-post: ${errorMessage}` },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json({ success: true, message: "Not a scheduled hour to post." });
    }
}