// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QuestionMarkIcon } from "icons";

const Banner = () => {
  return (
    <div className="my-4 mx-5 flex items-center space-x-1 rounded-lg bg-pearl p-4 text-black xl:mx-0">
      <QuestionMarkIcon />
      <p>
        Welcome to the beta version of the asset page - please note that this is
        a work in progress!
      </p>
    </div>
  );
};

export default Banner;
