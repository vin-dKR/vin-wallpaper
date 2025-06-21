import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

/**
 * This function is duplicated from the auto-post route.
 * In a larger app, it would be moved to a shared lib file.
 */
function getDeterministicHours(date: Date, secret: string): { hour1: number, hour2: number } {
    const dayString = date.toISOString().slice(0, 10);
    const hmac = createHmac('sha256', secret);
    hmac.update(dayString);
    const seed = hmac.digest('hex');
    const hour1 = parseInt(seed.substring(0, 2), 16) % 24;
    let hour2 = parseInt(seed.substring(2, 4), 16) % 24;
    while (Math.abs(hour1 - hour2) < 6) {
        hour2 = (hour2 + 1) % 24;
    }
    return { hour1, hour2 };
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const secretEnv = process.env.CRON_SECRET;

    if (!secretEnv) {
        return NextResponse.json({ success: false, error: 'CRON_SECRET is not set on the server.' }, { status: 500 });
    }

    if (secret !== secretEnv) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }
    
    const now = new Date();
    const { hour1, hour2 } = getDeterministicHours(now, secretEnv);

    const calculateRemainingTime = (targetHour: number) => {
        const now = new Date();
        const nextPostDate = new Date();
        nextPostDate.setUTCHours(targetHour, 0, 0, 0);

        // If the target hour has already passed for today, set it for tomorrow.
        if (nextPostDate.getTime() < now.getTime()) {
            nextPostDate.setDate(nextPostDate.getDate() + 1);
        }

        const diff = nextPostDate.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return {
            hours,
            minutes,
            message: `${hours} hours and ${minutes} minutes`
        };
    };

    return NextResponse.json({
        success: true,
        scheduledUTCHours: [hour1, hour2].sort((a, b) => a - b),
        timeRemaining: {
            post1: calculateRemainingTime(hour1),
            post2: calculateRemainingTime(hour2)
        },
        message: `Posts for today are scheduled to run at ${hour1}:00 and ${hour2}:00 UTC.`
    });
} 