import * as React from "react";

export const Card = ({
  title,
  cta,
  href,
}: {
  title: string;
  cta: string;
  href: string;
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="ui-from-brandred ui-to-brandblue ui-group ui-mt-4 ui-overflow-hidden ui-rounded-lg ui-border ui-border-transparent ui-bg-gradient-to-r ui-bg-origin-border ui-text-[#6b7280]"
    >
      <div className="ui-h-full ui-bg-zinc-900 ui-p-4">
        <p className="ui-inline-block ui-text-xl ui-text-white">{title}</p>
        <div className="ui-mt-4 ui-text-xs group-hover:ui-underline">
          {cta} →
        </div>
      </div>
    </a>
  );
};
