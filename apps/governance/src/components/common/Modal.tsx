import useEventListener from "../../hooks/useEventListener";
import { CloseIcon } from "icons";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-blackOpacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative max-h-[75vh] min-w-[300px] max-w-[600px] overflow-scroll rounded-lg bg-pearl px-5 py-8 text-black sm:max-h-full sm:overflow-auto sm:px-10 md:min-w-[400px]"
      >
        <CloseIcon
          onClick={onClose}
          className="absolute top-3 right-3 z-[99] h-10 w-10 cursor-pointer rounded p-2 transition-colors focus-within:outline-1 focus-within:outline-darkPearl hover:bg-darkPearl"
        />

        {children}
      </div>
    </div>
  );
};

export function ModalTitle({ title }: { title: string }) {
  return (
    <div className="mb-4 w-[calc(100%-32px)] text-lg font-bold text-darkGray2">
      {title}
    </div>
  );
}

export default Modal;
