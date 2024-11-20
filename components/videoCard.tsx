import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import markdownToTxt from "markdown-to-txt";
import { Dot } from "lucide-react";
import Loading from "./loading";

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

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video: {
    type,
    videoId,
    title,
    channelId,
    channelTitle,
    publishedTimeText,
    viewCount,
    thumbnail = [],
  },
}) => (
  <Suspense fallback={<Loading />}>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        damping: 10,
      }}
      className="flex rounded-2xl w-full max-h-[50vh] justify-between"
    >
      <div className="flex flex-col gap-2 w-full hover:-translate-y-2 transition-all duration-300">
        <Link href={videoId && `/${videoId}`}>
          <Image
            src={
              thumbnail[2]?.url
                ? thumbnail[2]?.url
                : thumbnail[1]?.url
                ? thumbnail[1]?.url
                : thumbnail[0]?.url
            }
            alt="thumbnail"
            width={100}
            height={100}
            className="aspect-video w-full rounded-xl object-cover"
          />
        </Link>
        <div className="flex flex-col gap-1">
          <Link
            href={videoId && `/${videoId}`}
            className="text-primary font-medium transition-all duration-300 line-clamp-2"
          >
            {markdownToTxt(title)}
          </Link>
          <Link
            href={`/channel/${channelId}`}
            className="text-primary text-sm hover:text-primary/80 transition-all duration-300"
          >
            {channelTitle}
          </Link>
          <div className="flex gap-1 items-center">
            <p className="text-primary/80 text-xs">
              {parseInt(viewCount).toLocaleString()} Views{" "}
            </p>
            <Dot className="size-4" />
            <p className="text-primary/80 text-xs">{publishedTimeText}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </Suspense>
);

export default VideoCard;
