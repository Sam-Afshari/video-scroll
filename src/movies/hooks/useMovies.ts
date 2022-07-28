import { useCallback, useMemo, useRef } from "react";

import { useGetMoviesQuery } from "../apis/moviesApi";

const useMovies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  const observer = useRef<IntersectionObserver>();
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const movies = useMemo(() => data?.data || [], [data?.data]);

  const intersectionCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLVideoElement;

      target.setAttribute(
        "data-percentage",
        entry.intersectionRatio.toString(),
      );
    });

    if (containerRef.current) {
      const containerCenter =
        containerRef.current.scrollTop + containerRef.current.offsetHeight / 2;

      videoRefs.current
        .map((videoRef) => ({
          center: videoRef.offsetTop + videoRef.clientHeight / 2,
          percentage: Number(videoRef.dataset.percentage),
          video: videoRef,
        }))
        .sort((a, b) => {
          if (a.percentage === b.percentage) {
            return (
              Math.abs(containerCenter - a.center) -
              Math.abs(containerCenter - b.center)
            );
          }

          return b.percentage - a.percentage;
        })
        .forEach((item, index) => {
          if (index === 0) {
            item.video.play();
          } else {
            item.video.pause();
          }
        });
    }
  };

  const setItemRef = (element: HTMLVideoElement) => {
    if (element.dataset.index) {
      videoRefs.current[Number(element.dataset.index)] = element;

      if (!observer.current) {
        observer.current = new IntersectionObserver(intersectionCallback, {
          root: element.parentElement,
          rootMargin: "0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        });
      }

      observer.current?.observe(element);
    }
  };

  const computedVideoStyle = useCallback((index: number, lastIndex: number) => {
    if (index === 0) {
      return "mt-[40vh]";
    }

    if (index === lastIndex) {
      return "mb-[40vh]";
    }

    return "";
  }, []);

  return {
    movies,
    error,
    isLoading,
    containerRef,

    setItemRef,
    computedVideoStyle,
  };
};

export default useMovies;
