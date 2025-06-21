// This function runs once when the server starts.
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const cron = (await import('node-cron')).default;
        const { autoPostWallpaper } = await import('./actions/wallpaper-actions');
        const { randomInt } = await import('crypto');
        const { setScheduledTimes, getScheduledTimes } = await import('./lib/scheduler-state');

        // --- FOR TESTING: Schedule posts for 2 and 5 minutes from now ---
        const now = new Date();
        const testTime1 = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now
        const testTime2 = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
        
        // This is a special, one-time test schedule.
        const testSchedule = {
            hour1: testTime1.getHours(),
            minute1: testTime1.getMinutes(),
            hour2: testTime2.getHours(),
            minute2: testTime2.getMinutes(),
        };

        // For testing, we need a cron job that runs EVERY MINUTE.
        cron.schedule('* * * * *', async () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinute = currentTime.getMinutes();

            console.log(`[TEST-Scheduler] Minute check. Current local time: ${currentHour}:${currentMinute}.`);

            const isTimeForPost1 = (currentHour === testSchedule.hour1 && currentMinute === testSchedule.minute1);
            const isTimeForPost2 = (currentHour === testSchedule.hour2 && currentMinute === testSchedule.minute2);

            if (isTimeForPost1 || isTimeForPost2) {
                console.log(`[TEST-Scheduler] It's time to post! Triggering wallpaper post.`);
                try {
                    const result = await autoPostWallpaper();
                    if (result.success) {
                        console.log(`[TEST-Scheduler] SUCCESS: Test wallpaper posted.`);
                    } else {
                        console.error(`[TEST-Scheduler] FAILURE: Test post action failed.`);
                    }
                } catch (error) {
                    console.error(`[TEST-Scheduler] CRITICAL FAILURE during test post.`);
                }
            }
        });
        
        // --- FOR TESTING: Schedule a "daily" re-schedule for 7 minutes from now ---
        const rescheduleTime = new Date(now.getTime() + 7 * 60 * 1000); // 7 minutes from now
        const cronPatternForReschedule = `${rescheduleTime.getMinutes()} ${rescheduleTime.getHours()} * * *`;
        
        cron.schedule(cronPatternForReschedule, async () => {
            console.log("[TEST-Scheduler] It's 'midnight'! Regenerating schedule with random times for the 'next day'.");
            const hour1 = randomInt(0, 24);
            let hour2 = randomInt(0, 24);
            while (Math.abs(hour1 - hour2) < 6) {
                hour2 = randomInt(0, 24);
            }
            await setScheduledTimes({ hour1, hour2 });
            console.log("[TEST-Scheduler] New random schedule has been saved. The hourly production checker will now use these times.");
        });

        console.log(`[TEST-Scheduler] Test post 1 scheduled for local time: ${testSchedule.hour1}:${testSchedule.minute1}`);
        console.log(`[TEST-Scheduler] Test post 2 scheduled for local time: ${testSchedule.hour2}:${testSchedule.minute2}`);
        console.log(`[TEST-Scheduler] Daily re-schedule is set for local time: ${rescheduleTime.getHours()}:${rescheduleTime.getMinutes()}`);
    }
}