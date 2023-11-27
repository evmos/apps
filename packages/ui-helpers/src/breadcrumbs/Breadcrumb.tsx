import { RightArrow } from "icons";

export const Breadcrumb = ({
  pages,
}: {
  pages: { name: string; href: string }[];
}) => {
  return (
    <nav className="flex" aria-label="breadcrumb">
      <ol role="list" className="flex items-center space-x-1 tracking-wide">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              {index > 0 && (
                <RightArrow
                  className="h-3 w-3 flex-shrink-0 text-white/70"
                  aria-hidden="true"
                />
              )}
              <a
                href={page.href}
                className={`pl-1 transition-all duration-200 ${
                  index === pages.length - 1
                    ? "text-[#FFF4E1] hover:text-white/90 font-bold"
                    : "text-white/70 hover:text-[#FFF4E1] font-light"
                }`}
                aria-current={index === pages.length - 1 ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
