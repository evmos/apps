export const TdContent = ({
  tdProps,
}: {
  tdProps: {
    title: string;
    value: string | number | JSX.Element;
  };
}) => {
  return (
    <div className="flex justify-between mr-4">
      <span className="md:hidden text-darkGray400 text-sm">
        {tdProps.title}
      </span>
      <span className="text-pearl text-sm font-bold break-all">
        {tdProps.value}
      </span>
    </div>
  );
};
