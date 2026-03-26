import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Brain, ArrowRight, Sparkles, Zap } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { API_URL, TOKEN_KEY } from "@/utils/constants";

// ── Initialize Stripe.js ONCE outside the component (industry standard) ──
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const freePlan = {
  name: "Basic",
  price: "Free",
  tagline: "Perfect for trying it out",
  features: [
    "1 Resume Upload",
    "Basic ATS Score",
    "Top 3 AI Suggestions",
    "Resume Preview",
  ],
};

const proPlan = {
  name: "Pro",
  price: "$4.99",
  period: "/mo",
  tagline: "Land your dream job faster",
  features: [
    "Unlimited Resume Scans",
    "Full AI Analysis & Scores",
    "AI Cover Letters & Bios",
    "Mock Interview Prep",
    "Job Match & Skill Gap",
    "Career Growth Roadmap",
    "AI Chat Assistant",
    "PDF Report Downloads",
    "Priority Support",
  ],
};

export function PricingPage() {
  const { isAuthenticated, user, loadUser } = useAuth();
  const isPro = user?.isPro === true;
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Ensure auth state is loaded on this public page
  useEffect(() => { loadUser(); }, []);

  const handleUpgrade = async () => {
    setIsUpgrading(true);

    try {
      // Get token — if missing, redirect to login
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        window.location.href = "/login";
        return;
      }

      // 1. Call backend to create a Stripe Checkout Session
      const res = await fetch(`${API_URL}/stripe/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // If unauthorized, redirect to login silently
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("[Stripe] Backend error:", res.status, errData);
        toast.error(errData.message || "Failed to create checkout session");
        return;
      }

      const data = await res.json();

      // 2. Redirect using Stripe.js (preferred) or fallback to URL
      if (stripePromise && data.id) {
        const stripe = await stripePromise;
        if (!stripe) {
          console.error("[Stripe] Failed to load Stripe.js");
          toast.error("Payment system failed to load. Please refresh and try again.");
          return;
        }

        // @ts-ignore
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
        if (error) {
          console.error("[Stripe] redirectToCheckout error:", error.message);
          toast.error(error.message || "Checkout redirect failed");
        }
      } else if (data.url) {
        // Fallback: direct URL redirect (works even without VITE_STRIPE_PUBLISHABLE_KEY)
        window.location.href = data.url;
      } else {
        console.error("[Stripe] No session ID or URL returned:", data);
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (err) {
      console.error("[Stripe] Checkout error:", err);
      toast.error("Failed to connect to payment server. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">Resume<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span></span>
        </Link>
        <Link to={isAuthenticated ? "/dashboard" : "/login"}>
          <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white">
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </Button>
        </Link>
      </nav>

      {/* Header */}
      <div className="relative overflow-hidden px-6 pb-10 pt-10 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
        </div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Sparkles className="h-4 w-4" /> Simple, honest pricing
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Pick the plan that{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">works for you</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">No hidden fees. Cancel anytime. Start free and upgrade when you're ready.</p>
        </motion.div>
      </div>

      {/* Plans */}
      <div className="mx-auto grid max-w-4xl gap-6 px-6 pb-24 md:grid-cols-2">
        {/* Free Plan */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-400">{freePlan.name}</p>
            <p className="mt-2 text-4xl font-extrabold">{freePlan.price}</p>
            <p className="mt-1 text-sm text-gray-500">{freePlan.tagline}</p>
          </div>
          <ul className="mb-8 flex-1 space-y-3">
            {freePlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                <Check className="h-4 w-4 flex-shrink-0 text-gray-500" /> {f}
              </li>
            ))}
          </ul>
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
              {isAuthenticated ? "Go to Dashboard" : "Start Free Today"}
            </Button>
          </Link>
        </motion.div>

        {/* Pro Plan */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="relative flex flex-col rounded-2xl border-2 border-indigo-500/50 bg-gradient-to-b from-indigo-500/[0.08] to-transparent p-8 shadow-xl shadow-indigo-500/10">
          {/* Popular badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-indigo-500/40">
              MOST POPULAR
            </span>
          </div>
          <div className="mb-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
              <Zap className="h-4 w-4" /> {proPlan.name}
            </p>
            <p className="mt-2 text-4xl font-extrabold">
              {proPlan.price}<span className="text-lg font-normal text-gray-500">{proPlan.period}</span>
            </p>
            <p className="mt-1 text-sm text-gray-400">{proPlan.tagline}</p>
          </div>
          <ul className="mb-8 flex-1 space-y-3">
            {proPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-200">
                <Check className="h-4 w-4 flex-shrink-0 text-indigo-400" /> {f}
              </li>
            ))}
          </ul>
          {isPro ? (
            <Button disabled className="w-full">You're on Pro ✓</Button>
          ) : (
            <Button className="w-full gap-2 shadow-xl shadow-indigo-500/25" onClick={handleUpgrade} isLoading={isUpgrading}>
              {isUpgrading ? "Redirecting to checkout..." : "Upgrade to Pro"} {!isUpgrading && <ArrowRight className="h-4 w-4" />}
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}