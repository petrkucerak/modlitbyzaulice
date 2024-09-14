export default function Card({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col items-start justify-center w-[200px]`}
      id={id}
    >
      {children}
    </div>
  );
}
