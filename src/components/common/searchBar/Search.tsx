import dynamic from "next/dynamic";
import {
  SearchContext,
  useSearchContext,
} from "../../../internal/common/context/SearchContext";

const SearchIcon = dynamic(() => import("../images/icons/SearchIcon"));

const Search = ({ placeholder }: { placeholder: string }) => {
  const { value, handleSetValue } = useSearchContext() as SearchContext;
  return (
    <div className="px-4 font-medium flex items-center justify-between rounded-lg border border-darkGray3">
      <input
        onChange={handleSetValue}
        value={value}
        className="w-full placeholder:text-darkGray3 bg-transparent focus-visible:outline-none text-pearl"
        placeholder={placeholder}
      />
      <SearchIcon className="w-10 h-10 text-darkGray3" />
    </div>
  );
};

export default Search;
