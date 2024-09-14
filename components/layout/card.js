export default function Card({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col items-start justify-end h-[400px] w-[210px] my-10 mx-5`}
      id={id}
    >
      {children}
    </div>
  );
}
