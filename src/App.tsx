import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import { FeatureScheduleProvider } from "@/hooks/useFeatureSchedule";
import { PromotionProvider } from "@/hooks/usePromotion";
import { AppSettingsProvider } from "@/hooks/useAppSettings";
import { ChatProvider } from "@/contexts/ChatContext";
import { FloatingChatContainer } from "@/components/FloatingChat";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NumerologyMap from "./pages/NumerologyMap";
import Chat from "./pages/Chat";
import History from "./pages/History";
import FavorableDates from "./pages/FavorableDates";

import ProfilePage from "./pages/Profile";
import Compatibility from "./pages/Compatibility";
import BrandAnalyzer from "./pages/BrandAnalyzer";
import Pillars from "./pages/Pillars";

import HouseAnalyzer from "./pages/HouseAnalyzer";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import PersonalYear from "./pages/PersonalYear";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Soulmates from "./pages/Soulmates";
import DatingChat from "./pages/DatingChat";
import SoulmatesLanding from "./pages/SoulmatesLanding";
import LandingPageClean from "./pages/LandingPageClean";
import LandingA from "./pages/LandingA";
import LandingB from "./pages/LandingB";
import LandingC from "./pages/LandingC";
import EditLanding from "./pages/EditLanding";
import LandingBEditable from "./pages/LandingBEditable";
import { loadSavedContent } from "./pages/landingBContent";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppSettingsProvider>
        <SubscriptionProvider>
        <FeatureScheduleProvider>
        <PromotionProvider>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<LandingBEditable content={loadSavedContent()} />} />
            <Route path="/old-landing" element={<LandingPage />} />
            <Route path="/landing-v2" element={<LandingPageClean />} />
            <Route path="/landing-a" element={<LandingA />} />
            <Route path="/landing-b" element={<LandingBEditable content={loadSavedContent()} />} />
            <Route path="/landing-c" element={<LandingC />} />
            <Route path="/edit-landing" element={<EditLanding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/map" element={<ProtectedRoute route="/map"><NumerologyMap /></ProtectedRoute>} />
            <Route path="/personal-year" element={<ProtectedRoute route="/personal-year"><PersonalYear /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute route="/chat"><Chat /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute route="/history"><History /></ProtectedRoute>} />
            <Route path="/dates" element={<ProtectedRoute route="/dates"><FavorableDates /></ProtectedRoute>} />

            <Route path="/compatibility" element={<ProtectedRoute route="/compatibility"><Compatibility /></ProtectedRoute>} />
            <Route path="/brand" element={<ProtectedRoute route="/brand"><BrandAnalyzer /></ProtectedRoute>} />
            <Route path="/pillars" element={<ProtectedRoute route="/pillars"><Pillars /></ProtectedRoute>} />

            <Route path="/house" element={<ProtectedRoute route="/house"><HouseAnalyzer /></ProtectedRoute>} />
            <Route path="/community" element={<Community />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/soulmates" element={<Soulmates />} />
            <Route path="/dating-chat/:chatId" element={<DatingChat />} />
            <Route path="/trova-anima-gemella" element={<SoulmatesLanding />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChatContainer />
        </ChatProvider>
        </PromotionProvider>
        </FeatureScheduleProvider>
        </SubscriptionProvider>
        </AppSettingsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
