import React from 'react';

type TabType = 'my-searches' | 'all-searches';

type SearchTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('my-searches')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'my-searches'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Mes recherches
        </button>
        <button
          onClick={() => onTabChange('all-searches')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'all-searches'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Toutes les recherches
        </button>
      </nav>
    </div>
  );
}