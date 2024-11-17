import { VIDEO_URLS } from "../../app/constantURLs";
import "../../app/globals.css";
import "./LoginBackground.css";

export default function LoginBackground() {
  return (
    <div className="video-section">
      <video
        className="video-player"
        autoPlay
        muted
        loop
        src={VIDEO_URLS.backgroundVideo}
      />
    </div>
  );
}
