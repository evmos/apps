import Link from "next/link";

export type SideBarEntry = {
  title: string;
  path: string;
  icon: React.ReactNode | React.FC;
};

const SideBarItem = ({ item }: { item: SideBarEntry }) => {
  const isActive = item.title.includes("Mission");
  return (
    <Link href={item.path}>
      <div
        className={`flex rounded-full hover:bg-white hover:bg-opacity-10  items-center px-4 py-3 gap-3 
          ${isActive ? "text-pearl" : "text-darkGray4"}`}
      >
        {item.icon}
        <span className="text-sm font-semibold">{item.title}</span>
      </div>
    </Link>
  );
};

export default SideBarItem;
