import useMovies from "../hooks/useMovies";

const MoviesList = () => {
  const {
    movies,
    error,
    isLoading,
    setItemRef,
    containerRef,
    computedVideoStyle,
  } = useMovies();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        An Error occurred
      </div>
    );
  }
  return (
    <div
      className="w-full h-full overflow-auto flex flex-col gap-4 p-4"
      ref={containerRef}
    >
      {movies.map((movie, index) => (
        <video
          className={`w-54 h-54 ${computedVideoStyle(
            index,
            movies.length - 1,
          )}`}
          key={movie.id}
          src={movie.attributes.preview_src}
          ref={setItemRef}
          data-index={index}
          muted
          loop
        >
          <track kind="captions" />
        </video>
      ))}
    </div>
  );
};

export default MoviesList;
