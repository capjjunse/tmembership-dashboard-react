import Header from './components/Header';
import Nav from './components/Nav';
import Overview from './components/Overview';
import RegularBenefits from './components/RegularBenefits';
import MonthlyBenefits from './components/MonthlyBenefits';
import VipBenefits from './components/VipBenefits';
import History from './components/History';
import News from './components/News';
import Sentiment from './components/Sentiment';
import Trend from './components/Trend';
import NonTelecom from './components/NonTelecom';
import AIInsight from './components/AIInsight';
import UpdateWidget from './components/UpdateWidget';

export default function App() {
  return (
    <div className="page">
      <Header />
      <Nav />
      <Overview />
      <RegularBenefits />
      <MonthlyBenefits />
      <VipBenefits />
      <History />
      <News />
      <Sentiment />
      <Trend />
      <NonTelecom />
      <AIInsight />
      <UpdateWidget />
    </div>
  );
}
