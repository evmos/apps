import {
  render,
  Matcher,
  SelectorMatcherOptions,
  ByRoleMatcher,
  ByRoleOptions,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import mixpanel from "mixpanel-browser";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "evmos-wallet";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: JSX.Element }) => {
  return (
    // <WagmiConfig client={wagmiClient}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
  // overwrite the mock (recreate the mock here)
  return (
    <MixpanelProvider token="" config={{ ip: false }}>
      {children}
    </MixpanelProvider>
  );
};

interface MixpanelEvent {
  comp: JSX.Element;
  event: string;
  trackProps?: {};
  getBy: string;
  roleOptions?: {};
}

const getElement = (
  props: MixpanelEvent,
  getByText: (
    id: Matcher,
    options?: SelectorMatcherOptions | undefined
  ) => HTMLElement,
  getByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions | undefined
  ) => HTMLElement
) => {
  if (props.getBy === "link") {
    return getByRole(props.getBy);
  } else if (props.getBy === "checkbox") {
    return getByRole(props.getBy, props.roleOptions);
  } else {
    return getByText(props.getBy);
  }
};

export const successfullMixpanelEvent = async (props: MixpanelEvent) => {
  const { getByText, getByRole } = render(props.comp, {
    wrapper: wrapper,
  });
  let element = getElement(props, getByText, getByRole);

  expect(element).toBeInTheDocument();
  expect(mixpanel.init).toHaveBeenCalledTimes(1);

  await userEvent.click(element);
  expect(mixpanel.track).toHaveBeenCalledWith(
    props.event,
    props.trackProps ?? {}
  );
  expect(mixpanel.track).toHaveBeenCalledTimes(1);
};

export const enableCookiesAndSuccessfullMixpanelEvent = async (
  props: MixpanelEvent
) => {
  const { getByText, getByRole } = render(props.comp, {
    wrapper: wrapper,
  });

  // click on cookies settings and enable them
  const cookiesElement = getByText(/cookies settings/i);
  expect(cookiesElement).toBeInTheDocument();
  await userEvent.click(cookiesElement);
  const acceptButton = getByText("Accept");
  await userEvent.click(acceptButton);

  let element = getElement(props, getByText, getByRole);
  expect(element).toBeInTheDocument();
  expect(mixpanel.init).toHaveBeenCalledTimes(1);

  await userEvent.click(element);
  expect(mixpanel.track).toHaveBeenCalledWith(
    props.event,
    props.trackProps ?? {}
  );
  expect(mixpanel.track).toHaveBeenCalledTimes(1);
};

export const disableCookiesAndAvoidMixpanelEvent = async (
  props: MixpanelEvent
) => {
  const { getByText, getByRole } = render(props.comp, {
    wrapper: wrapper,
  });

  // click on cookes settings and enable them
  const cookiesElement = getByText(/cookies settings/i);
  expect(cookiesElement).toBeInTheDocument();
  await userEvent.click(cookiesElement);
  const rejectButton = getByText(/reject/i);
  await userEvent.click(rejectButton);

  let element = getElement(props, getByText, getByRole);
  expect(element).toBeInTheDocument();
  expect(mixpanel.init).toHaveBeenCalledTimes(1);

  await userEvent.click(element);
  expect(mixpanel.track).not.toHaveBeenCalledWith(
    props.event,
    props.trackProps ?? {}
  );
  expect(mixpanel.track).toHaveBeenCalledTimes(0);
};

export const tokenNotSetAvoidMixpanelEvent = async (props: MixpanelEvent) => {
  // Object.prototype.hasOwnProperty.call(mixpanel, "config") && How can I change this ??
  const { getByText, getByRole } = render(props.comp, {
    wrapper: wrapperWithoutToken,
  });

  let element = getElement(props, getByText, getByRole);
  expect(element).toBeInTheDocument();
  expect(mixpanel.init).toHaveBeenCalledTimes(1);

  await userEvent.click(element);
  //   expect(mixpanel.track).not.toHaveBeenCalled();
  expect(mixpanel.track).not.toHaveBeenCalledWith(
    props.event,
    props.trackProps ?? {}
  );
  expect(mixpanel.track).toHaveBeenCalledTimes(0);
};
