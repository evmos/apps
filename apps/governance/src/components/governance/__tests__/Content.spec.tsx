import { test, vi, expect } from "vitest";

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

vi.mock("evmos-wallet", async () => {
  return {
    StoreType: vi.fn(),
  };
});

test("temporary test", () => {
  expect(true).toBe(true);
  // render(
  //   <QueryClientProvider client={queryClient}>
  //     <Content />
  //   </QueryClientProvider>
  // );
});
