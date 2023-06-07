import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
const createMockRouter = (
  router: Partial<NextRouter>,
  query: ParsedUrlQuery
): NextRouter => {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query,
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    forward: jest.fn(), // Explicitly define the type of forward as () => void
    ...router,
  };
};

export default createMockRouter;
