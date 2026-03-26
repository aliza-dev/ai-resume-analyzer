import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NavbarProps { onMenuClick: () => void; }

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-slate-950/80 lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="hidden text-sm font-semibold text-gray-500 dark:text-gray-400 sm:block">
          AI Resume Analyzer
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <button onClick={() => navigate("/profile")} className="flex cursor-pointer items-center gap-3 border-l border-gray-200 pl-3 transition-opacity hover:opacity-80 dark:border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
            <p className="text-[11px] capitalize text-gray-500 dark:text-gray-500">{user?.role?.replace(/_/g, " ") || "Member"}</p>
          </div>
        </button>

        <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-xl text-gray-400 hover:text-red-400">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
