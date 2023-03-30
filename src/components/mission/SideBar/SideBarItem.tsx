import Link from "next/link";

export type SideBarEntry = {
  title: string;
  path: string;
  icon: JSX.Element;
};

const SideBarItem = ({ item }: { item: SideBarEntry }) => {
  const isActive = item.title.includes("Mission");
  return (
    <Link href={item.path} className="flex justify-center lg:justify-start">
      <div
        className={`flex rounded-full hover:bg-white hover:bg-opacity-10 items-center px-4 py-3 w-fit
          ${isActive ? "text-pearl" : "text-darkGray4"}`}
      >
        {item.icon}
        <span className="text-sm font-semibold">{item.title}</span>
      </div>
    </Link>
  );
};

export default SideBarItem;
