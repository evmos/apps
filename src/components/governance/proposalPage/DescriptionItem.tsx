const DescriptionItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-xs text-pearl flex flex-col md:flex-row space-y-1 md:space-y-0">
      <p className="uppercase min-w-[180px]">{title}</p>
      <p className="font-bold opacity-80">{description}</p>
    </div>
  );
};

export default DescriptionItem;
