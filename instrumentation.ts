// This function runs once when the server starts.
export async function register() {
    // We only want to schedule jobs in a production-like environment, not during development builds.
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Dynamically import server-only modules to prevent them from being bundled on the client.
        const cron = (await import('node-cron')).default;
        const { autoPostWallpaper } = await import('./actions/wallpaper-actions');
        const { randomInt } = await import('crypto');
        const { setScheduledTimes } = await import('./lib/scheduler-state');
        
        // --- PRODUCTION LOGIC ---
        
        // 1. Generate two random hours for the day, at least 6 hours apart.
        const hour1 = randomInt(0, 24);
        let hour2 = randomInt(0, 24);
        while (Math.abs(hour1 - hour2) < 6) {
            hour2 = randomInt(0, 24);
        }

        // 2. Store the generated times in our shared state.
        await setScheduledTimes({ hour1, hour2 });

        // 3. Schedule a task to run every hour, at the start of the hour.
        cron.schedule('0 * * * *', async () => {
            const currentHour = new Date().getUTCHours();
            console.log(`[Scheduler] Hourly check. Current UTC hour: ${currentHour}.`);

            // 4. Check if the current hour is one of our scheduled hours.
            if (currentHour === hour1 || currentHour === hour2) {
                console.log(`[Scheduler] It's time to post! Triggering wallpaper post for ${currentHour}:00 UTC.`);
                try {
                    // The internal call does not need a secret.
                    const result = await autoPostWallpaper();
                    if (result.success) {
                        console.log(`[Scheduler] SUCCESS: Wallpaper posted. Tweet ID: ${result.tweetId}`);
                    } else {
                        console.error(`[Scheduler] FAILURE: The post action failed. Reason: ${result.error}`);
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    console.error(`[Scheduler] CRITICAL FAILURE: An unexpected error occurred. Error: ${errorMessage}`);
                }
            }
        });
        

        // --- LOCAL TEST LOGIC (Now disabled) ---
        /*
        console.log('[Scheduler] TEST MODE: Scheduling a one-time post for 1 minute from now.');
        
        const postTime = new Date(new Date().getTime() + 1 * 60 * 1000);
        const minute = postTime.getMinutes();
        const hour = postTime.getHours();
        const cronPattern = `${minute} ${hour} * * *`;

        console.log(`[Scheduler] Test job will run at (local server time): ${hour}:${minute.toString().padStart(2, '0')}`);

        const task = cron.schedule(cronPattern, async () => {
            console.log("[Scheduler] TEST JOB TRIGGERED: It's time to post!");
            try {
                // Correct call with no arguments.
                const result = await autoPostWallpaper();
                if (result.success) {
                    console.log(`[Scheduler] TEST SUCCESS: Wallpaper posted. Tweet ID: ${result.tweetId}`);
                } else {
                    console.error(`[Scheduler] TEST FAILURE: The post action failed. Reason: ${result.error}`);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error(`[Scheduler] TEST CRITICAL FAILURE: An unexpected error occurred. Error: ${errorMessage}`);
            }
            // Stop the task so it doesn't run again tomorrow.
            task.stop();
            console.log('[Scheduler] Test job has run and is now stopped.');
        });
        */
    }
}