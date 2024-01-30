// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/cosmos-rest/evmos/cosmos/gov/v1/proposals", () => {
    return HttpResponse.json(
      {
        proposals: [
          {
            id: "1",
            messages: [
              {
                "@type": "/cosmos.gov.v1.MsgExecLegacyContent",
                content: {
                  "@type": "/cosmos.gov.v1beta1.TextProposal",
                  title: "Airdrop Claim Mission",
                  description: "Vote to claim",
                },
                // eslint-disable-next-line no-secrets/no-secrets
                authority: "evmos10d07y265gmmuvt4z0w9aw880jnsr700jcrztvm",
              },
            ],
            status: "PROPOSAL_STATUS_PASSED",
            final_tally_result: {
              yes_count: "5572621435466967266761313",
              abstain_count: "155119544168132378159044",
              no_count: "41434192570722978028892",
              no_with_veto_count: "11160632020957358092220",
            },
            submit_time: "2022-03-03T19:18:21.382288871Z",
            deposit_end_time: "2022-03-17T19:18:21.382288871Z",
            total_deposit: [
              { denom: "aevmos", amount: "10000000000000000000" },
            ],
            voting_start_time: "2022-03-03T19:18:21.382288871Z",
            voting_end_time: "2022-03-08T19:18:21.382288871Z",
            metadata: "",
            title: "",
            summary: "",
            proposer: "",
          },
          {
            id: "2",
            messages: [
              {
                "@type": "/cosmos.gov.v1.MsgExecLegacyContent",
                content: {
                  "@type": "/cosmos.gov.v1beta1.TextProposal",
                  title: "Governance Proposal Mission",
                  description: "brought to your by validator - evmosius",
                },
                // eslint-disable-next-line no-secrets/no-secrets
                authority: "evmos10d07y265gmmuvt4z0w9aw880jnsr700jcrztvm",
              },
            ],
            status: "PROPOSAL_STATUS_PASSED",
            final_tally_result: {
              yes_count: "2907459863780634741296844",
              abstain_count: "1602116275035023558974919",
              no_count: "9861714168941468106064",
              no_with_veto_count: "10594184632343164499631",
            },
            submit_time: "2022-04-29T16:11:44.657781538Z",
            deposit_end_time: "2022-05-13T16:11:44.657781538Z",
            total_deposit: [
              { denom: "aevmos", amount: "12365243000001000000" },
            ],
            voting_start_time: "2022-04-29T16:40:46.963770634Z",
            voting_end_time: "2022-05-04T16:40:46.963770634Z",
            metadata: "",
            title: "",
            summary: "",
            proposer: "",
          },
        ],
        pagination: { next_key: "AAAAAAAAAHM=", total: "173" },
      },

      { status: 200 },
    );
  }),
];
