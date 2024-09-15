export default function ProfileCard({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col items-center justify-between`}
      id={id}
    >
      {children}
    </div>
  );
}
