import IconCustomBirdLeft from "../icons/bird-left";
import IconCustomBirdRight from "../icons/bird-right";

export default function TitleWithBirds({ children, className }) {
  return (
    <div
      className={`${className} flex flex-row items-center justify-center uppercase font-semibold`}
    >
      <IconCustomBirdLeft className={"w-10 mr-5"} />
      <h2 className="text-xl">{children}</h2>
      <IconCustomBirdRight className={"w-10 ml-5"} />
    </div>
  );
}
