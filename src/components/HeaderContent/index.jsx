import React from "react";

const HeaderContent = ({
  title,
  description,
  buttonText,
  searchPlaceholder,
  onCreate,
  searchValue,
  onSearchChange,
  showSearch = true,
  showButton = true,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        {showButton && (
          <button
            onClick={onCreate}
            style={{ backgroundColor: '#000000', color: '#ffffff' }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hover:opacity-90"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus w-4 h-4"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            {buttonText}
          </button>
        )}
      </div>
      {showSearch && (
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm gap-2 mb-6"
        >
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
          >
            <div data-slot="card-title" className="leading-none font-semibold">
              Search {title}
            </div>
          </div>
          <div data-slot="card-content" className="px-6">
            <input
              data-slot="input"
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive max-w-sm"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderContent;
