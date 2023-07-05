import { CheckIcon } from "icons";
import { ConfirmButton } from "ui-helpers";
import { Current } from "./Current";
import { useState } from "react";

// status: complete, current, upcoming
const steps = [
  {
    name: "Install MetaMask",
    loading: "Waiting for MetaMask Setup",
    done: "Metamask Installed",
    href: "https://metamask.io/download/",
    status: "current",
  },
  {
    name: "Connect with MetaMask",
    loading: "Waiting for MetaMask Setup",
    done: "Metamask Installed",
    href: "#",
    status: "upcoming",
  },
  //   {
  //     name: "Connected with MetaMask",
  //     href: "#",
  //     status: "upcoming",
  //   },
];

// TODO: remove it
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Steps() {
  const [stepName, setStepName] = useState(steps[0].name);
  //   const [stepUrl, setSteupUrl] = useState(steps[0].href);
  //   const [stepStatus, setStepStatus] = useState("current");
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {/* complete */}
            {step.status === "complete" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-[1.2px] bg-red"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#31B886] ">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>

                  <ConfirmButton
                    text={step.name}
                    className="ml-4 w-full rounded-lg bg-[#31B886] font-normal normal-case tracking-wider"
                    onClick={() => {
                      console.log("conclick");
                    }}
                  />
                </a>
              </>
            ) : //   current
            step.status === "current" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-[1px] bg-[#DBD3D1]"
                    aria-hidden="true"
                  />
                ) : null}

                <Current
                  step={step}
                  setStepName={setStepName}
                  stepName={stepName}
                />
              </>
            ) : (
              // upcoming
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-[#DBD3D1]"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-center"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="group-hover:border-gray-400 relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#DBD3D1] bg-white"></span>
                  </span>

                  <ConfirmButton
                    disabled={true}
                    text={step.name}
                    className="ml-4 w-full rounded-lg font-normal normal-case tracking-wider"
                    onClick={() => {
                      console.log("conclick");
                    }}
                  />
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
