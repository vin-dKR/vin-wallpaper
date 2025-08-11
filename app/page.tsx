import { PostWallpaper } from "@/components/PostWallpaper ";
import { OpenAIImageGenerator } from "@/components/OpenAIImageGenerator";
import { Imagen4Generator } from "@/components/Imagen4Generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Wallpaper Bot 🎨
                    </h1>
                    <p className="text-lg text-gray-600">
                        Generate and post AI wallpapers to Twitter automatically
                    </p>
                </div>

                <Tabs defaultValue="twitter-bot" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="twitter-bot" className="text-lg">
                            🤖 Twitter Bot (Flux AI)
                        </TabsTrigger>
                        <TabsTrigger value="openai-generator" className="text-lg">
                            🤖 OpenAI DALL-E
                        </TabsTrigger>
                        <TabsTrigger value="imagen4-generator" className="text-lg">
                            🖼️ Imagen-4 Generator
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="twitter-bot" className="space-y-4">
                <PostWallpaper />
                    </TabsContent>
                    
                    <TabsContent value="openai-generator" className="space-y-4">
                        <OpenAIImageGenerator />
                    </TabsContent>

                    <TabsContent value="imagen4-generator" className="space-y-4">
                        <Imagen4Generator />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
