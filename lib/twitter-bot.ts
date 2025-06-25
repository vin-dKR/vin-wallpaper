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
            userAgent: 'https://www.npmjs.com/package/create-replicate'
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
            { text: "ultra-aesthetic abstract waves in pastel tones, 3D render style, smooth gradients, ultra HD", category: "aesthetic" },

            // 🚗 Cars
            { text: "sleek sports car speeding down neon-lit highway, cyberpunk city, reflections on wet asphalt, dynamic angle, 8k", category: "cars" },
            { text: "classic vintage car parked under streetlights, rainy night, moody atmosphere, cinematic composition, high detail", category: "cars" },
            { text: "off-road SUV on mountain trail, dramatic clouds, rugged landscape, adventure vibe, ultra HD", category: "cars" },

            // 🌺 Flowers
            { text: "macro shot of dew-covered rose petals, soft morning light, vibrant colors, dreamy bokeh, 4k", category: "flowers" },
            { text: "field of wildflowers swaying in breeze, golden hour, pastel tones, serene landscape, ultra-clear focus", category: "flowers" },
            { text: "abstract floral arrangement, bold colors, modern art style, clean white background, high resolution", category: "flowers" },

            // 🌲 Surreal Nature
            { text: "giant glowing mushrooms in enchanted forest, misty light rays, fantasy atmosphere, vivid colors, 4k", category: "surreal-nature" },
            { text: "floating mountains above crystal lake, surreal sky, magical realism, ultra-detailed, dreamlike composition", category: "surreal-nature" },
            { text: "bioluminescent plants in alien jungle, neon hues, mysterious vibe, cinematic lighting, ultra HD", category: "surreal-nature" },

            // 🎬 Movies
            { text: "cinematic scene inspired by classic sci-fi film, dramatic lighting, futuristic cityscape, high contrast, 4k", category: "movies" },
            { text: "noir detective in rain-soaked alley, vintage film style, moody black and white, atmospheric composition", category: "movies" },
            { text: "epic fantasy battle at sunset, sweeping landscape, heroic characters, rich colors, movie poster style", category: "movies" },

            // 🐾 Animals
            { text: "majestic tiger in misty jungle, piercing eyes, detailed fur, dramatic lighting, ultra-realistic, 8k", category: "animals" },
            { text: "playful kittens in sunlit room, soft focus, cozy vibe, pastel colors, high detail", category: "animals" },
            { text: "owl in flight under starry sky, wings spread, mystical aura, night photography style, crisp clarity", category: "animals" },

            // ☁️ Clouds
            { text: "dramatic thunderstorm clouds over open field, lightning in distance, high contrast, moody atmosphere, 4k", category: "clouds" },
            { text: "cotton candy clouds at sunrise, pastel sky, dreamy mood, soft gradients, ultra clear", category: "clouds" },
            { text: "surreal floating islands among clouds, fantasy world, vibrant colors, magical realism, high detail", category: "clouds" },

            // 🏞️ Rivers
            { text: "crystal clear river winding through autumn forest, golden leaves, tranquil vibe, high resolution", category: "rivers" },
            { text: "mist rising from mountain river at dawn, cool tones, peaceful atmosphere, detailed landscape, 4k", category: "rivers" },
            { text: "aerial view of river delta, intricate patterns, turquoise water, natural beauty, ultra HD", category: "rivers" },

            // 🤖 Futuristics
            { text: "futuristic city skyline at night, glowing skyscrapers, flying cars, cyberpunk palette, ultra-detailed", category: "futuristics" },
            { text: "android girl with holographic interface, sleek design, neon accents, sci-fi atmosphere, 8k", category: "futuristics" },
            { text: "robotic animals in digital forest, surreal tech fusion, vibrant colors, high definition", category: "futuristics" },

            // 🗾 Japanese
            { text: "traditional Japanese garden in spring, cherry blossoms, stone lanterns, tranquil pond, serene composition", category: "japanese" },
            { text: "samurai standing in bamboo forest, misty morning, cinematic lighting, historical vibe, detailed armor", category: "japanese" },
            { text: "modern Tokyo street at night, neon signs, bustling crowd, urban energy, high resolution", category: "japanese" },

            // 🌳 Woods
            { text: "sunbeams filtering through dense forest, lush green foliage, peaceful clearing, high detail, 4k", category: "woods" },
            { text: "autumn woods with golden leaves, foggy morning, moody atmosphere, soft light, crisp clarity", category: "woods" },
            { text: "enchanted woodland with glowing fairies, magical realism, vibrant colors, dreamy vibe", category: "woods" },

            // 🖼️ Paintings & Artworks
            { text: "impressionist landscape painting, bold brush strokes, vivid colors, classic art style, high resolution", category: "artworks" },
            { text: "modern abstract painting, geometric shapes, pastel palette, minimalism, clean composition", category: "artworks" },
            { text: "surreal portrait with melting features, Dali-inspired, dreamlike colors, ultra HD", category: "artworks" },

            // ☢️ Apocalypse
            { text: "post-apocalyptic city ruins, overgrown with plants, dramatic sky, cinematic mood, ultra-detailed", category: "apocalypse" },
            { text: "lone survivor walking through desert wasteland, dust storm, dystopian vibe, high contrast, 4k", category: "apocalypse" },
            { text: "abandoned highway under dark clouds, eerie silence, moody lighting, detailed landscape", category: "apocalypse" },

            // ⛰️ Mountains
            { text: "snow-capped mountains at sunrise, vibrant sky, mist in valleys, breathtaking panorama, ultra HD", category: "mountains" },
            { text: "rocky peaks above clouds, dramatic shadows, epic scale, high clarity, 8k", category: "mountains" },
            { text: "lush green mountains with waterfalls, rainbow in distance, serene landscape, detailed composition", category: "mountains" },

            // 🎨 More Anime
            { text: "anime girl with umbrella in rainy city, glowing reflections, soft shading, moody palette, 4k", category: "anime" },
            { text: "anime friends on summer festival night, lanterns, yukata, joyful expressions, vibrant colors", category: "anime" },
            { text: "anime dragon soaring over fantasy kingdom, epic sky, detailed scales, high definition", category: "anime" },

            // 🌌 Bonus: Space & Cosmos
            { text: "colorful nebula with swirling stars, deep space, cosmic dust, ultra-high resolution, vibrant hues", category: "space" },
            { text: "astronaut floating above earth, sunrise on horizon, cinematic lighting, detailed suit, 8k", category: "space" },
            { text: "alien planet with twin moons, surreal landscape, glowing flora, sci-fi atmosphere, ultra clear", category: "space" }

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

            // Check if Replicate API token is available
            if (!process.env.REPLICATE_API_TOKEN) {
                throw new Error('REPLICATE_API_TOKEN is not configured');
            }

            // Use Flux AI model for image generation
            const model = 'black-forest-labs/flux-1.1-pro-ultra:c6e5086a542c99e7e523a83d3017654e8618fe64ef427c772a1def05bb599f0c';
            const input = {
                raw: false,
                prompt: enhancedPrompt,
                aspect_ratio: '9:21',
                output_format: 'jpg',
                safety_tolerance: 2,
                image_prompt_strength: 0.1,
            };

            console.log('[Bot] Using model: %s', model);
            console.log('[Bot] With input: %O', input);
            console.log('[Bot] Running Flux AI...');
            
            const output = await this.replicate.run(model, { input });
            console.log('[Bot] Flux AI Done!', output);
            console.log('[Bot] Raw Flux AI response:', JSON.stringify(output, null, 2));

            // Extract image URL from Flux AI response
            let imageUrl: string | null = null;
            
            if (Array.isArray(output) && output.length > 0) {
                const firstItem = output[0];
                console.log('[Bot] First item in array:', firstItem, 'Type:', typeof firstItem);
                
                if (typeof firstItem === 'string') {
                    imageUrl = firstItem;
                    console.log('[Bot] Successfully extracted image URL from Flux AI array (string)');
                } else if (firstItem && typeof firstItem === 'object' && firstItem.constructor.name === 'URL') {
                    // eslint-disable-next-line
                    imageUrl = (firstItem as any).href;
                    console.log('[Bot] Successfully extracted image URL from Flux AI array (URL object)');
                    // eslint-disable-next-line
                } else if (firstItem && typeof firstItem === 'object' && 'href' in firstItem && typeof (firstItem as any).href === 'string') {
                    // eslint-disable-next-line
                    imageUrl = (firstItem as any).href;
                    console.log('[Bot] Successfully extracted image URL from Flux AI array (object with href)');
                    // eslint-disable-next-line
                } else if (firstItem && typeof firstItem === 'object' && typeof (firstItem as any).url === 'function') {
                    // eslint-disable-next-line
                    const urlResult = (firstItem as any).url();
                    if (typeof urlResult === 'string') {
                        imageUrl = urlResult;
                    } else if (urlResult && typeof urlResult === 'object' && 'href' in urlResult) {
                        imageUrl = urlResult.href;
                    }
                    console.log('[Bot] Successfully extracted image URL from Flux AI array (url function)');
                } else {
                    console.log('[Bot] First item in array is not a recognized format:', firstItem);
                }
                // eslint-disable-next-line
            } else if (output && typeof output === 'object' && 'url' in output && typeof (output as any).url === 'string') {
                // eslint-disable-next-line
                imageUrl = (output as any).url;
                console.log('[Bot] Successfully extracted image URL from Flux AI object.url');
                // eslint-disable-next-line
            } else if (output && typeof output === 'object' && typeof (output as any).url === 'function') {
                // eslint-disable-next-line
                const urlResult = (output as any).url();
                if (typeof urlResult === 'string') {
                    imageUrl = urlResult;
                } else if (urlResult && typeof urlResult === 'object' && 'href' in urlResult) {
                    imageUrl = urlResult.href;
                }
                console.log('[Bot] Successfully extracted image URL from Flux AI url() function');
            } else if (output && typeof output === 'object' && output.constructor.name === 'URL') {
                // eslint-disable-next-line
                imageUrl = (output as any).href;
                console.log('[Bot] Successfully extracted image URL from Flux AI URL object');
                // eslint-disable-next-line
            } else if (output && typeof output === 'object' && 'href' in output && typeof (output as any).href === 'string') {
                // eslint-disable-next-line
                imageUrl = (output as any).href;
                console.log('[Bot] Successfully extracted image URL from Flux AI object.href');
            } else {
                console.log('[Bot] Flux AI response format not recognized. Type:', typeof output);
                console.log('[Bot] Flux AI response keys:', output && typeof output === 'object' ? Object.keys(output) : 'N/A');
                throw new Error('Flux AI returned unrecognized response format');
            }

            console.log("image url 69696969699696996969696", imageUrl)

            if (!imageUrl || typeof imageUrl !== 'string') {
                throw new Error('Invalid image URL in Flux AI response');
            }

            console.log(`[Bot] Successfully received image URL from Flux AI: ${imageUrl}`);

            // Download the image
            console.log('[Bot] Downloading generated image...');
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
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
            console.error(`[Bot] Full error details:`, error);
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
            `Insane AI-generated mobile wallpaper! 🔥\n\n${hashtagText}`,
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
