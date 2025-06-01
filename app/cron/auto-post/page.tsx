import { autoPostWallpaper } from '@/actions/wallpaper-actions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    const cronSecret = authHeader?.split(' ')[1] || '';

    const result = await autoPostWallpaper(cronSecret);

    if (result.success) {
        return NextResponse.json(result);
    } else {
        return NextResponse.json(result, { status: result.error === 'Unauthorized' ? 401 : 500 });
    }
}
