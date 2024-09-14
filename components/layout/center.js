export default function Center({ children, className }) {
  return (
    <div className={`${className} flex justify-center w-full`}>{children}</div>
  );
}
