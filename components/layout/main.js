export default function Main({ children, className }) {
  return (
    <main
      className={`${className} w-full flex flex-col items-center justify-between min-h-[100vh]`}
    >
      {children}
    </main>
  );
}
