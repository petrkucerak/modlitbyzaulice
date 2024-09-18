export default function YoutubeVideo({ className, source }) {
  return (
    <div
      className={`bg-white w-[90vw] max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] h-[280px] xl:h-[340px] 2xl:h-[390px] flex items-center justify-center ${className}`}
    >
      <iframe
        className="w-[90%] h-[90%]"
        src={source}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
