import { Button } from "../../../../../../packages/ui/src/button/index";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { IconArrowBottomRec } from "../../../../../../packages/ui/src/icons/duocolor";

export const SignInButton = ({ open }: { open: boolean }) => {
  return (
    <Button as="div" className="relative" outlined={open}>
      {!open && (
        <div
          className=" before:content-[''] before:absolute before:top-1.5 before:right-0 
before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:lg:w-[12px] before:lg:h-[12px] before:animate-pulse before:bg-primary before:dark:bg-primary-dark before:rounded-full"
        />
      )}
      Sign in
    </Button>
  );
};

export const ProfileButton = () => {
  return (
    <button
      className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
      data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
    >
      <div className="w-3 h-3 rounded-full bg-red" />
      <span className="font-bold whitespace-nowrap">name.evmos</span>
      <IconArrowBottomRec />
    </button>
  );
};
