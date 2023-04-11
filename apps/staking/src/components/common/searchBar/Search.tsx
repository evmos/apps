import dynamic from "next/dynamic";
import {
  SearchContext,
  useSearchContext,
} from "../../../internal/common/context/SearchContext";

const SearchIcon = dynamic(() => import("../images/icons/SearchIcon"));

const Search = ({ placeholder }: { placeholder: string }) => {
  const { value, handleSetValue } = useSearchContext() as SearchContext;
  return (
    <div className="flex items-center justify-between rounded-lg border border-darkGray3 px-4 font-medium">
      <input
        onChange={handleSetValue}
        value={value}
        className="w-full bg-transparent text-pearl placeholder:text-darkGray3 focus-visible:outline-none"
        placeholder={placeholder}
      />
      <SearchIcon className="h-10 w-10 text-darkGray3" />
    </div>
  );
};

export default Search;
