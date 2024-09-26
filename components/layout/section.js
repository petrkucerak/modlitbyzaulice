export default function Section({ children, className, id }) {
  return (
    <section
      className={`w-full flex flex-col items-center justify-center ${className}`}
      id={id}
    >
      <div id={`${id}-target`} className="mt-[1rem]"></div>
      {children}
    </section>
  );
}
