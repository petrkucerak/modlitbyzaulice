export default function Card({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col items-start justify-end sm:h-[400px] max-w-[350px] sm:w-[210px] my-10`}
      id={id}
    >
      {children}
    </div>
  );
}
