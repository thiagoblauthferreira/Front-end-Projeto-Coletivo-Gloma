import React from "react";

interface ITabsProps {
  tabs: {
    key: string;
    label: string;
    disabled?: boolean;
    children: React.ReactNode;
  }[];
  tabDeafult?: string;
  className?: string;
  classNameTabs?: string;
}

export function Tabs({ tabs, tabDeafult, className, classNameTabs }: ITabsProps) {
  const [tabState, setTabState] = React.useState<string>(tabDeafult || tabs[0].key);

  const handleTab = (selectTab: string) => {
    setTabState(selectTab);
  };

  return (
    <div className={`min-w-full ${className}`}>
      <div className={`mb-3`}>
        <ul
          className={`
            flex overflow-x-auto
            ${classNameTabs}
          `}
        >
          {tabs.map((tab, index) => {
            return (
              <li
                key={`btn-key-tab-${tab.key}-${index}`}
                className={`
                  B7 cursor-pointer snap-start flex justify-center 
                  px-4 py-2 text-gray-400 text-nowrap border-b-2 
                  border-solid border-transparent transition-all w-max
                  font-bold
                  ${tabState === tab.key ? "!text-black !border-black" : ""} 
                  ${
                    tab.disabled
                      ? "cursor-not-allowed"
                      : "hover:text-black active:text-black"
                  }
                `}
                onClick={() => !tab.disabled && handleTab(tab.key)}
              >
                {tab.label}
              </li>
            );
          })}
        </ul>
      </div>

      {tabs.map((tab, index) => {
        if (tab.key === tabState) {
          const cloneTab = tab.children;
          return <div key={`tab-key-tab-${tab.key}-${index}`}>{cloneTab}</div>;
        }
      })}
    </div>
  );
}
