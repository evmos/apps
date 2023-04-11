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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackOpacity">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative max-h-[350px] w-[600px] min-w-[300px] overflow-scroll rounded-lg bg-pearl px-5 py-8 text-black sm:max-h-full sm:overflow-auto  sm:px-10"
      >
        <div className="mb-4 w-[calc(100%-32px)] text-h5 font-bold text-darkGray3">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTOS;
