"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import ReelPlayer from "@/app/components/ReelPlayer";

export default function VideoPage() {
  const params = useParams<{ id: string }>();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params?.id;
    if (!id) {
      setError("This reel could not be found.");
      setLoading(false);
      return;
    }

    const loadVideo = async () => {
      try {
        const data = await apiClient.getVideo(id);
        setVideo(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("This reel could not be found.");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-4">
        <p className="text-lg">{error || "This reel could not be found."}</p>
        <Link href="/" className="btn btn-primary">
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="link link-hover text-sm">
        Back to feed
      </Link>
      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] items-start">
        <div
          className="rounded-xl overflow-hidden bg-base-200"
          style={{ aspectRatio: "9/16" }}
        >
          <ReelPlayer
            path={video.videoUrl}
            controls={video.controls ?? true}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          <p className="text-base-content/80 whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
