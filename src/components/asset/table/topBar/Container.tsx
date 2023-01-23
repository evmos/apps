export const Container = ({ text, value }: { text: string; value: string }) => {
  return (
    <div>
      <h5 className="opacity-80">{text}</h5>
      <h2 className="text-2xl font-bold font-[GreyCliff]">{value}</h2>
    </div>
  );
};
