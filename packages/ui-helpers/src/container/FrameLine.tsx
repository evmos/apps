export const Frameline = ({
  children,
  variant = "primary",
}: {
  children: JSX.Element;
  variant?: "primary" | "secondary";
}) => {
  return (
    <div className="relative flex p-4">
      <p
        className="absolute top-0 left-0 border border-[#A4A189] w-full h-full rounded-xl pointer-events-none"
        style={{ clipPath: "inset(0% 0% calc(100% - 25%) 0%" }}
      />
      <div className="relative flex flex-col justify-center w-full h-full ">
        {variant === "secondary" && (
          <div
            className="absolute flex justify-between h-[5px] left-0 right-0 first:top-0 last:bottom-0 
        before:content-[''] before:w-[5px] before:h-[5px] before:bg-[#A4A189] before:absolute before:top-0 before:left-0
        after:content-[''] after:w-[5px] after:h-[5px] after:bg-[#A4A189] after:absolute after:top-0 after:right-0"
          ></div>
        )}
        <div
          className={`h-full ${
            variant === "secondary" && " py-4 px-0 md:p-4"
          } `}
        >
          {children}
        </div>
        {variant === "secondary" && (
          <div
            className="absolute flex justify-between h-[5px] left-0 right-0 first:top-0 last:bottom-0 
        before:content-[''] before:w-[5px] before:h-[5px] before:bg-[#A4A189] before:absolute before:top-0 before:left-0
        after:content-[''] after:w-[5px] after:h-[5px] after:bg-[#A4A189] after:absolute after:top-0 after:right-0"
          ></div>
        )}
      </div>

      <p
        className="absolute top-0 left-0 border border-[#A4A189] w-full h-full rounded-xl pointer-events-none"
        style={{ clipPath: "inset(calc(100% - 25%) 0% 0% 0%)" }}
      />
    </div>
  );
};
