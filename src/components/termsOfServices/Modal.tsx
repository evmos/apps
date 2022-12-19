const ModalTOS = ({
  title,
  children,
  show,
}: {
  title?: string;
  children: JSX.Element;
  show: boolean;
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blackOpacity">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-h-[350px] min-w-[300px] overflow-scroll sm:overflow-auto relative px-5 sm:px-10 py-8 bg-pearl text-black rounded-lg   w-[600px]  sm:max-h-full"
      >
        <div className="w-[calc(100%-32px)] font-bold text-h5 mb-4 text-darkGray3">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTOS;
