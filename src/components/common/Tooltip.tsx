const Tooltip = ({ element, text }: { element: JSX.Element; text: string }) => {
  return (
    <div className="group relative">
      {element}
      <span
        className="group-hover:opacity-100 transition-opacity bg-black px-1 text-white rounded-md absolute left-1/2 
-translate-x-1/2 opacity-0 m-4 mx-auto break-words text-xs max-w-[6rem]"
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
