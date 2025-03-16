import { NextResponse } from 'next/server';

export async function GET() {
  const tracks = [
    {
      id: '1',
      videoId: 'y21yInFXW4g',
      title: 'The Funeral of the Sad Bullfrog',
      description: 'The Funeral of the Sad Bullfrog',
      duration: '5:25',
      image: '/images/track1.jpg',
      youtubeAudioUrl: 'https://www.youtube.com/watch?v=y21yInFXW4g',
    },
    {
      id: '2',
      videoId: '4QKvQu-Rcmk',
      title: 'Beauty in Silence',
      description: 'Beauty in Silence',
      duration: '7:32',
      image: '/images/track2.jpg',
      youtubeAudioUrl: 'https://www.youtube.com/watch?v=4QKvQu-Rcmk',
    },
    {
      id: '3',
      videoId: 'Lz89aJ1tyBg',
      title: 'Piano Sonata No. 2',
      description: 'Piano Sonata No. 2',
      duration: '7:39',
      image: '/images/track3.jpg',
      youtubeAudioUrl: 'https://www.youtube.com/watch?v=Lz89aJ1tyBg',
    },
    {
      id: '4',
      videoId: 'y7K_LVBChXY',
      title: 'Serenade of Fleeting Shadows',
      description: 'Serenade of Fleeting Shadows',
      duration: '2.08',
      image: '/images/track4.jpg',
      youtubeAudioUrl: 'https://www.youtube.com/watch?v=y7K_LVBChXY',
    },
  ];

  const sortedTracks = tracks.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return NextResponse.json(sortedTracks);
}
