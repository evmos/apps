import {
  SearchContext,
  useSearchContext,
} from "../../../internal/common/context/SearchContext";
import SearchIcon from "../images/icons/SearchIcon";

const Search = () => {
  const { value, handleSetValue } = useSearchContext() as SearchContext;
  return (
    <div className="px-4 font-medium flex items-center justify-between rounded-lg border border-darkGray2">
      <input
        onChange={handleSetValue}
        value={value}
        className="text-lg bg-transparent focus-visible:outline-none text-white "
        placeholder="Search..."
      />
      <SearchIcon className="w-10 h-10 text-darkGray400" />
    </div>
  );
};

export default Search;
