"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { 
  User, 
  Settings, 
  LogOut, 
  Mail,
  Bell,
  HelpCircle,
  LogIn,
} from "lucide-react";

export default function UserMenu() {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  // Si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <a
        href="/auth/signin"
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow-md"
      >
        <LogIn className="w-4 h-4" />
        Connexion
      </a>
    );
  }

  // Si l'utilisateur est connecté
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-indigo-500 transition">
            <Avatar.Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "Avatar"}
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center w-full h-full font-bold text-sm">
              {user.name?.[0]?.toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar.Root>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 w-64 z-50"
        >
          {/* Header utilisateur */}
          <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
            <div className="flex items-center gap-3">
              <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden">
                <Avatar.Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "Avatar"}
                  className="w-full h-full object-cover"
                />
                <Avatar.Fallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center w-full h-full font-bold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </Avatar.Fallback>
              </Avatar.Root>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg cursor-pointer outline-none transition group"
            onClick={() => (window.location.href = "/user/profile")}
          >
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-200 transition">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Profil
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg cursor-pointer outline-none transition group"
            onClick={() => (window.location.href = "/settings")}
          >
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 transition">
              <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paramètres
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg cursor-pointer outline-none transition group"
            onClick={() => (window.location.href = "/notifications")}
          >
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 transition">
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer outline-none transition group"
            onClick={() => (window.location.href = "/help")}
          >
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 transition">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Aide & Support
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer outline-none transition group"
            onClick={() => signOut()}
          >
            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 transition">
              <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400">
              Déconnexion
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
