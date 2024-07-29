"use client";

import { useState } from "react";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  TicketPercent,
  Layers,
  Flag,
  ChevronLeft,
} from "lucide-react";

import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";
import { ThemeToggle } from "../theme/ThemeToggle";
import UserMenu from "./others/UserMenu";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`sticky top-0 left-0 bg-white dark:bg-slate-950 z-50 min-w-[80px] max-h-screen border-r ${
        isCollapsed ? "px-0" : "px-3"
      }  pb-10 pt-16 flex flex-col items-center justify-between`}
    >
      <UserMenu />

      <div
        className={`absolute right-[-20px] top-4 ${
          mobileWidth ? "hidden" : "visible"
        }`}
      >
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            variant: "ghost",
          },
          {
            title: "Customers",
            href: "/admin/customers",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/admin/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Products",
            href: "/admin/products",
            icon: ShoppingBag,
            variant: "ghost",
          },
          {
            title: "Categories",
            href: "/admin/categories",
            icon: Layers,
            variant: "ghost",
          },
          {
            title: "Attributes",
            href: "/admin/attributes",
            icon: Flag,
            variant: "ghost",
          },
          {
            title: "Coupons",
            href: "/admin/coupons",
            icon: TicketPercent,
            variant: "ghost",
          },
          {
            title: "Transactions",
            href: "/admin/transactions",
            icon: CreditCard,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
      <ThemeToggle />
    </div>
  );
}
