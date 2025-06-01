'use client';

import { useState } from 'react';
import { postWallpaper } from '@/actions/wallpaper-actions';

export function useWallpaper() {
    const [isPosting, setIsPosting] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message?: string;
        tweetId?: string;
        error?: string;
    } | null>(null);

    const handlePostWallpaper = async () => {
        setIsPosting(true);
        setResult(null);

        try {
            const response = await postWallpaper();
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                error: 'Network error occurred',
            });
        } finally {
            setIsPosting(false);
        }
    };

    return {
        isPosting,
        result,
        postWallpaper: handlePostWallpaper,
    };
}
