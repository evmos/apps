import { Menu } from "@headlessui/react";
import { useOtherWalletsModal } from "./WalletsModal";
import { IconWallet } from "../../../../../../packages/ui/src/icons/line/wallet";
import { IconButton } from "../../../../../../packages/ui/src/button/icon-button";
import { IconArrowRightRec } from "../../../../../../packages/ui/src/icons/line";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { CopyButton } from "./CopyButton";
import { Dispatch, SetStateAction, Suspense } from "react";
import { TotalEvmos, TotalUsd } from "./useEvmosBalance";
import { useAccount, useDisconnect } from "wagmi";
import { IconArrowBottomRec } from "../../../../../../packages/ui/src/icons/duocolor";
import { IconPlusRec } from "../../../../../../packages/ui/src/icons/duocolor";
import { IconGear2 } from "../../../../../../packages/ui/src/icons/line";
import Link from "next/link";
import { Badge } from "../../../../../../packages/ui/src/components/badges/Badge";

// TODO Mili: update icons
export const SignInOptions = ({ close }: { close: () => void }) => {
  const otherWalletsModal = useOtherWalletsModal();
  return (
    <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2 ">
      <Menu.Item
        className="pt-3 pb-2 px-3 flex items-center justify-between w-full gap-4"
        as="button"
        onClick={(e) => {
          e.preventDefault();
          otherWalletsModal.setIsOpen(true, {}, true);
          close();
        }}
      >
        {<IconWallet className="w-7" />}
        <div className="text-left flex justify-between w-full items-center ">
          Other wallets
          {<IconArrowRightRec className="w-7" />}
        </div>
      </Menu.Item>
    </div>
  );
};

export const ProfileSettings = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // setIsOpen(false);
      },
    },
  });
  return (
    <div>
      <div className="rounded-xl bg-surface-container  dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2 [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark">
        <Menu.Item
          className="pt-3 pb-2 px-3 flex items-center justify-between w-full gap-4 "
          as="button"
          onClick={(e) => {
            e.preventDefault();
            setDropdownStatus("settings");
            // otherWalletsModal.setIsOpen(true, {}, true);
            // close();
          }}
        >
          {
            <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
          }
          <div className="text-left flex justify-between w-full items-center ">
            Settings
            {
              <IconArrowRightRec className="w-7 text-paragraph dark:text-paragraph-dark" />
            }
          </div>
        </Menu.Item>
      </div>
      <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
        <Menu.Item
          className="pt-3 pb-2 px-3 flex items-center justify-between w-full gap-4"
          as="button"
          onClick={() => {
            disconnect();
            // sendEvent(CLICK_DISCONNECT_WALLET_BUTTON);
          }}
        >
          {
            <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
          }
          <div className="text-left flex justify-between w-full items-center ">
            Sign out
          </div>
        </Menu.Item>
      </div>
    </div>
  );
};

export const ProfileOptions = () => {
  const { address } = useAccount();
  if (!address) return null;

  return (
    <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-8 pb-10 pl-1 pr-2 space-y-6">
      <Menu.Item
        as="div"
        className=" flex justify-center flex-col gap-3 items-center"
      >
        <div className="w-fit gap-3 flex items-center text-paragraph dark:text-paragraph-dark text-xs leading-4 font-medium bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-2xl px-3 py-2">
          <AddressDisplay address={address} />
          {address && <CopyButton text={address} />}
        </div>
      </Menu.Item>
      <div>
        <h6 className="text-2xl font-medium text-heading dark:text-heading-dark leading-8">
          <Suspense
            fallback={
              <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
            }
          >
            {address && <TotalEvmos address={address} />}
          </Suspense>
          {!address && "-"} <span className="">EVMOS</span>
        </h6>
        <p className="font-medium text-paragraph dark:text-paragraph-dark leading-5 text-sm">
          {!address && "-"}
          <Suspense
            fallback={
              <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
            }
          >
            {address && <TotalUsd address={address} />} USD
          </Suspense>
        </p>
      </div>
      <div className="flex justify-center gap-4 text-paragraph dark:text-paragraph-dark text-xs">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <Link href="/portfolio">
            <IconButton variant="low-emphasis">
              <IconArrowBottomRec />
            </IconButton>
          </Link>
          <p>Portfolio</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Link href="/dapps/on-ramps/transak">
            <IconButton variant="low-emphasis">
              <IconPlusRec />
            </IconButton>
          </Link>
          <p>Topup</p>
        </div>
      </div>
    </div>
  );
};

export const SettingsOptions = () => {
  return (
    <div>
      <div>
        <p className="text-left text-subheading dark:text-subheading-dark text-xs leading-4 font-medium">
          Account
        </p>
      </div>
      <div>
        {/* TODO Mili: fix border bottom, is not appearing correctly */}
        <div className="rounded-xl bg-surface-container  dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2 [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark">
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Currency
              <span className="text-paragraph dark:text-paragraph-dark">
                USD
              </span>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Language
              <span className="text-paragraph dark:text-paragraph-dark">
                English
              </span>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Notifications
              <Badge>Coming soon</Badge>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconGear2 className="w-7 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Address Format
              <Badge>Coming soon</Badge>
              {/* <Button variant="tertiary">Coming soon</Button> */}
            </div>
          </Menu.Item>
        </div>
      </div>
    </div>
  );
};
