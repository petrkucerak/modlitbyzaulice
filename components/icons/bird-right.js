export default function IconCustomBirdRight({ className, color }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72.51 94.81"
    >
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          class={`stroke-none fill-[${
            color !== undefined ? color : "#eb8fc2"
          }]`}
          d="M70.39,46.52l-25.6-3.2S58.82,8.62,69.9,3.69c11.08-4.92-16.24-5.17-23.14.74s-18.46,29.29-20.92,33.47-16.49,5.66-19.94,9.11c-3.45,3.45-5.91,4.43-5.91,4.43,0,0,21.17,4.18,21.66,5.91s18.95,24.86,23.87,27.32,16.98,10.83,20.18,10.09c.22-.05,4.97.07,1.97-4.43-7.6-11.4-25.6-35.36-25.6-35.36l29.54-3.28-1.23-5.17Z"
        />
      </g>
    </svg>
  );
}
