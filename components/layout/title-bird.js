import IconCustomBirdLeft from "../icons/bird-left";
import IconCustomBirdRight from "../icons/bird-right";

export default function TitleWithBirds({ children, className, color }) {
  return (
    <div
      className={`${className} flex flex-row items-center justify-center uppercase font-semibold`}
    >
      <IconCustomBirdLeft color={color} className={"w-6 sm:w-10 mr-5"} />
      <h2 className="text-xl xl:text-2xl">{children}</h2>
      <IconCustomBirdRight color={color} className={"w-6 sm:w-10 ml-5"} />
    </div>
  );
}
