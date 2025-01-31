"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Song } from "@/lib/interface";
import { useRouter } from 'next/navigation'

import { ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import AudioPlayback from "@/components/AudioPlayback";

const camelots = [
  '8B', '3B', '10B', '5B', '12B', '7B', '2B', '9B', '4B', '11B', '6B', '1B',
  '5A', '12A', '7A', '2A', '9A', '4A', '11A', '6A', '1A', '8A', '3A', '10A'
  ]



const musicKeys = [
  "C Major", "C Minor",
  "C# / Db Major", "C# / Db Minor",
  "D Major", "D Minor",
  "D# / Eb Major", "D# / Eb Minor",
  "E Major", "E Minor",
  "F Major", "F Minor",
  "F# / Gb Major", "F# / Gb Minor",
  "G Major", "G Minor",
  "G# / Ab Major", "G# / Ab Minor",
  "A Major", "A Minor",
  "A# / Bb Major", "A# / Bb Minor",
  "B Major", "B Minor"
]

export default function Home() {

const fake: Song[] = [{
    id: 3,
    spotify_id: '01dD2dQvRGW3BNG2sjcxSH',
    song: 'Mr. Jones',
    artist: 'Counting Crows',
    spotify_preview: 'https://p.scdn.co/mp3-preview/61da6033572b55220571bf1d75254094ec5ea65d?cid=774b29d4f13844c495f206cafdad9c86',
    year: 2003,
    duration_ms: 272733,
    bpm: 141,
    camelot: '8B',
    song_key: 'C Major'
  },
  // {
  //   id: 4,
  //   spotify_id: '01byVowKTekrZBXYvSU4Wx',
  //   song: 'Hypnotize',
  //   artist: 'System of a Down',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/4d20c1d7432a3194d94000dc5927461880c27fd0?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 2005,
  //   duration_ms: 189440,
  //   bpm: 153,
  //   camelot: '2B',
  //   song_key: 'F# / Gb Major'
  // },
  // {
  //   id: 5,
  //   spotify_id: '3dxvTMAC8qGoedZHGS3m1Y',
  //   song: 'Rock and Roll',
  //   artist: 'Led Zeppelin',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/eeed9ad7aed64f7bd886ddec7b94625cc03227f1?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 2013,
  //   duration_ms: 236042,
  //   bpm: 166,
  //   camelot: '11B',
  //   song_key: 'A Major'
  // },
  // {
  //   id: 6,
  //   spotify_id: '1uEdGGGX3uFpBEttP27vkY',
  //   song: 'The Hardest Part',
  //   artist: 'Coldplay',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/66a313e65ee8904f03928411c84d25b44aec2c8b?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 2006,
  //   duration_ms: 264586,
  //   bpm: 123,
  //   camelot: '6B',
  //   song_key: 'A# / Bb Major'
  // },
  // {
  //   id: 7,
  //   spotify_id: '0WMmdTiZrDkObaABU7mylW',
  //   song: "You're My Best Friend",
  //   artist: 'Queen',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/bb450881d7c7d59ac8759f71a4686e2947602009?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 1981,
  //   duration_ms: 172173,
  //   bpm: 118,
  //   camelot: '8B',
  //   song_key: 'C Major'
  // },
  // {
  //   id: 8,
  //   spotify_id: '0je32DnbaZ3DzrT6pVia8x',
  //   song: 'Strawberry Fields Forever',
  //   artist: 'The Beatles',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/6885906494281df98df8e7506d70f6560f6aeeee?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 1967,
  //   duration_ms: 199813,
  //   bpm: 110,
  //   camelot: '8B',
  //   song_key: 'C Major'
  // },
  // {
  //   id: 9,
  //   spotify_id: '14Hlfk7LY4TOw450LaVteS',
  //   song: '4th Dimensional Transition',
  //   artist: 'MGMT',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/ccddaff8d6db5b81020c3cf67a782077facd6ea4?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 2008,
  //   duration_ms: 238013,
  //   bpm: 159,
  //   camelot: '11B',
  //   song_key: 'A Major'
  // },
  // {
  //   id: 10,
  //   spotify_id: '05zWoNTO4vaCLdnQJvpdiA',
  //   song: 'Back in the U.S.S.R.',
  //   artist: 'The Beatles',
  //   spotify_preview: 'https://p.scdn.co/mp3-preview/1a7fcc2880a0d9e78c61131ba8a5456e1d31b8a0?cid=774b29d4f13844c495f206cafdad9c86',
  //   year: 2011,
  //   duration_ms: 154479,
  //   bpm: 142,
  //   camelot: '11B',
  //   song_key: 'A Major'
  // }
]
  const [key, setKey] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);

  const getSongs = (take: number = 5, skip: number = 0, key: string | null) => {
    if(key == null){console.log(key); return;}
    const songParams = {take: take, skip: skip, mKey: key}
    const options = {method: 'POST', body: JSON.stringify(songParams), headers:{'Content-Type':'application/json'}}
    fetch('/api/get-songs', options)
    .then(resp => resp.json())
    .then(json => {
        setSongs(prev => prev ? [...prev, ...json] : json);
    })
    .catch(e => console.error(e));
  }

  // getSongs();
  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center bg-gradient-to-br from-[#F8F8F8] via-[#EBF5FF] to-[#FBEEEE]">
      <div className="w-11/12 md:w-1/3 flex flex-col items-center justify-center gap-4">
        <h1 className="text-gray-600 italic font-serif text-3xl font-medium">It all starts with a key.</h1>
        <div className="flex flex-row gap-2">
          <Select onValueChange={(value) => setKey(value)}>
            <SelectTrigger className="bg-white py-2.5 px-4 w-full rounded-full shadow-2xl border-2 border-solid border-gray-300 hover:border-gray-600 duration-300">
              <SelectValue className="font-bold" placeholder="Pick a key" />
            </SelectTrigger>
            <SelectContent>
              {musicKeys.map((option, index)=>{
                return(
                  <SelectItem key={index} value={option}>{option}</SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <button onClick={()=>getSongs(10, 0, key)} className="py-2.5 flex items-center px-5 h-9 border-2 border-solid border-gray-600 rounded-full bg-gray-600 text-sm text-white">Next</button>
        </div>
      </div>
        {fake && 
        (
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 overflow-y-auto max-h-96">
            {fake?.map((song, index)=>{
              return(
                <div className="w-full flex flex-row justify-between items-center p-4 border-b-2 border-solid border-gray-200">
                  <AudioPlayback url={song.spotify_preview} />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-gray-600">{song.song}</h2>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <ChevronRight onClick={()=>alert("hi")} />
                </div>
              )
            })}
              <div className="p-4">
                <div className="flex items-center justify-center">
                <h2>Load More</h2>
                </div>
              </div>
          </div>
        )
        }
    </div>
  );
}
