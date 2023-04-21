// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Tooltip = ({
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
        className={`absolute left-0 z-[40] m-4 mx-auto -translate-x-1/2 break-words rounded-md 
        bg-black p-1 px-1 text-center text-xs font-normal text-pearl opacity-0 transition-opacity group-hover:opacity-100 ${
          className !== undefined ? className : "max-w-[6rem]"
        } `}
      >
        {text}
      </span>
    </div>
  );
};
