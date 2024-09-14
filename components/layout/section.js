export default function Section({ children, className, id }) {
  return (
    <section
      className={`w-full min-h-[80vh] flex flex-col items-center justify-center ${className}`}
      id={id}
    >
      {children}
    </section>
  );
}
