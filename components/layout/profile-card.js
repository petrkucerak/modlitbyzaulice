export default function ProfileCard({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col items-center justify-between my-4 sm:my-0`}
      id={id}
    >
      {children}
    </div>
  );
}
