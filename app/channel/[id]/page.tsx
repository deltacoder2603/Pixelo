"use client";

import { useEffect, useState } from "react";
import { fetchFromAPI } from "../../../utils/fetchFromApi";
import { useParams } from "next/navigation";
import VideoCard from "../../../components/videoCard";
import Image from "next/image";
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

interface ChannelDetail {
  avatar: Thumbnail[];
  title: string;
  subscriberCountText: string;
}

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]); 
  const [channelDetail, setChannelDetail] = useState<ChannelDetail | null>(null); 
  const { id } = useParams<{ id: string }>(); 
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    if (id) {
      fetchFromAPI(`channel/home?id=${id}`).then((data) => setChannelDetail(data.meta)); 
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchFromAPI(`channel/videos?id=${id}`)
        .then((data) => setVideos(data.data)) 
        .finally(() => setLoading(false)); 
    }
  }, [id]);

  return (
    <section>
      <Navbar />
      <div className="text-primary wrapper flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col mt-20 md:flex-row sm:mx-auto md:mx-0 gap-5 bg-foreground/15 backdrop-blur-md rounded-xl border-2 border-foreground/20 p-10 shadow-[0_0_64px_-16px_rgba(0,255,0,0.2)]">
          <Image
            src={channelDetail?.avatar[2]?.url || "/default-avatar.png"} 
            width={180}
            height={180}
            alt="avatar"
            className="rounded-[50%]"
          />
          <div className="flex flex-col gap-3 my-auto">
            <h1 className="text-3xl font-bold">{channelDetail?.title}</h1>
            <h2 className="text-xl">{channelDetail?.subscriberCountText} Subscribers</h2>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Latest Uploads</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
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
};

export default Page;
