import { TwitterApi } from 'twitter-api-v2';
import Replicate from 'replicate';
import sharp from 'sharp';

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
    private replicate: Replicate;
    private wallpaperPrompts: WallpaperPrompt[];

    constructor() {
        if (!process.env.TWITTER_API_KEY || !process.env.REPLICATE_API_TOKEN) {
            throw new Error('Missing required environment variables');
        }

        this.twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY!,
            appSecret: process.env.TWITTER_API_SECRET!,
            accessToken: process.env.TWITTER_ACCESS_TOKEN!,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
        });

        this.replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN!,
        });

        this.wallpaperPrompts = [
            { text: "iridescent alien forest with glowing mushrooms and floating orbs, ethereal 4k mobile wallpaper", category: "surreal" },
            { text: "neon-infused samurai duel under a blood-red moon, dynamic cyberpunk mobile wallpaper", category: "cyberpunk" },
            { text: "interstellar aurora borealis swirling around a black hole, cosmic 4k mobile wallpaper", category: "space" },
            { text: "mythical ice dragon weaving through a neon-frosted tundra, epic 4k mobile wallpaper", category: "fantasy" },
            { text: "vibrant glitch mandala with pulsating neon patterns, hypnotic 4k mobile wallpaper", category: "abstract" },
            { text: "retro synthwave beach with glowing palm trees and a pixelated sunset, vibrant mobile wallpaper", category: "retro" },
            { text: "surreal neon labyrinth with floating mirrors and glowing vines, ultra-detailed 4k mobile wallpaper", category: "surreal" },
            { text: "cybernetic phoenix in a holographic data storm, futuristic 4k mobile wallpaper", category: "cyberpunk" },
            { text: "cosmic kaleidoscope of glowing comets and fractal stars, vibrant 4k mobile wallpaper", category: "space" },
            { text: "enchanted neon cherry blossom forest with glowing petals, dreamy 4k mobile wallpaper", category: "fantasy" },
            { text: "digital mosaic of neon waves crashing on a pixel shore, bold 4k mobile wallpaper", category: "abstract" },
            { text: "vaporwave arcade city with glowing retro signs and pastel holograms, vibrant mobile wallpaper", category: "retro" }
        ]
    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private async generateWallpaper(): Promise<GenerationResult> {
        try {
            const promptObj = this.getRandomElement(this.wallpaperPrompts);
            const enhancedPrompt = `${promptObj.text}, high resolution, detailed, professional quality, sharp focus`;
            console.log(`Generating wallpaper with prompt: ${enhancedPrompt}`);

            // Generate image using Stable Diffusion via Replicate
            const output = await this.replicate.run(
                "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
                {
                    input: {
                        prompt: enhancedPrompt,
                        width: 1080,
                        height: 2400,
                        num_outputs: 1,
                        scheduler: "K_EULER",
                        num_inference_steps: 50,
                        guidance_scale: 7.5,
                        refine: "expert_ensemble_refiner",
                        high_noise_frac: 0.8,
                    }
                }
            );

            if (!output || !Array.isArray(output) || output.length === 0) {
                throw new Error('No image generated');
            }

            const imageUrl = output[0];
            console.log('Generated image URL:', imageUrl);

            // Download the image
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            let imageBuffer = Buffer.from(arrayBuffer) as Buffer;

            // Ensure image is exactly 1080x2400 using sharp
            imageBuffer = await sharp(imageBuffer)
                .resize({
                    width: 1080,
                    height: 2400,
                    fit: 'cover',
                    position: 'center'
                })
                .jpeg({ quality: 90 })
                .toBuffer();

            console.log('Image resized to 1080x2400 for mobile wallpaper');

            return {
                success: true,
                imageBuffer,
                prompt: promptObj.text
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Image generation failed: ${errorMessage}`);
            return {
                success: false,
                error: `Image generation failed: ${errorMessage}`
            };
        }
    }

    private createTweetText(): string {
        const hashtags = [
            '#MobileWallpaper', '#AIArt', '#DigitalArt', '#AIGenerated',
            '#PhoneWallpaper', '#Background', '#Art', '#AI', '#Tech', '#Creative'
        ];

        const selectedHashtags = hashtags
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 4);

        const hashtagText = selectedHashtags.join(' ');

        const tweetTexts = [
            `Insane AI-generated mobile wallpaper! 📱🔥\n\n${hashtagText}`,
            `New crazy phone wallpaper drop! Created with AI magic 🎨🤖\n\n${hashtagText}`,
            `Transform your phone with this wild AI masterpiece! 🌟\n\n${hashtagText}`,
            `Epic AI art for your mobile screen! 💥📱\n\n${hashtagText}`,
            `Fresh, bold wallpaper for your phone! 🔥\n\n${hashtagText}`,
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
