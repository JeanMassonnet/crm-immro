import React from 'react';
import { Search } from 'lucide-react';
import { translations } from '../../utils/translations';

const { clients: t } = translations;

type ClientSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ClientSearch({ value, onChange }: ClientSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}