export const TdContent = ({
  tdProps,
}: {
  tdProps: {
    title: string;
    value: string | number | JSX.Element;
  };
}) => {
  return (
    <div className="mr-4 flex justify-between">
      <span className="text-sm text-darkGray400 md:hidden">
        {tdProps.title}
      </span>
      <span className="break-all text-sm font-bold text-pearl">
        {tdProps.value}
      </span>
    </div>
  );
};
