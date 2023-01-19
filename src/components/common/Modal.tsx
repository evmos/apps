import useEventListener from "../../hooks/useEventListener";
import CloseIcon from "./images/icons/CloseIcon";

const Modal = ({
  children,
  show,
  onClose,
}: {
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
      className="fixed inset-0 flex items-center justify-center bg-blackOpacity z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-h-[75vh] min-w-[300px] overflow-scroll sm:overflow-auto relative px-5 sm:px-10 py-8 bg-pearl text-black rounded-lg max-w-[600px] sm:max-h-full"
      >
        <CloseIcon
          onClick={onClose}
          className="absolute top-3 right-3 p-2 w-10 h-10 cursor-pointer rounded z-[99] transition-colors hover:bg-darkPearl focus-within:outline-1 focus-within:outline-darkPearl"
        />

        {children}
      </div>
    </div>
  );
};

export function ModalTitle({ title }: { title: string }) {
  return (
    <div className="w-[calc(100%-32px)] font-bold text-lg mb-4 text-darkGray2">
      {title}
    </div>
  );
}

export default Modal;
