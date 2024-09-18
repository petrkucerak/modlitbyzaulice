export default function Card({ children, className, id }) {
  return (
    <div
      className={`${className} flex flex-col my-10 max-w-[280px] sm:h-[440px] xl:h-[500px] justify-end`}
      id={id}
    >
      {children}
    </div>
  );
}
