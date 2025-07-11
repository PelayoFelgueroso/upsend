export interface UISettings {
  theme: "light" | "dark" | "system";
  language: string;
  sidebarCollapsed: boolean;
  compactMode: boolean;
  showNotifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
  dateFormat: "relative" | "absolute";
  timezone: string;
}

export interface SettingsContextType {
  settings: UISettings;
  updateSettings: (updates: Partial<UISettings>) => void;
  resetSettings: () => void;
  isLoading: boolean;
}
