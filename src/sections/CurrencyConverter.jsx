import { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
  { code: 'KSH', name: 'Kenyan Shilling', symbol: 'Ksh' }
];

export default function CurrencyConverter({ theme = 'light', baseCurrency, targetCurrencies }) {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const bgColor = theme === 'dark' ? 'bg-black/20' : 'bg-white/20';
  const textColor = theme === 'dark' ? 'text-white' : 'text-white';

  useEffect(() => {
    fetchRates();
  }, [baseCurrency, targetCurrencies]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const appId = 'c9802fe961f94cccba40bc51e3522a18';
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
      const data = await response.json();
      
      if (data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
    setLoading(false);
  };

  const convertFromUSD = (toCurrency, amount = 1) => {
    if (!rates[toCurrency]) return 0;
    return amount * rates[toCurrency];
  };

  const convertToBase = (fromCurrency, amount = 1) => {
    if (!rates[baseCurrency] || !rates[fromCurrency]) return 0;
    
    // Convert from source currency to USD, then USD to base currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[baseCurrency];
  };

  const getCurrencySymbol = (code) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  if (!baseCurrency || !targetCurrencies || targetCurrencies.length === 0) {
    return null;
  }

  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-lg p-4 min-w-[250px]`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <DollarSign className={`h-4 w-4 mr-2 ${textColor}`} />
          <h3 className={`text-sm font-medium ${textColor}`}>Currency</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchRates}
          disabled={loading}
          className="h-6 w-6 p-0 hover:bg-white/20"
        >
          <RefreshCw className={`h-3 w-3 ${textColor} ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-2">
        <div className={`text-xs ${textColor} opacity-75 mb-2`}>
          Base: {getCurrencySymbol(baseCurrency)} {baseCurrency}
        </div>
        
        {loading ? (
          <div className={`text-sm ${textColor} text-center py-2`}>
            Loading rates...
          </div>
        ) : (
          targetCurrencies.map((currency) => {
            const rate = baseCurrency === 'USD' 
              ? convertFromUSD(currency) 
              : convertToBase(currency);
            
            return (
              <div key={currency} className="flex items-center justify-between">
                <span className={`text-sm ${textColor}`}>
                  {getCurrencySymbol(currency)} 1 {currency}
                </span>
                <span className={`text-sm font-mono ${textColor}`}>
                  {rate > 0 ? `${getCurrencySymbol(baseCurrency)} ${rate.toFixed(2)}` : '--'}
                </span>
              </div>
            );
          })
        )}
      </div>

      {lastUpdated && (
        <div className={`text-xs ${textColor} opacity-50 mt-2`}>
          Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}