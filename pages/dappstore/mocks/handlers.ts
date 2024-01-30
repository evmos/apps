// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { http, HttpResponse } from "msw";
// 44f82b8afefe4815bc072f34d37c8619
export const handlers = [
  http.post(
    // eslint-disable-next-line no-secrets/no-secrets
    "https://api.notion.com/v1/databases/00c57b8ac577430a9a6b855192da6493/query",
    () => {
      return HttpResponse.json(
        {
          object: "list",
          results: [
            {
              object: "page",
              id: "44f82b8a-fefe-4815-bc07-2f34d37c8619",
              created_time: "2024-01-22T14:15:00.000Z",
              last_edited_time: "2024-01-22T14:26:00.000Z",
              created_by: {},
              last_edited_by: {},
              cover: null,
              icon: null,
              parent: {},
              archived: false,
              properties: {},
              // eslint-disable-next-line no-secrets/no-secrets
              url: "https://www.notion.so/Gaming-44f82b8afefe4815bc072f34d37c8619",
              public_url:
                // eslint-disable-next-line no-secrets/no-secrets
                "https://altiplanic.notion.site/Gaming-44f82b8afefe4815bc072f34d37c8619",
            },
          ],
          next_cursor: null,
          has_more: false,
          type: "page_or_database",
          page_or_database: {},
          request_id: "41b011f1-b060-4bdd-8b5b-ed78310b827f",
        },

        { status: 200 },
      );
    },
  ),
  http.post(
    "https://api.notion.com/v1/databases/a188bd13dd114a88a7763fd2a8cc601e/query",
    () => {
      return HttpResponse.json(
        {
          object: "list",
          results: [
            {
              object: "page",
              id: "600c7bc5-4960-4ecf-8700-be82aef554cd",
              created_time: "2023-11-01T10:27:00.000Z",
              last_edited_time: "2024-01-20T01:20:00.000Z",
              created_by: [Object],
              last_edited_by: [Object],
              cover: null,
              icon: [Object],
              parent: [Object],
              archived: false,
              properties: [Object],
              // eslint-disable-next-line no-secrets/no-secrets
              url: "https://www.notion.so/Evmos-Governance-600c7bc549604ecf8700be82aef554cd",
              public_url: null,
            },
            {
              object: "page",
              id: "64517aa9-1545-4afc-a4ea-d84e0cca4da7",
              created_time: "2023-11-01T10:26:00.000Z",
              last_edited_time: "2024-01-20T01:20:00.000Z",
              created_by: [Object],
              last_edited_by: [Object],
              cover: null,
              icon: [Object],
              parent: [Object],
              archived: false,
              properties: [Object],
              url: "https://www.notion.so/Evmos-Staking-64517aa915454afca4ead84e0cca4da7",
              public_url: null,
            },
            {
              object: "page",
              id: "bdc9e06f-d3dc-4699-96f6-aba4767a48a3",
              created_time: "2023-11-01T09:23:00.000Z",
              last_edited_time: "2024-01-20T01:18:00.000Z",
              created_by: [Object],
              last_edited_by: [Object],
              cover: null,
              icon: [Object],
              parent: [Object],
              archived: false,
              properties: [Object],
              url: "https://www.notion.so/Revert-bdc9e06fd3dc469996f6aba4767a48a3",
              public_url: null,
            },
            {
              object: "page",
              id: "d218a02f-72d8-421b-a810-6c15b2bf1bca",
              created_time: "2023-11-01T09:21:00.000Z",
              last_edited_time: "2024-01-20T01:18:00.000Z",
              created_by: [Object],
              last_edited_by: [Object],
              cover: null,
              icon: [Object],
              parent: [Object],
              archived: false,
              properties: [Object],
              url: "https://www.notion.so/Steer-d218a02f72d8421ba8106c15b2bf1bca",
              public_url: null,
            },
          ],
          next_cursor: null,
          has_more: false,
          type: "page_or_database",
          page_or_database: {},
          request_id: "41b011f1-b060-4bdd-8b5b-ed78310b827f",
        },

        { status: 200 },
      );
    },
  ),
];
