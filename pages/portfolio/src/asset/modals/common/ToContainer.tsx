// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";

const ToContainer = ({
  token,
  img,
  text,
}: {
  token: string;
  img: string;
  text?: string;
}) => {
  return (
    <>
      <div className="flex items-center space-x-10">
        <span className="font-bold">TO</span>
        <div className="flex items-center space-x-3">
          <Image
            src={img}
            width={20}
            height={20}
            alt={img}
            className="w-auto"
          />
          <span className="font-bold">{text ? text : token}</span>
        </div>
      </div>
    </>
  );
};

export default ToContainer;
