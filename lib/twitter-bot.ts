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
            // 🌸 Beautiful Girls (Realistic, Aesthetic)
            { text: "portrait of a beautiful woman, soft lighting, pastel colors, ultra-clear focus, aesthetic composition, elegant pose, 8k", category: "beautiful-girls" },
            { text: "close-up of a serene woman in a field of flowers, golden hour, warm tones, natural makeup, dreamy atmosphere, bokeh, 4k", category: "beautiful-girls" },
            { text: "girl with flowing hair standing on a beach during sunset, cinematic lighting, peaceful expression, highly detailed, 4k", category: "beautiful-girls" },
            { text: "mystical girl in a forest with glowing lights, fantasy vibe, ethereal lighting, soft tones, ultra HD", category: "beautiful-girls" },

            // 🎨 Anime
            { text: "anime girl looking at stars, neon-lit cityscape, soft shading, high contrast, 4k anime art style, clear focus", category: "anime" },
            { text: "anime couple holding hands under cherry blossoms, spring vibes, cinematic blur, aesthetic color palette, 4k", category: "anime" },
            { text: "anime-style warrior girl with glowing sword, clean cyberpunk background, detailed armor, high definition", category: "anime" },
            { text: "studio Ghibli-inspired scenery with anime girl, peaceful village, vivid color scheme, soft brush strokes", category: "anime" },

            // 🦸 MCU-Inspired
            { text: "heroic character standing on rooftop, city behind them, inspired by MCU tone, dramatic lighting, cinematic wallpaper, 4k", category: "mcu" },
            { text: "futuristic armor glowing with power, sleek design, Marvel superhero vibes, dark background, high resolution", category: "mcu" },
            { text: "mysterious female vigilante in silhouette, neon cityscape, MCU inspired, sharp contrast, minimalist style", category: "mcu" },
            { text: "aesthetic portrait of a superhero girl with wind in hair, dynamic pose, inspired by Marvel look, ultra-detailed", category: "mcu" },

            // 📸 Aesthetic Photography
            { text: "aesthetic photo of coffee and book near window, moody lighting, cozy vibe, high detail, clean composition", category: "aesthetic-photo" },
            { text: "minimalist sunset over calm lake, pastel sky, symmetrical composition, peaceful aesthetic, ultra clear", category: "aesthetic-photo" },
            { text: "girl walking through empty street at dusk, aesthetic outfit, bokeh lights, city vibe, cinematic framing", category: "aesthetic-photo" },
            { text: "top-down shot of organized desk setup, soft light, neutral tones, aesthetic workspace, crisp quality", category: "aesthetic-photo" },

            // 🧘 General Aesthetic & Clean Prompts
            { text: "surreal dreamscape with floating islands, vivid colors, clean rendering, perfect symmetry, 4k fantasy art", category: "aesthetic" },
            { text: "elegant landscape with soft gradients and clouds, simple color palette, calming tones, minimalism", category: "aesthetic" },
            { text: "nature scene with flowers, butterflies, and sunlight, high clarity, warm tones, smooth details", category: "aesthetic" },
            { text: "ultra-aesthetic abstract waves in pastel tones, 3D render style, smooth gradients, ultra HD", category: "aesthetic" }
        ];

    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private async generateWallpaper(): Promise<GenerationResult> {
        console.log('[Bot] --- Starting Wallpaper Generation ---');
        try {
            const promptObj = this.getRandomElement(this.wallpaperPrompts);
            const enhancedPrompt = `${promptObj.text}, high resolution, detailed, professional quality, sharp focus`;
            console.log(`[Bot] Selected prompt category: ${promptObj.category}`);
            console.log(`[Bot] Generating wallpaper with full prompt: "${enhancedPrompt}"`);

            // Generate image using Stable Diffusion via Replicate
            console.log('[Bot] Sending request to Replicate API...');
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
            ) as string[];

            if (!output || !Array.isArray(output) || output.length === 0) {
                throw new Error('No image generated by Replicate');
            }

            const imageUrl = output[0];
            console.log(`[Bot] Successfully received image URL from Replicate: ${imageUrl}`);

            // Download the image
            console.log('[Bot] Downloading generated image...');
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            let imageBuffer = Buffer.from(arrayBuffer) as Buffer;
            console.log('[Bot] Image downloaded successfully.');

            // Ensure image is exactly 1080x2400 using sharp
            console.log('[Bot] Resizing and optimizing image for mobile wallpaper...');
            imageBuffer = await sharp(imageBuffer)
                .resize({
                    width: 1080,
                    height: 2400,
                    fit: 'cover',
                    position: 'center'
                })
                .jpeg({ quality: 90 })
                .toBuffer();

            console.log('[Bot] Image processing complete.');
            console.log('[Bot] --- Wallpaper Generation Successful ---');

            return {
                success: true,
                imageBuffer,
                prompt: promptObj.text
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`[Bot] ERROR in generateWallpaper: ${errorMessage}`);
            console.log('[Bot] --- Wallpaper Generation Failed ---');
            return {
                success: false,
                error: `Image generation failed: ${errorMessage}`
            };
        }
    }

    private createTweetText(): string {
        console.log('[Bot] Creating tweet text...');
        const hashtags = [
            '#MobileWallpaper', '#AIArt', '#DigitalArt', '#AIGenerated',
            '#PhoneWallpaper', '#Background', '#Art', '#AI', '#Tech', '#Creative'
        ];

        const selectedHashtags = hashtags
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 4);

        const hashtagText = selectedHashtags.join(' ');
        console.log(`[Bot] Selected hashtags: ${hashtagText}`);

        const tweetTexts = [
            `Insane AI-generated mobile wallpaper! 📱🔥\n\n${hashtagText}`,
            `New crazy phone wallpaper drop! Created with AI magic 🎨🤖\n\n${hashtagText}`,
            `Transform your phone with this wild AI masterpiece! 🌟\n\n${hashtagText}`,
            `Epic AI art for your mobile screen! 💥📱\n\n${hashtagText}`,
            `Fresh, bold wallpaper for your phone! 🔥\n\n${hashtagText}`,
        ];

        const finalTweet = this.getRandomElement(tweetTexts);
        console.log('[Bot] Final tweet text created.');
        return finalTweet;
    }

    public async postWallpaper(): Promise<PostResult> {
        console.log('[Bot] +++ Starting Full Post Workflow +++');
        try {
            const generationResult = await this.generateWallpaper();

            if (!generationResult.success || !generationResult.imageBuffer) {
                console.error('[Bot] Aborting post: Wallpaper generation failed.');
                return {
                    success: false,
                    error: generationResult.error || 'Failed to generate wallpaper'
                };
            }

            // Upload media to Twitter
            console.log('[Bot] Uploading media to Twitter...');
            const mediaId = await this.twitterClient.v1.uploadMedia(generationResult.imageBuffer, {
                mimeType: 'image/jpeg'
            });
            console.log(`[Bot] Media uploaded successfully. Media ID: ${mediaId}`);

            // Create and post tweet
            const tweetText = this.createTweetText();
            console.log('[Bot] Posting tweet to Twitter...');
            const tweet = await this.twitterClient.v2.tweet({
                text: tweetText,
                media: { media_ids: [mediaId] }
            });
            console.log(`[Bot] Tweet posted successfully! Tweet ID: ${tweet.data?.id}`);
            console.log('[Bot] +++ Full Post Workflow Successful +++');

            return {
                success: true,
                tweetId: tweet.data?.id
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`[Bot] CRITICAL ERROR in postWallpaper workflow: ${errorMessage}`);
            console.log('[Bot] +++ Full Post Workflow Failed +++');
            return {
                success: false,
                error: `Post failed: ${errorMessage}`
            };
        }
    }
}
