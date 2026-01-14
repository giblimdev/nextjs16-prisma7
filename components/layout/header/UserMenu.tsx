"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "@/lib/auth/auth-client";

export default function UserMenu() {
  // Récupération de la session depuis Better Auth
  const { data: sessionData } = useSession();
  const user = sessionData?.user; // Extraction de l'utilisateur

  // Si l'utilisateur n'est pas connecté, afficher un bouton Connexion
  if (!user) {
    return (
      <a
        href="/auth/signin"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Connexion
      </a>
    );
  }

  // Si l'utilisateur est connecté, afficher avatar + menu
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <Avatar.Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "Avatar"}
            className="w-full h-full object-cover"
          />
          <Avatar.Fallback className="bg-indigo-500 text-white flex items-center justify-center w-full h-full">
            {user.name?.[0] || "U"}
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={5}
        className="bg-white rounded-lg shadow-lg p-2 w-48"
      >
        <DropdownMenu.Item
          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          onClick={() => (window.location.href = "/profile")}
        >
          Profil
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          onClick={() => (window.location.href = "/settings")}
        >
          Paramètres
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
        <DropdownMenu.Item
          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-500"
          onClick={() => signOut()}
        >
          Déconnexion
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
