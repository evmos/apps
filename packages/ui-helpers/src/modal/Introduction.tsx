// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosRedIcon } from "@evmosapps/icons/EvmosRedIcon";
import { Title } from "./Title";
import { Description } from "./Description";

export const IntroductionModal = ({
  title,
  description,
  content,
  icon,
}: {
  title: string;
  description: string | JSX.Element;
  content?: JSX.Element;
  icon?: JSX.Element;
}) => {
  return (
    <section className="flex flex-col space-y-3 text-gray1 h-full">
      {icon ? icon : <EvmosRedIcon className="shrink-0" />}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <div className="flex flex-col space-y-2 text-xxs h-full justify-end">
        {content}
      </div>
    </section>
  );
};
