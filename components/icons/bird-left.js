export default function IconCustomBirdLeft({ className, color }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72.51 94.81"
    >
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          className={`stroke-none fill-[${
            color !== undefined ? color : "#eb8fc2"
          }]`}
          d="M2.12,46.52l25.6-3.2S13.69,8.62,2.61,3.69s16.24-5.17,23.14.74c6.89,5.91,18.46,29.29,20.92,33.47s16.49,5.66,19.94,9.11,5.91,4.43,5.91,4.43c0,0-21.17,4.18-21.66,5.91s-18.95,24.86-23.87,27.32-16.98,10.83-20.18,10.09c-.22-.05-4.97.07-1.97-4.43,7.6-11.4,25.6-35.36,25.6-35.36L.89,51.69l1.23-5.17Z"
        />
      </g>
    </svg>
  );
}
