// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_FEATURED_DAPP,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { EcosystemCard } from "./ecosystem-card";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";
type TYPE_IMAGE = "file";

const CARD_EXAMPLE = {
  name: "Transak",
  slug: "transak",
  categoryName: "On-Ramps",
  categorySlug: "on-ramps",
  categories: [{ name: "On-Ramps", slug: "on-ramps" }],
  notionId: "92565c03-74ae-42a9-b5ce-93d26026061a",
  localized: {},
  instantDapp: true,
  description:
    "Transak is a developer integration toolkit that enables you as an app developer to onboard your users to buy/sell crypto in any blockchain app, website or web plugin.",
  oneLiner: "Easy onboarding for crypto transactions",
  howTo:
    "To use the app, you will need to complete the KYC process. After the verification is complete, you are free to buy or sell your cryptocurrency easily by choosing the desired fiat currency and any payment method, such as your bank card. ",
  subItem: [],
  listed: true,
  x: { url: "https://twitter.com/Transak", label: "Transak" },
  dapp: { url: "https://transak.com/", label: "transak.com" },
  project: null,
  github: null,
  discord: { url: null, label: null },
  telegram: { url: null, label: null },
  updatedAt: "2023-11-29T09:42:00.000Z",
  createdAt: "2023-06-23T12:36:00.000Z",
  language: null,
  cover: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAADCAYAAACasY9UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAyklEQVR4nGNg5JH4z8gr/Z9RQOk/k4j2f2Zx0/8s0nb/WeTd/7MoBf5nVYv6z6aV/J9dN+c/u2HZfw7T+v8cFh3/OW0m/edymP2fgUlQ9T+TqP5/ZknL/ywyTv9ZFbz/s6qE/mdTj/vPrp3+n12/8D+7UdV/DrPm/5xWPf+5bKf953Kc/5/bZcV/Ho9N/xlYpOz+s8i5/2dVCvjPBrJNE2IbB8g2k/r/nBYd/7lsJv7nsp/9n9t5yX9u97X/eby2/+f1O/CfN+jUfwB3Uk3fFoRUegAAAABJRU5ErkJggg==",
    src: "/prefetched-images/transak-cover.png",
    _originalSrc: "",
    type: "file" as TYPE_IMAGE,
    expiryTime: "",
  },
  thumbnail: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAACXBIWXMAABYlAAAWJQFJUiTwAAACC0lEQVR4nF3S3UtTcQDG8UPn/M7L75xTYWVl+dbWpkOZmVpOl3NzmfMlVyZKSEGWgSCjzAyCXhAyUHqhSIrsxSKhlCCKIpBAELqIugiCLrrqrsvo+hvbRKi/4Pnw5VFWrS1GXRdAza1Eywuh5ccQRQmE5wC67zB64BhG+SBGxTDmzvNYNWNYoQlk+BYych9FzfGjbgiibdqFtqUBUbgPsa0T3deL7j+CHhjACJ7CrDyHVXMZq/Yqsv4msuEudmwGRV1fhrqxGi0vjJYfRxR3oHu7Ed5eZHAQt/oMRvA0ZtUFrN1XkHXXkXumsBsfYsdnUTL0zWl6NEPXvV0ITzdropN4Rn+QN/SdnMQ0ZtUlrNAkMnw7Q7djT7Gb51Ey9K0RREGankT39aD6+ik/+43U/B9Sj35RPPAVWT+BVXcD2XAPOzqDHX+O0/IKJU0XBWl6e4ZulPShlgxQmvrCyIvftI39JLfvE074GjJ8J0tvmsVpfonT+g4lS29FeA4uV+/HCJxAhsYxk0uI1kXc6BQyvR6Zxo49wd47h9PyGrd9AUUrbM5W396DXnIUo+xktnrFMFblKLLmIrJ2MlNdRh+v0J2297j7F1FEURvCewjd34cROI5RPoS5YwSzOl19HGu5umx8gN30LEtPvMXt+ICb/IiyQi/99zDmf4fJVp/DSbzBaV/A7Vxidddn/gJY7Rjcr2QF6gAAAABJRU5ErkJggg==",
    src: "/prefetched-images/transak-thumbnail.png",
    _originalSrc: "",
    type: "file" as TYPE_IMAGE,
    expiryTime: "",
  },
  icon: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAABYlAAAWJQFJUiTwAAACNklEQVR4nI2TX0hTURzH75E153bv3eZ1OreZzMZmopQg5UtJPUQEYWX/THKRlWEIhQ9iCiqZBVFBj4UFgfVQT2Kv+eCTL0GScY1VVmrZ5gzTh3r5xLab2JrlwxcOv9/5fc45v9/5SkIuJLM8acq8T8qYUL2ppDU/qVTMt06A4kEyqwhbPqbcTZi0ACIB2qAgFO//AVKOhrK1gZKmIco7dSq6dILnh9G2hxGWXITsXgOgeJLFjpoeKvq+se32Mlv65ynr/kqoK0ZZb5yi2utICYjiSQMoXiSLHXPwGMGOGNU35ynt+cLm7s8Ut31CbYqQd2qS0OUoedXh5HOyjJ5IKySrC/veQapufCfQPUfzYJzK3llqrs7Q/mgO65HXOBunCJwZQtgKVt/Ag5ALkBQ/7sYxqm8tUHc3xr3RRdoeRxmZWCS+9IO2B9NkH9IJXnyJ2RUwpuMxALYUoLBxjIr+ea48ixNf/smovkTL/VnuDEepuvQG54lJSlpfpAMKUwurC3XPQ8r7FvB3zND5NMaOno/4miPUXZtC2jeOFn7PxpNPEDZXehN9CIuKyV+H78IHSjuncZx7h/N0BEe9jvnAK+xHJ/C2TGGvrDf+RFoTRWI0OU4sle24z76lqHWavHAE+3EdZ0NiChGcO7sQFkeGMcq/5U5CTP6DyLsGUGtHUPY/R949gCV0OFW84pN/fGWRrSByNLLU4qSEVUMyy8bJfxors5mM9yX8kGyYsiq2Ljf+Zem19/wCSK2UWLH6yGsAAAAASUVORK5CYII=",
    src: "/prefetched-images/transak-icon.png",
    _originalSrc: "",
    type: "file" as TYPE_IMAGE,
    expiryTime: "",
  },
};
describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    render(<EcosystemCard data={CARD_EXAMPLE} />);
    const button = screen.getByRole("link", { name: /Transak/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FEATURED_DAPP, {
      "dApp Name": "Transak",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for featured dapp", async () => {
    disableMixpanel();
    render(<EcosystemCard data={CARD_EXAMPLE} />);
    const button = screen.getByRole("link", { name: /Transak/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
