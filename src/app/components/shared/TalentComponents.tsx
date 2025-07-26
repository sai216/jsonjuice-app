// components/shared/TalentComponents.tsx - Reusable UI components

import React from 'react';
import { Search, Filter, Download, Calendar, Users, Briefcase } from 'lucide-react';
import { getStatusStyle, formatNumber, formatDate, createInitials } from '../../utils/talent';

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
  };
  colorScheme?: 'lime' | 'blue' | 'purple' | 'orange' | 'green' | 'red';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorScheme = 'lime'
}) => {
  const colorClasses = {
    lime: 'bg-lime-400/10 text-lime-400',
    blue: 'bg-blue-400/10 text-blue-400',
    purple: 'bg-purple-400/10 text-purple-400',
    orange: 'bg-orange-400/10 text-orange-400',
    green: 'bg-green-400/10 text-green-400',
    red: 'bg-red-400/10 text-red-400'
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    stable: 'text-slate-400'
  };

  return (
    <div className="card text-center">
      <div className={`p-4 ${colorClasses[colorScheme]} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-200 mb-2">
        {typeof value === 'number' ? formatNumber(value) : value}
      </h3>
      <p className="text-slate-400 text-sm">{title}</p>
      {subtitle && (
        <p className={`text-${colorScheme}-400 text-xs mt-1`}>{subtitle}</p>
      )}
      {trend && (
        <p className={`text-xs mt-2 ${trendColors[trend.direction]}`}>
          {trend.value}
        </p>
      )}
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: string;
  type: 'job' | 'application' | 'quality';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  type, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`${getStatusStyle(status, type)} ${sizeClasses[size]} rounded font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Search Bar Component
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onClear
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field pl-10 w-64"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
        >
          ×
        </button>
      )}
    </div>
  );
};

// Filter Dropdown Component
interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select..."
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field w-auto"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Avatar Component
interface AvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  image, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg'
  };

  const initials = createInitials(name);

  return (
    <div className={`${sizeClasses[size]} bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center font-medium overflow-hidden`}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
};

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: 'lime' | 'blue' | 'purple' | 'orange' | 'green' | 'red';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = 'lime',
  showPercentage = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    lime: 'bg-lime-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
    green: 'bg-green-400',
    red: 'bg-red-400'
  };

  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-slate-400">{label}</span>}
          {showPercentage && <span className={`text-${color}-400`}>{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="text-center py-12">
      <div className="p-4 bg-slate-800/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
};

// Loading Skeleton Component
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = ''
}) => {
  return (
    <div className={`${width} ${height} bg-slate-700 rounded animate-pulse ${className}`} />
  );
};

// Card List Item Component
interface CardListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const CardListItem: React.FC<CardListItemProps> = ({
  children,
  onClick,
  className = ''
}) => {
  return (
    <div 
      className={`p-4 bg-slate-950/40 rounded-lg border border-slate-800 transition-colors ${
        onClick ? 'hover:border-lime-400/50 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Quick Actions Panel Component
interface QuickActionsPanelProps {
  title: string;
  actions: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  title,
  actions
}) => {
  return (
    <div className="card">
      <h3 className="section-title mb-4">{title}</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full text-left ${
              action.variant === 'primary' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Data Table Component
interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  onRowClick,
  loading = false
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height="h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            {columns.map((column) => (
              <th key={String(column.key)} className="text-left py-3 px-4 text-slate-300 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id}
              className={`border-b border-slate-800 ${onRowClick ? 'hover:bg-slate-950/40 cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="py-4 px-4">
                  {column.render 
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export Button Component
interface ExportButtonProps {
  onExport: () => void;
  loading?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  loading = false
}) => {
  return (
    <button
      onClick={onExport}
      disabled={loading}
      className="btn-secondary flex items-center gap-2"
    >
      <Download size={16} />
      {loading ? 'Exporting...' : 'Export Report'}
    </button>
  );
};