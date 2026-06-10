import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light';
  return (
    <button
      className="theme-switch"
      onClick={onToggle}
      title={isLight ? 'Dark Mode' : 'Light Mode'}
      aria-label="Theme umschalten"
    >
      <div className="theme-switch-knob">
        {isLight ? (
          <Sun size={12} color="#fff" strokeWidth={2.5} />
        ) : (
          <Moon size={12} color="#fff" strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
}
