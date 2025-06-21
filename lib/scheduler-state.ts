import { promises as fs } from 'fs';
import path from 'path';

interface ScheduledTimes {
    hour1: number;
    hour2: number;
}

const tmpDir = path.join(process.cwd(), '.tmp');
const scheduleFilePath = path.join(tmpDir, 'schedule.json');

// Helper function to ensure the .tmp directory exists.
async function ensureTmpDirExists() {
    try {
        await fs.mkdir(tmpDir, { recursive: true });
    } catch (error) {
        // This is not critical if it fails, but good to log.
        console.error("Could not create .tmp directory", error);
    }
}

export async function setScheduledTimes(times: ScheduledTimes) {
    await ensureTmpDirExists();
    console.log(`[State] Writing scheduled times to file: ${times.hour1}:00 and ${times.hour2}:00 UTC.`);
    try {
        await fs.writeFile(scheduleFilePath, JSON.stringify(times, null, 2));
    } catch (error) {
        console.error("[State] Failed to write schedule to file:", error);
    }
}

export async function getScheduledTimes(): Promise<ScheduledTimes | null> {
    try {
        const data = await fs.readFile(scheduleFilePath, 'utf-8');
        return JSON.parse(data) as ScheduledTimes;
    } catch (e: unknown) {
        const error = e as { code?: string };
        // If the file doesn't exist, it's not an error, just means it's not set yet.
        if (error.code === 'ENOENT') {
            return null;
        }
        // For other potential errors, log them.
        console.error("[State] Error reading schedule file:", error);
        return null;
    }
} 