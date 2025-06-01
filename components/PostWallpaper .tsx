'use client';

import { useWallpaper } from "@/hooks/use-wallpaper";

export function PostWallpaper() {
    const { isPosting, result, postWallpaper } = useWallpaper();

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
                <button
                    onClick={postWallpaper}
                    disabled={isPosting}
                    className={`px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${isPosting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                        }`}
                >
                    {isPosting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating & Posting...
                        </div>
                    ) : (
                        'Post New Wallpaper'
                    )}
                </button>
            </div>

            {result && (
                <div
                    className={`mt-6 p-4 rounded-lg ${result.success
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                        }`}
                >
                    <div
                        className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'
                            }`}
                    >
                        {result.success ? '✅ Success!' : '❌ Error'}
                    </div>
                    <div
                        className={`mt-1 ${result.success ? 'text-green-700' : 'text-red-700'
                            }`}
                    >
                        {result.success ? (
                            <>
                                {result.message}
                                {result.tweetId && (
                                    <div className="mt-2">
                                        <a
                                            href={`https://twitter.com/i/web/status/${result.tweetId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            View Tweet →
                                        </a>
                                    </div>
                                )}
                            </>
                        ) : (
                            result.error
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8 text-sm text-gray-500 space-y-1">
                <p>• Generates 1920x1080 wallpapers using Stable Diffusion</p>
                <p>• Posts automatically to your connected Twitter account</p>
                <p>• Uses free Hugging Face inference API</p>
            </div>
        </div>
    );
}
