"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";

// --- Types ---------------------------------------------------------

interface MenuItem {
  label: string;
  href: string;
  description?: string;
  children?: MenuItem[];
}

// --- Données de menu -----------------------------------------------

const menuItems: MenuItem[] = [
  {
    label: "Accueil",
    href: "/",
    description: "Page d'accueil du site",
  },
  {
    label: "À propos",
    href: "/about",
    description: "En savoir plus sur nous",
    
  },
    {
    label: "Admin",
    href: "/admin",
    description: "Section développement",
    children: []
    },
  {
    label: "Dev",
    href: "/dev",
    description: "Section développement",
    children: [
      {
        label: "Features",
        href: "/dev/features",
        description: "Gestion des features et backlog",
      },
      {
        label: "Documentation API",
        href: "/dev/docs",
        description: "Documentation complète de l'API",
      },
      {
        label: "Schéma Prisma",
        href: "/dev/schema",
        description: "Documentation du schéma de base de données",
      },
      {
        label: "Composants",
        href: "/dev/components",
        description: "Bibliothèque de composants UI",
      },
      {
        label: "Utilitaires",
        href: "/dev/utils",
        description: "Fonctions et utilitaires partagés",
      },
    ],
  },
];

// --- Desktop Nav ---------------------------------------------------

function DesktopNav() {
  const pathname = usePathname();

  const renderMenuItem = (item: MenuItem) => {
    const isActive =
      pathname === item.href || pathname?.startsWith(`${item.href}/`);

    if (item.children && item.children.length > 0) {
      return (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuTrigger
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
              {item.children.map((child) => (
                <NavigationMenuLink asChild key={child.href}>
                  <Link
                    href={child.href}
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      pathname === child.href ? "bg-accent" : ""
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      {child.label}
                    </div>
                    {child.description && (
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {child.description}
                      </p>
                    )}
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink asChild>
          <Link
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent"
            )}
          >
            {item.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>{menuItems.map(renderMenuItem)}</NavigationMenuList>
    </NavigationMenu>
  );
}

// --- Mobile Nav ----------------------------------------------------

function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const renderMobileMenuItem = (item: MenuItem, depth = 0) => {
    const isActive =
      pathname === item.href || pathname?.startsWith(`${item.href}/`);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.href} className="space-y-2">
        <div
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Link
            href={item.href}
            className="flex-1"
            onClick={() => !hasChildren && setOpen(false)}
          >
            <span className="font-medium">{item.label}</span>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            )}
          </Link>
          {hasChildren && <ChevronRight className="h-4 w-4 ml-2" />}
        </div>

        {hasChildren && depth === 0 && (
          <div className="ml-4 space-y-1 border-l-2 border-border pl-3">
            {item.children!.map((child) =>
              renderMobileMenuItem(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-75 sm:w-100">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Menu de navigation principal
        </SheetDescription>

        <div className="flex flex-col gap-4 py-6">
          <div className="px-3">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          </div>
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => renderMobileMenuItem(item))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


export default function Nav() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
