import { cn } from "helpers/src/classnames";
export const Page = () => {
  const fontSizes = [
    "text-xxxs",
    "text-xxs",
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    // "text-7xl",
    // "text-8xl",
    // "text-9xl",
  ].reverse();

  return (
    <div className="container p-10 gap-y-6 flex flex-col">
      <p>
        Note: <code>font-body</code> is set as the global font so it can be
        ommited
      </p>
      {fontSizes.map((size) => (
        <div key={size} className="text-xs">
          <pre className="">{size} font-brand heading</pre>
          <p className={cn("grow", size, "heading font-brand")}>Evmos</p>
        </div>
      ))}
      <hr />
      {fontSizes.map((size) => (
        <div key={size} className="text-xs">
          <pre className="">{size} font-body heading</pre>
          <p className={cn("grow", size, "heading font-body")}>Heading</p>
        </div>
      ))}
      <hr />
      {fontSizes.map((size) => (
        <div key={size} className="text-xs">
          <pre className="">{size} font-body</pre>
          <p className={cn("grow", size, "font-body")}>Paragraph</p>
        </div>
      ))}
    </div>
  );
};
