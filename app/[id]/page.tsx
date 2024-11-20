"use client";

import { Suspense, useEffect, useState } from "react";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import ReactPlayer from "react-player";
import VideoCard from "../../components/videoCard";
import { useParams } from "next/navigation";
import Link from "next/link";
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

interface VideoDetail {
  title: string;
  channelId: string;
  channelTitle: string;
  viewCount: string;
  description: string;
  thumbnail: Thumbnail[];
}

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchFromAPI(`video/info?id=${id}`)
        .then((data) => setVideoDetail(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchFromAPI(`related?id=${id}`)
        .then((data) => setVideos(data.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <section className="text-primary">
      <Navbar />
      <div className="wrapper flex flex-col gap-5 mx-4 md:mx-20">
        <div className="flex mt-5 justify-center">
          <div className="rounded-xl overflow-hidden w-full h-[200px] sm:h-[400px] md:h-[600px]">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              playing={true}
              pip
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="text-primary text-lg md:text-2xl">{videoDetail?.title}</h2>
          <Link
            href={`/channel/${videoDetail?.channelId}`}
            className="flex gap-2 text-primary/80 text-sm md:text-lg"
          >
            {videoDetail?.channelTitle}
          </Link>
          <p className="text-primary/60 text-sm md:text-base">
            {videoDetail
              ? parseInt(videoDetail.viewCount).toLocaleString()
              : "0"}{" "}
            views
          </p>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          <h3 className="text-primary text-lg md:text-2xl">Related Videos</h3>
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((data, idx) => (
                <li key={idx} className="list-none">
                  <VideoCard video={data} />
                </li>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Page;
