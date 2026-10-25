import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import styles from "./VideoPlayer.module.scss";

type VideoPlayerProps = {
  /** Link do YouTube (watch?v=, youtu.be/ ou embed/) ou o próprio id. */
  url: string;
  /** Miniatura exibida antes de dar play. */
  image: string;
  title: string;
  className?: string;
};

function getYoutubeId(url: string) {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    if (hostname === "youtu.be") return pathname.slice(1);
    return searchParams.get("v") ?? pathname.split("/").filter(Boolean).pop() ?? "";
  } catch {
    return url; // já é um id
  }
}

/**
 * Miniatura com botão de play. O iframe do YouTube só é carregado
 * ao clicar (nada de terceiros no carregamento da página).
 */
export default function VideoPlayer({ url, image, title, className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // O botão some ao dar play: leva o foco para o vídeo.
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <div className={`${styles.player} ${className}`}>
      {playing ? (
        <iframe
          ref={frameRef}
          className={styles.frame}
          src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(url)}?autoplay=1&controls=0&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={() => setPlaying(true)}
          aria-label={`Assistir ao vídeo: ${title}`}
        >
          <img src={image} alt="" className={styles.image} />
          <span className={styles.play} aria-hidden="true">
            <Play size={32} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
