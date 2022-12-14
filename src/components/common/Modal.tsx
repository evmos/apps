import useEventListener from "../../hooks/useEventListener";
import CloseIcon from "./images/icons/CloseIcon";

const Modal = ({
  title,
  children,
  show,
  onClose,
}: {
  title?: string;
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
}) => {
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  });
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-blackOpacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative px-10 py-8 bg-pearl text-black rounded-lg  max-w-[90vw] min-w-[75%] w-[90vw] md:min-w-[400px] md:w-[auto] md:max-h-full"
      >
        <CloseIcon
          onClick={onClose}
          className="absolute top-3 right-3 p-2 w-12 h-12 cursor-pointer rounded z-[99] transition-colors hover:bg-darkPearl focus-within:outline-1 focus-within:outline-darkPearl"
        />
        <div className="w-[calc(100%-32px)] font-bold text-h5 mb-4">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
