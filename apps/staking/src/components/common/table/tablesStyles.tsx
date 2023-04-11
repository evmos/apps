export const tableStyle =
  "w-full text-left table-fixed break-words border-separate border-spacing-y-[2px]";

export const tHeadStyle =
  "hidden md:table-row-group text-pearl uppercase font-bold cursor-pointer";

export const tBodyStyle = " text-pearl text-lg ";
export const tdBodyStyle =
  "px-5 md:px-0 first:pt-6 last:pb-6 md:last:pr-8 md:py-4 flex flex-col md:table-cell bg-darkGray2 pb-1.5";

export const trBodyStyle = "text-pearl border-b-2 border-b-black md:space-y-1";
// z-[9] was added so when the user scrolls, the Manage button
// does not appear above the search validators component
// the value should be lower than the modal z-index
export const thStyle = "first:pl-8 py-4 sticky top-16 bg-black z-[9]";
