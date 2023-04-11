import Image from "next/image";
import Link from "next/link";
import { MISSION_CONTROL_DATA } from "./AppsData";

const AppsContainer = () => {
  return (
    <div
      style={{ maxHeight: "225px", overflowY: "auto" }}
      className="flex flex-col gap-4"
    >
      {MISSION_CONTROL_DATA.appsOnEvmos.map((a) => (
        <Link
          target="_blank"
          rel="noreferrer"
          href={a.twitter}
          aria-label={a.name}
          key={a.name}
          className="flex gap-5"
        >
          <Image
            width={44}
            height={44}
            className="rounded-full"
            alt="app"
            src={a.image}
          />
          <div className="flex flex-col">
            <span className="font-[GreyCliff] font-bold">{a.name}</span>
            <span
              style={{ fontSize: "12px" }}
              className="font-extralight uppercase text-pearl"
            >
              {a.category}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AppsContainer;
