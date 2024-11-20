"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState, FormEvent } from "react";
import { fetchFromAPI } from "../../../utils/fetchFromApi";
import { useTheme } from "next-themes";

import VideoCard from "../../../components/videoCard";
import Loading from "@/components/loading";
import Navbar from "@/components/Navbar";

interface Video {
  type: string;
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  publishedTimeText: string;
  viewCount: string;
  thumbnail: { url: string }[];
}

interface ApiResponse {
  data: Video[];
}

const Page = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const search = decodeURIComponent(slug);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchTerm(search);
      router.push(`/search/${searchTerm}`, { scroll: false });
    }
  };

  useEffect(() => {
    setLoading(true);
    setVideos([]);

    fetchFromAPI(`search?query=${slug}`)
      .then((data: ApiResponse) => {
        const filteredVideos = data.data.filter(
          (item) => item.type === "video"
        );
        setVideos(filteredVideos);
      })
      .finally(() => setLoading(false));
  }, [slug]); 

  return (
    <section className="text-primary">
      <Navbar />
      <div className="wrapper flex flex-col gap-5 min-h-screen mt-[50px] ml-20 mr-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-between flex-col md:flex-row gap-5 w-full">
          {videos.map((data, idx) => (
            <li key={idx} className="list-none">
              <VideoCard video={data} />
            </li>
          ))}
        </div>
        {loading && (
          <div className="flex flex-center size-full my-auto">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
