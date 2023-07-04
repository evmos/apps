import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "icons";

export const ModalWithTransitions = ({
  show,
  setShow,
  content,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
}) => {
  // TODO: don't use transitions if props is setted.
  // TODO: don't show close icon if props is setted
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#FAF8F8] text-left shadow-xl transition-all sm:w-full sm:max-w-2xl">
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    className="focus-visible:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="sr-only">Close</span>
                    <CloseIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
