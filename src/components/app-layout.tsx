'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Info, LayoutDashboard, PanelLeft, Waves } from 'lucide-react';
import { Button } from './ui/button';
import { ArgoExplorerLogo } from './icons';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/chatbot', icon: Bot, label: 'Chatbot' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/about', icon: Info, label: 'About' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <PanelLeft />
            </Button>
            <ArgoExplorerLogo className="size-8 text-primary" />
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              ARGO Explorer
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: 'bg-sidebar text-sidebar-foreground border-sidebar-border',
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content can go here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
