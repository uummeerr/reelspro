"use client";

interface ReelPlayerProps {
  path: string;
  controls?: boolean;
  className?: string;
  autoPlay?: boolean;
}

function buildVideoSrc(path: string): string {
  const endpoint = (process.env.NEXT_PUBLIC_URL_ENDPOINT || "").replace(
    /\/+$/,
    ""
  );

  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${endpoint}${normalizedPath}`;
}

export default function ReelPlayer({
  path,
  controls = true,
  className = "",
  autoPlay = false,
}: ReelPlayerProps) {
  const src = buildVideoSrc(path);

  if (!src) {
    return (
      <div className="flex items-center justify-center w-full h-full text-sm opacity-70">
        Video unavailable
      </div>
    );
  }

  return (
    <video
      key={src}
      src={src}
      controls={controls}
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
      className={className}
    />
  );
}
