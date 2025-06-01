import { TwitterApi } from 'twitter-api-v2';
import { InferenceClient } from '@huggingface/inference';

interface WallpaperPrompt {
    text: string;
    category: string;
}

interface GenerationResult {
    success: boolean;
    imageBuffer?: Buffer;
    prompt?: string;
    error?: string;
}

interface PostResult {
    success: boolean;
    tweetId?: string;
    error?: string;
}

export class WallpaperBot {
    private twitterClient: TwitterApi;
    private inferenceClient: InferenceClient;
    private wallpaperPrompts: WallpaperPrompt[];

    constructor() {
        if (!process.env.TWITTER_API_KEY || !process.env.HUGGINGFACE_TOKEN) {
            throw new Error('Missing required environment variables');
        }

        this.twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY!,
            appSecret: process.env.TWITTER_API_SECRET!,
            accessToken: process.env.TWITTER_ACCESS_TOKEN!,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
        });

        this.inferenceClient = new InferenceClient(process.env.HUGGINGFACE_TOKEN!);
        console.log("HuggingFace Inference Client initialized for black-forest-labs/FLUX.1-dev");

        this.wallpaperPrompts = [
            { text: "stunning mountain landscape at sunset, 4k wallpaper, cinematic lighting", category: "nature" },
            { text: "cyberpunk city skyline at night, neon lights, futuristic wallpaper", category: "cyberpunk" },
            { text: "peaceful forest path with sunlight filtering through trees, nature wallpaper", category: "nature" },
            { text: "abstract geometric patterns, colorful, modern wallpaper design", category: "abstract" },
            { text: "ocean waves crashing on rocks, dramatic sky, landscape wallpaper", category: "nature" },
            { text: "space galaxy with stars and nebula, cosmic wallpaper, deep space", category: "space" },
            { text: "minimalist geometric shapes, clean design, desktop wallpaper", category: "minimal" },
            { text: "tropical beach paradise, palm trees, crystal clear water, vacation wallpaper", category: "nature" },
            { text: "autumn forest with colorful leaves, scenic nature wallpaper", category: "nature" },
            { text: "urban architecture, modern buildings, city wallpaper photography", category: "urban" },
            { text: "northern lights aurora borealis, starry night sky, magical wallpaper", category: "space" },
            { text: "japanese zen garden, peaceful meditation, minimalist wallpaper", category: "minimal" },
        ];
    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private async generateWallpaper(): Promise<GenerationResult> {
        try {
            const promptObj = this.getRandomElement(this.wallpaperPrompts);
            const enhancedPrompt = `${promptObj.text}, portrait wallpaper, high resolution, detailed, professional quality, sharp focus`;
            console.log(`Generating wallpaper with prompt: ${enhancedPrompt}`);

            // Generate image using FLUX.1-dev via fal-ai
            const imageResult = await this.inferenceClient.textToImage({
                provider: "fal-ai",
                model: "black-forest-labs/FLUX.1-dev",
                inputs: enhancedPrompt,
                parameters: {
                    num_inference_steps: 25,
                    guidance_scale: 7.5,
                    width: 1179,
                    height: 2556,
                }
            }) as string | Blob; // Type assertion to handle string or Blob

            let imageBuffer: Buffer;

            // Log the result type and content for debugging
            console.log('Image result type:', typeof imageResult, 'Value:', imageResult);

            if (typeof imageResult === 'string') {
                console.log('Image result is a string, processing...');
                if (imageResult.startsWith('data:image')) {
                    // Handle base64 string
                    const base64Data = imageResult.split(',')[1];
                    imageBuffer = Buffer.from(base64Data, 'base64');
                    console.log('Processed base64 string to Buffer');
                } else if (imageResult.startsWith('http')) {
                    // Handle URL
                    console.log(`Fetching image from URL: ${imageResult}`);
                    const response = await fetch(imageResult, {
                        headers: { 'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}` }
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image from URL: ${response.status} - ${await response.text()}`);
                    }
                    const arrayBuffer = await response.arrayBuffer();
                    imageBuffer = Buffer.from(arrayBuffer);
                    console.log('Fetched and converted URL to Buffer');
                } else {
                    throw new Error('Invalid string format: not a base64 string or URL');
                }
            } else if (imageResult instanceof Blob) {
                // Handle Blob
                console.log('Image result is a Blob, converting to Buffer');
                const arrayBuffer = await imageResult.arrayBuffer();
                imageBuffer = Buffer.from(arrayBuffer);
            } else {
                throw new Error('Unexpected image result type: not a string or Blob');
            }

            return {
                success: true,
                imageBuffer,
                prompt: promptObj.text
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Image generation failed: ${errorMessage}`);
            let detailedError = errorMessage;
            if (errorMessage.includes('401') || errorMessage.includes('403')) {
                detailedError = 'Invalid or unauthorized Hugging Face token. Please check HUGGINGFACE_TOKEN and ensure it has fal-ai access.';
            } else if (errorMessage.includes('429')) {
                detailedError = 'Rate limit exceeded for fal-ai/FLUX.1-dev. Try spacing out requests or upgrading to a paid plan.';
            } else if (errorMessage.includes('503')) {
                detailedError = 'Model black-forest-labs/FLUX.1-dev temporarily unavailable. Retry later or check Hugging Face API status.';
            }
            return {
                success: false,
                error: `Image generation failed for black-forest-labs/FLUX.1-dev: ${detailedError}`
            };
        }
    }

    private createTweetText(): string {
        const hashtags = [
            '#Wallpaper', '#AIArt', '#DigitalArt', '#AIGenerated',
            '#Desktop', '#Background', '#Art', '#AI', '#Tech', '#Creative'
        ];

        const selectedHashtags = hashtags
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 4);

        const hashtagText = selectedHashtags.join(' ');

        const tweetTexts = [
            `Fresh AI-generated wallpaper for your desktop! 🎨✨\n\n${hashtagText}`,
            `New wallpaper drop! Created with AI magic 🖼️🤖\n\n${hashtagText}`,
            `Transform your desktop with this AI masterpiece! 🌟\n\n${hashtagText}`,
            `Daily dose of AI art for your screen! 💻🎨\n\n${hashtagText}`,
            `Fresh wallpaper, hot off the AI press! 🔥\n\n${hashtagText}`,
        ];

        return this.getRandomElement(tweetTexts);
    }

    public async postWallpaper(): Promise<PostResult> {
        try {
            const generationResult = await this.generateWallpaper();

            if (!generationResult.success || !generationResult.imageBuffer) {
                return {
                    success: false,
                    error: generationResult.error || 'Failed to generate wallpaper'
                };
            }

            // Upload media to Twitter
            const mediaId = await this.twitterClient.v1.uploadMedia(generationResult.imageBuffer, {
                mimeType: 'image/jpeg'
            });

            // Create and post tweet
            const tweetText = this.createTweetText();
            const tweet = await this.twitterClient.v2.tweet({
                text: tweetText,
                media: { media_ids: [mediaId] }
            });

            return {
                success: true,
                tweetId: tweet.data?.id
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Post failed: ${errorMessage}`);
            return {
                success: false,
                error: `Post failed: ${errorMessage}`
            };
        }
    }
}
