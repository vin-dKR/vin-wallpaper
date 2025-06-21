'use server';

import { WallpaperBot } from '@/lib/twitter-bot';

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

export async function autoPostWallpaper() {
    console.log('[Action] autoPostWallpaper action initiated.');
    try {
        const bot = new WallpaperBot();
        const result = await bot.postWallpaper();

        if (result.success) {
            console.log(`[Action] autoPostWallpaper action successful. Tweet ID: ${result.tweetId}`);
            return {
                success: true,
                message: 'Auto-post successful',
                tweetId: result.tweetId,
                timestamp: new Date().toISOString(),
            };
        } else {
            console.error(`[Action] autoPostWallpaper action failed:`, result.error);
            return {
                success: false,
                error: result.error || 'Failed to auto-post wallpaper',
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[Action] CRITICAL ERROR in autoPostWallpaper action: ${errorMessage}`);
        return {
            success: false,
            error: errorMessage,
        };
    }
}
