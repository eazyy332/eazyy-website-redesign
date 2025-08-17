import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileTabBar from "@/components/MobileTabBar";
import React, { useEffect } from "react";
import AddToHomeBanner from "@/components/AddToHomeBanner";
import AuthGuard from "@/components/AuthGuard";
import AuthPrompt from "@/components/AuthPrompt";
// FloatingCTA removed

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Help = lazy(() => import("./pages/Help"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OrderStart = lazy(() => import("./pages/OrderStart"));
const OrderServices = lazy(() => import("./pages/OrderServices"));
const ItemSelection = lazy(() => import("./pages/ItemSelection"));
const OrderScheduling = lazy(() => import("./pages/OrderScheduling"));
const OrderAddress = lazy(() => import("./pages/OrderAddress"));
const OrderPayment = lazy(() => import("./pages/OrderPayment"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const CustomQuote = lazy(() => import("./pages/CustomQuote"));
const QuoteConfirmation = lazy(() => import("./pages/QuoteConfirmation"));
const QuoteApproval = lazy(() => import("./pages/QuoteApproval"));
const DiscrepancyApproval = lazy(() => import("./pages/DiscrepancyApproval"));
const Notifications = lazy(() => import("./pages/Notifications"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Messages = lazy(() => import("./pages/Messages"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

const queryClient = new QueryClient();

function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => void 0);
    }
  }, []);
  return null;
}

function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ServiceWorkerRegistrar />
            <SiteHeader />
            <div className="pb-20 md:pb-0">{/* reserve space for mobile tab bar */}
              <Suspense fallback={<div className="p-6">Loading…</div>}>
                <ScrollToTop />
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />

                {/* Order Flow Routes */}
                <Route path="/order/start" element={<OrderStart />} />
                <Route path="/order/services" element={<OrderServices />} />
                <Route path="/order/items/:category" element={<ItemSelection />} />
                <Route path="/order/scheduling" element={
                  <AuthGuard requireAuth>
                    <OrderScheduling />
                  </AuthGuard>
                } />
                <Route path="/order/address" element={
                  <AuthGuard requireAuth>
                    <OrderAddress />
                  </AuthGuard>
                } />
                <Route path="/order/payment" element={
                  <AuthGuard requireAuth>
                    <OrderPayment />
                  </AuthGuard>
                } />
                <Route path="/order/confirmation" element={
                  <AuthGuard requireAuth>
                    <OrderConfirmation />
                  </AuthGuard>
                } />
                <Route path="/order/custom-quote" element={<CustomQuote />} />
                <Route path="/quote/confirmation" element={<QuoteConfirmation />} />
                <Route path="/quote-approval/:quoteId" element={
                  <AuthGuard requireAuth>
                    <QuoteApproval />
                  </AuthGuard>
                } />
                <Route path="/discrepancy/:orderId" element={
                  <AuthGuard requireAuth>
                    <DiscrepancyApproval />
                  </AuthGuard>
                } />
                <Route path="/notifications" element={
                  <AuthGuard requireAuth>
                    <Notifications />
                  </AuthGuard>
                } />
                <Route path="/orders" element={
                  <AuthGuard requireAuth>
                    <OrderHistory />
                  </AuthGuard>
                } />
                <Route path="/order/:id" element={
                  <AuthGuard requireAuth>
                    <OrderHistory />
                  </AuthGuard>
                } />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/messages" element={
                  <AuthGuard requireAuth>
                    <Messages />
                  </AuthGuard>
                } />

                {/* Legacy Routes */}
                <Route path="/personal" element={<Services />} />
                <Route path="/business" element={<Services />} />
                <Route path="/company" element={<About />} />
                <Route path="/complaints" element={<Help />} />
                <Route path="/cookie-policy" element={<Privacy />} />
                <Route path="/website-terms" element={<Privacy />} />
                <Route path="/legal-agreements" element={<Privacy />} />
                <Route path="/modern-slavery-policy" element={<Privacy />} />
                <Route path="/terms" element={<Privacy />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <AddToHomeBanner />
            <MobileTabBar />
            <SiteFooter />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
