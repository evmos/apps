import { test } from "vitest";
import { render } from "@testing-library/react";
import Content from "../Content";
import { vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

vi.mock("next/router", async () => {
  return {
    useRouter() {
      return {
        query: {
          id: "1",
        },
      };
    },
  };
});

test("temporary test", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
});
