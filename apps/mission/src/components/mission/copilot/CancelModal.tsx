import { Dispatch, SetStateAction } from "react";
import { ModalWithTransitions, ConfirmButton } from "ui-helpers";
import { AlertIcon } from "icons";

export const CancelModal = ({
  show,
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}) => {
  const contentModal = (
    <div className="flex max-w-[550px] px-4 pr-2 pb-4 pt-5 sm:p-6">
      <div className="items-start justify-start">
        <AlertIcon />
      </div>
      <div className="mx-5 mt-0 space-y-3">
        <h3 className="text-gray-900 text-base font-semibold leading-6">
          Exit Account Set up ?
        </h3>
        <p className="">
          You need to connect your account to the dashboard to start interacting
          with Evmos.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              setShow(false);
            }}
            className="color-[#D1D5DB] rounded border border-[#D1D5DB] px-8 py-2 font-[GreyCliff] text-[16px] font-normal"
          >
            Stay
          </button>
          <ConfirmButton
            text="Exit"
            onClick={() => {
              setShow(false);
            }}
            className="w-auto font-normal normal-case"
          />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <ModalWithTransitions
        show={show}
        setShow={setShow}
        content={contentModal}
        propClose={true}
      />
    </>
  );
};
