// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DAppOgImage } from "./dapp-og-image";

export default function Image({
  params,
}: {
  params: { locale: string; category: string; dapp: string };
}) {
  return DAppOgImage({
    params,
    size: {
      width: 1200,
      height: 675,
    },
  });
}
