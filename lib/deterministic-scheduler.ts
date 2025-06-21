import { createHmac } from 'crypto';

/**
 * Generates two deterministic, pseudo-random hours for a given day.
 * It uses a HMAC based on the date and a secret, so it will always produce
 * the same two hours for the same day, but different hours for different days.
 * This is a stateless way to handle daily random scheduling.
 * @param date - The current date.
 * @param secret - A persistent secret key.
 * @returns An object with two distinct hours.
 */
export function getDeterministicHours(date: Date, secret: string): { hour1: number, hour2: number } {
    const dayString = date.toISOString().slice(0, 10); // YYYY-MM-DD
    
    // Create a deterministic seed based on the day and secret.
    const hmac = createHmac('sha256', secret);
    hmac.update(dayString);
    const seed = hmac.digest('hex');
    
    // Use the seed to generate two "random" but predictable hours.
    const hour1 = parseInt(seed.substring(0, 2), 16) % 24; // Use first 2 hex chars for hour1
    let hour2 = parseInt(seed.substring(2, 4), 16) % 24; // Use next 2 hex chars for hour2

    // Ensure the hours are distinct and reasonably spaced.
    while (Math.abs(hour1 - hour2) < 6) {
        hour2 = (hour2 + 1) % 24;
    }

    return { hour1, hour2 };
} 