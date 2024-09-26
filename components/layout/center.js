export default function Center({ children, className }) {
  return (
    <div className={`${className} max-w-[90vw] flex justify-center w-full`}>{children}</div>
  );
}
