import { ComponentProps } from "react";

const GrayButton = (props: ComponentProps<"button">) => {
  return (
    <button
      className="w-full rounded-2xl bg-[#E1DDD7] px-8 py-2 font-bold"
      {...props}
    />
  );
};
export default GrayButton;
