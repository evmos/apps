// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { http, HttpResponse } from "msw";
// eslint-disable-next-line no-secrets/no-secrets
// "/cosmos/staking/v1beta1/delegations/evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65",
// eslint-disable-next-line no-secrets/no-secrets
// "/cosmos/staking/v1beta1/delegators/evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65/unbonding_delegations",
// /cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
// /cosmos/staking/v1beta1/validators
export const handlers = [
  http.get("", () => {
    return HttpResponse.json(
      { id: 1 },

      { status: 200 },
    );
  }),
];
