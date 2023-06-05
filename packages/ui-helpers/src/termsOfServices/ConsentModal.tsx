import { PRIVACY_POLICY_URL, COOKIE_POLICY_URL } from "constants-helper";
import Link from "next/link";
import GrayButton from "../GrayButton";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
import { Dispatch, SetStateAction } from "react";
export const ConsentModal = ({
  setShow,
  setConsent,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  setConsent?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="space-y-5">
      <p className="font-bold">We value your privacy!</p>
      <div>
        We use cookies to enhance your browsing experience and analyze our
        traffic. By clicking 'Accept All', you agree to our{" "}
        <Link
          className="cursor-pointer underline"
          rel="noopener noreferrer"
          target="_blank"
          href={PRIVACY_POLICY_URL}
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link
          className="cursor-pointer underline"
          rel="noopener noreferrer"
          target="_blank"
          href={COOKIE_POLICY_URL}
        >
          cookie policy
        </Link>
        .
      </div>
      <div className="flex items-center space-x-5 justify-center">
        <GrayButton
          text={<p>Accept</p>}
          onClick={() => {
            localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "false");
            setShow(false);
            setConsent && setConsent(true);
          }}
        />
        <GrayButton
          text={<p>Reject</p>}
          onClick={() => {
            localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "true");
            setShow(false);
            setConsent && setConsent(false);
          }}
        />
      </div>
    </div>
  );
};
