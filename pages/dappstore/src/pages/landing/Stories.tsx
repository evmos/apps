// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import image from "@evmosapps/ui/components/images/galaxy.png";
import { Card } from "@evmosapps/ui/components/cards/Card.tsx";
import { Link } from "@evmosapps/i18n/client";
import { getBackgroundImage } from "../../getBackgroundImage";

export const Stories = () => (
  <section className="flex flex-col gap-4">
    <div>
      <Link href="/dappstore">
        <Card
          className="h-80 col-span-2 px-8 py-8 flex-col flex relative bg-cover"
          style={{
            backgroundImage: getBackgroundImage(image),
          }}
          fullWidth
          background="bg-galaxy-red"
        >
          <h3 className="text-subheading dark:text-subheading-dark grow tracking-widest uppercase text-xs">
            Category
          </h3>
          <div className="mt-auto">
            <h3 className="text-xl text-heading dark:text-heading-dark">
              Great dApps for 2024
            </h3>
            <h4 className="text-sm">App description goes here</h4>
          </div>
        </Card>
      </Link>
    </div>
    <div className="lg:grid lg:grid-cols-2 gap-4 relative flex w-full overflow-x-auto">
      {[0, 1].map((i) => (
        <Card
          lowest
          key={i}
          className="h-56 shape-binding px-8 py-8 flex-col flex relative bg-cover w-11/12 lg:max-w-none lg:w-full max-w-96 shrink-0"
          style={{
            backgroundImage: getBackgroundImage(image),
          }}
          fullWidth
          background="bg-galaxy-red"
        >
          <h3 className="text-subheading dark:text-subheading-dark grow tracking-widest uppercase text-xs">
            Category
          </h3>
          <div className="mt-auto">
            <h3 className="text-base text-heading dark:text-heading-dark">
              Great dApps for 2024
            </h3>
            <h4 className="text-sm">App description goes here</h4>
          </div>
        </Card>
      ))}
    </div>
  </section>
);
