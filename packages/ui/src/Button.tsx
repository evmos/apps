import * as React from "react";

export const Button = () => {
  return (
    <div className="rounded-md ">
      <a href="https://turbo.build/repo/docs">
        <div className="hover:ui-bg-gray-300 ui-flex ui-w-full ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-transparent ui-bg-white ui-px-8 ui-py-3 ui-text-base ui-font-medium ui-text-black ui-no-underline md:ui-py-3 md:ui-px-10 md:ui-text-lg md:ui-leading-6">
          Read the docs
          <span className="ui-from-brandred ui-to-brandblue ui-ml-2 ui-bg-gradient-to-r ui-bg-clip-text ui-text-transparent">
            →
          </span>
        </div>
      </a>
    </div>
  );
};
