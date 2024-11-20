"use client";

import VideoCard from "../components/videoCard";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { useEffect, useState } from "react";
import { FlameIcon, HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";

interface Thumbnail {
  url: string;
}

interface Video {
  type: string;  
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  publishedTimeText: string;
  viewCount: string; 
  thumbnail: Thumbnail[];
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]); 
  const [category, setCategory] = useState<string>("home");
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`${category}`)
      .then((data) => {
        const filteredVideos = data.data.filter(
          (item: { type: string }) => item.type === "video" 
        );
        setVideos(filteredVideos);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section className="text-primary min-h-screen ">
      <Navbar />
      <div className="wrapper flex flex-col gap-4 ml-20 mr-20">
        <div className="flex justify-between my-auto mt-5">
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setCategory("home")}
              className={`flex gap-1 items-center ${
                category === "home"
                  ? "text-primary bg-primary/10 rounded-full px-3 py-2"
                  : "text-primary/80"
              }`}
            >
              <HomeIcon className="size-4" />
              Home
            </button>
            <button
              onClick={() => setCategory("trending")}
              className={`flex gap-1 items-center ${
                category === "trending"
                  ? "text-primary bg-primary/10 rounded-full px-3 py-2"
                  : "text-primary/80"
              }`}
            >
              <FlameIcon className="size-4" />
              Trending
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {videos.map((data, idx) => (
            <li key={idx} className="list-none">
              <VideoCard video={data} />
            </li>
          ))}
        </div>
        {loading && (
          <div className="wrapper flex flex-center justify-center my-auto">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
}
