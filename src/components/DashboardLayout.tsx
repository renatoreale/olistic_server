import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPromotionBanner } from "@/components/PromotionBanner";
import ChatNotificationBadge from "@/components/ChatNotificationBadge";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Map, MessageCircle, Calendar,
  User, Users, Target, Compass, ScrollText, LogOut, Home, Crown, Shield, Heart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Kept as fallback for profiles without role column yet
const ADMIN_EMAILS = ["regnew01@gmail.com", "marahoney1973@gmail.com", "realerenato@gmail.com"];

const menuItems = [
  { titleKey: "menu.dashboard", icon: Home, href: "/dashboard" },
  { titleKey: "menu.numerologyMap", icon: Map, href: "/map" },
  { titleKey: "menu.chatExpert", icon: MessageCircle, href: "/chat" },
  { titleKey: "menu.favorableDates", icon: Calendar, href: "/dates" },
  { titleKey: "menu.personalYear", icon: Calendar, href: "/personal-year" },
  { titleKey: "menu.pillarsGrowth", icon: Compass, href: "/pillars" },
  { titleKey: "menu.brandAnalyzer", icon: Target, href: "/brand" },
  { titleKey: "menu.houseVibration", icon: Home, href: "/house" },
  { titleKey: "menu.compatibility", icon: Users, href: "/compatibility" },
  { titleKey: "menu.community", icon: MessageCircle, href: "/community" },
  { titleKey: "menu.soulmates", icon: Heart, href: "/soulmates" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  headerActions?: ReactNode;
}

function AppSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isFreeMode, isSoulmatesBeta } = useAppSettings();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const email = session.user.email || null;
      setUserEmail(email);
      // Check role from profile (DB source of truth)
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();
      const role = (profile as any)?.role;
      setIsAdmin(role === "admin" || role === "superadmin");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="z-20 border-r border-border/50">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className="px-4 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#C9184A" }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-display text-sm font-semibold truncate">
              {t("common.appName")}
            </span>
          )}
        </div>

        {/* Services */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {t("menu.services")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      end={item.href === "/dashboard"}
                      className="flex items-center gap-2 hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="truncate text-sm">{t(item.titleKey)}</span>
                          {item.href === "/soulmates" && isSoulmatesBeta && (
                            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none" style={{ background: "rgba(201,24,74,0.15)", color: "#C9184A", border: "1px solid rgba(201,24,74,0.3)" }}>
                              β Beta
                            </span>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {!isFreeMode && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/pricing" className="flex items-center gap-2 hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <Crown className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="truncate text-sm">{t("menu.plansAndPricing")}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className="flex items-center gap-2 hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                    <User className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate text-sm">{t("dashboard.profile")}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin" className="flex items-center gap-2 hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <Shield className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="truncate text-sm">{t("dashboard.controlPanel")}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 text-destructive hover:text-destructive">
                  <LogOut className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate text-sm">{t("menu.logout")}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout({ children, title, headerActions }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-white/90 backdrop-blur-sm sticky top-0 z-10">
            <div className="px-4 md:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="shrink-0" />
                {title && (
                  <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">{title}</h1>
                )}
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher size="sm" />
                <ChatNotificationBadge />
                {headerActions}
              </div>
            </div>
          </header>

          <DashboardPromotionBanner />

          <main className="flex-1 overflow-auto bg-muted/40">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
