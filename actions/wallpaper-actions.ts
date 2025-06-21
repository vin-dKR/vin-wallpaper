'use server';

import { WallpaperBot } from '@/lib/twitter-bot';
import { randomInt } from 'crypto';

function generateRandomTimes(): { hour1: number; hour2: number } {
    // Generate two random hours between 0-23, ensuring they're at least 6 hours apart
    let hour1 = randomInt(0, 24);
    let hour2 = randomInt(0, 24);
    
    while (Math.abs(hour1 - hour2) < 6) {
        hour2 = randomInt(0, 24);
    }
    
    return { hour1, hour2 };
}

let scheduledTimes: { hour1: number; hour2: number; } | null = null;

export async function getScheduledTimes() {
    if (!scheduledTimes) {
        scheduledTimes = generateRandomTimes();
        console.log(`[SCHEDULER] New random schedule set for (UTC): ${scheduledTimes.hour1}:00 and ${scheduledTimes.hour2}:00`);
    }
    return scheduledTimes;
}

export async function postWallpaper() {
    try {
        const bot = new WallpaperBot();
        const result = await bot.postWallpaper();

        if (result.success) {
            return {
                success: true,
                message: 'Wallpaper posted successfully',
                tweetId: result.tweetId,
            };
        } else {
            return {
                success: false,
                error: result.error || 'Failed to post wallpaper',
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

export async function autoPostWallpaper(cronSecret: string) {
    if (cronSecret !== process.env.CRON_SECRET) {
        return {
            success: false,
            error: 'Unauthorized',
        };
    }

    try {
        const bot = new WallpaperBot();
        const result = await bot.postWallpaper();

        if (result.success) {
            console.log(`Auto-posted wallpaper: ${result.tweetId}`);
            return {
                success: true,
                message: 'Auto-post successful',
                tweetId: result.tweetId,
                timestamp: new Date().toISOString(),
            };
        } else {
            console.error('Auto-post failed:', result.error);
            return {
                success: false,
                error: result.error || 'Failed to auto-post wallpaper',
            };
        }
    } catch (error) {
        console.error('Auto-post error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
