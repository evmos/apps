import Image from "next/image";
import { useAnnouncements } from "../../internal/mission/functionality/hooks/useAnnouncements";

const HeroAnnouncement = () => {
  const { heroAnnouncement } = useAnnouncements();

  if (
    heroAnnouncement.length === 0 ||
    heroAnnouncement[0].fields["File Upload"] === undefined
  ) {
    return <></>;
  }
  const file = heroAnnouncement[0].fields["File Upload"][0];
  return (
    <Image
      className="rounded-2xl"
      alt={file.filename}
      src={file.url}
      width={file.width}
      height={file.height}
    />
  );
};

export default HeroAnnouncement;
