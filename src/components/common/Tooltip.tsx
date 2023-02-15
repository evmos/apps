const Tooltip = ({
  element,
  text,
  className,
}: {
  element: JSX.Element;
  text: JSX.Element | string;
  className?: string;
}) => {
  return (
    <div className="group relative">
      {element}
      <span
        className={`group-hover:opacity-100 transition-opacity bg-black px-1 text-white rounded-md absolute left-0 
        -translate-x-1/2 opacity-0 m-4 mx-auto break-words text-xs z-[99999] p-1 font-normal text-center ${
          className !== undefined ? className : "max-w-[6rem]"
        } `}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
