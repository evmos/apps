// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ModalTOS = ({
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
    <div className="bg-blackOpacity fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-pearl relative max-h-[350px] w-[600px] min-w-[300px] overflow-scroll rounded-lg px-5 py-8 text-black sm:max-h-full sm:overflow-auto  sm:px-10"
      >
        <div className="text-h5 text-darkGray3 mb-4 w-[calc(100%-32px)] font-bold">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};
