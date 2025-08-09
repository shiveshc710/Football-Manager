export const dynamic = "force-dynamic";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const VIDEO_URLS = {
  backgroundVideo: "/Intro-Video.mp4",
  anotherVideo: "https://example.com/another-video.mp4",
} as const;

export const API_URLS = {
  signup: `${BASE_URL}/api/users`,
} as const;
