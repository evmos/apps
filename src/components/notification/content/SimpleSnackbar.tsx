export const SimpleSnackbar = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div>
      <p>{title}</p>
      <p className="text-sm">{text}</p>
    </div>
  );
};
