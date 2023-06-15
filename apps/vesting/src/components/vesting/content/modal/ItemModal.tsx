export const ItemModal = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex justify-between space-x-5">
      <p className="font-bold">{title}</p>
      <p className="w-1/2 break-words text-end">{description}</p>
    </div>
  );
};
