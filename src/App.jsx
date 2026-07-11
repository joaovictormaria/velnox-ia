import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import ServicesPage from '@/pages/Services';
import PricingPage from '@/pages/Pricing';
import AboutPage from '@/pages/About';
import FAQPage from '@/pages/FAQ';
import ContactPage from '@/pages/Contact';
import BudgetPage from '@/pages/Budget';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/planos" element={<PricingPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/orcamento" element={<BudgetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
