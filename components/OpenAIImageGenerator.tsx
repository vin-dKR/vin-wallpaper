'use client';

import { useState } from 'react';
import { generateImageWithOpenAI, generateRandomImageWithOpenAI } from '@/actions/openai-actions';
import Image from 'next/image';

interface OpenAIImageGeneratorProps {
    className?: string;
}

export function OpenAIImageGenerator({ className = '' }: OpenAIImageGeneratorProps) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [usedPrompt, setUsedPrompt] = useState<string | null>(null);

    const handleGenerateWithPrompt = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const result = await generateImageWithOpenAI(prompt);
            
            if (result.success && result.imageUrl) {
                setGeneratedImage(result.imageUrl);
                setUsedPrompt(result.prompt || prompt);
            } else {
                setError(result.error || 'Failed to generate image');
            }
        } catch (err) {
            setError('An unexpected error occurred' + err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateRandom = async () => {
        setIsGenerating(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const result = await generateRandomImageWithOpenAI();
            
            if (result.success && result.imageUrl) {
                setGeneratedImage(result.imageUrl);
                setUsedPrompt(result.prompt || 'Random prompt');
            } else {
                setError(result.error || 'Failed to generate random image');
            }
        } catch (err) {
            setError('An unexpected error occurred' + err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImage) return;
        
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `openai-wallpaper-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🤖 OpenAI DALL-E Generator
                </h2>
                <p className="text-gray-600">
                    Generate stunning wallpapers using OpenAIs DALL-E 3
                </p>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
                <label htmlFor="openai-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your wallpaper
                </label>
                <textarea
                    id="openai-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A serene landscape with mountains and a lake at sunset..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleGenerateWithPrompt}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Generating...' : 'Generate Image'}
                </button>
                <button
                    onClick={handleGenerateRandom}
                    disabled={isGenerating}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Generating...' : 'Random Image'}
                </button>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Generated Image */}
            {generatedImage && (
                <div className="space-y-4">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Generated Wallpaper
                        </h3>
                        {usedPrompt && (
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Prompt:</strong> {usedPrompt}
                            </p>
                        )}
                    </div>
                    
                    <div className="relative">
                        <Image
                            src={generatedImage}
                            alt="Generated wallpaper"
                            className="w-full max-w-md mx-auto rounded-lg shadow-md"
                        />
                    </div>
                    
                    <div className="text-center">
                        <button
                            onClick={handleDownload}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            📥 Download Wallpaper
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isGenerating && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="mt-2 text-gray-600">Generating your wallpaper with DALL-E 3...</p>
                </div>
            )}
        </div>
    );
} 