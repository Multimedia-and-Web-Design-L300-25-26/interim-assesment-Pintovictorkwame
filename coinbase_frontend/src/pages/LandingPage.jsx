import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CryptoTable from '../components/CryptoTable';
import AdvancedTrader from '../components/AdvancedTrader';
import CoinbaseOne from '../components/CoinbaseOne';
import BaseApp from '../components/BaseApp';
import CryptoBasics from '../components/CryptoBasics';
import TakeControl from '../components/TakeControl';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <CryptoTable />
                <AdvancedTrader />
                <CoinbaseOne />
                <BaseApp />
                <CryptoBasics />
                <TakeControl />
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
