'use server';

import Replicate from 'replicate';

interface Imagen4GenerationResult {
    success: boolean;
    imageUrl?: string;
    prompt?: string;
    error?: string;
}

const VALID_ASPECT_RATIOS = ["1:1", "9:16", "16:9", "3:4", "4:3"];

export async function generateImageWithImagen4(prompt: string, aspectRatio: string): Promise<Imagen4GenerationResult> {
    try {
        const apiKey = process.env.REPLICATE_API_TOKEN;
        if (!apiKey) {
            throw new Error('REPLICATE_API_TOKEN is not configured');
        }
        if (!VALID_ASPECT_RATIOS.includes(aspectRatio)) {
            throw new Error('Invalid aspect ratio');
        }
        const replicate = new Replicate({ auth: apiKey });
        const input = {
            prompt,
            aspect_ratio: aspectRatio,
            safety_filter_level: "block_medium_and_above"
        };
        const output = await replicate.run("google/imagen-4", { input });
        let imageUrl: string | null = null;
        if (Array.isArray(output) && output.length > 0 && typeof output[0] === 'string') {
            imageUrl = output[0];
        } else if (output && typeof output === 'object' && 'url' in output && typeof (output as any).url === 'string') {
            imageUrl = (output as any).url;
        } else if (output && typeof output === 'object' && typeof (output as any).url === 'function') {
            imageUrl = (output as any).url();
        }
        if (!imageUrl || typeof imageUrl !== 'string') {
            throw new Error('Invalid image URL in Replicate response');
        }
        return {
            success: true,
            imageUrl,
            prompt
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            error: `Imagen-4 generation failed: ${errorMessage}`
        };
    }
} 