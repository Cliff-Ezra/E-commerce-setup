import DashboardNav from "@/components/navigation/dashboard-nav";
import { DashboardLinkType } from "@/types/dashboard";
import { auth } from "@/server/auth";
import {
  BarChart,
  Package,
  PenSquare,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session = await auth();

  const userLinks: DashboardLinkType = [
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <TruckIcon size={16} />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <SettingsIcon size={16} />,
    },
  ] as const;

  const adminLinks: DashboardLinkType =
    session?.user.role === "admin"
      ? ([
          {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <BarChart size={16} />,
          },
          {
            label: "Create",
            path: "/dashboard/add-product",
            icon: <PenSquare size={16} />,
          },
          {
            label: "Products",
            path: "/dashboard/products",
            icon: <Package size={16} />,
          },
        ] as const)
      : ([] as const);

  const allLinks: DashboardLinkType = [...adminLinks, ...userLinks];

  return (
    <div>
      <DashboardNav allLinks={allLinks} />
      {children}
    </div>
  );
}
