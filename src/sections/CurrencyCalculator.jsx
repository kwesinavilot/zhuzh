import { useState, useEffect } from 'react';
import { Calculator, RefreshCw, ArrowRightLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
];

export default function CurrencyCalculator({ theme = 'light', onClose }) {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('1000000');
  const [fromCurrency, setFromCurrency] = useState('NGN');
  const [toCurrency, setToCurrency] = useState('GHS');
  const [result, setResult] = useState(0);

  const bgColor = 'bg-white';
  const textColor = 'text-gray-900';

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency, rates]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const appId = 'c9802fe961f94cccba40bc51e3522a18';
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
      const data = await response.json();
      
      if (data.rates) {
        setRates(data.rates);
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
    setLoading(false);
  };

  const calculateConversion = () => {
    if (!rates[fromCurrency] || !rates[toCurrency] || !amount) {
      setResult(0);
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setResult(0);
      return;
    }

    // Convert to USD first, then to target currency
    const usdAmount = numAmount / rates[fromCurrency];
    const convertedAmount = usdAmount * rates[toCurrency];
    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onClose?.()} />
      <div className={`${bgColor} rounded-lg shadow-xl p-6 w-[400px] relative`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className={`h-4 w-4 mr-2 ${textColor}`} />
            <h3 className={`text-sm font-medium ${textColor}`}>Currency Calculator</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchRates}
              disabled={loading}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <RefreshCw className={`h-3 w-3 ${textColor} ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onClose?.()}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className={`h-3 w-3 ${textColor}`} />
            </Button>
          </div>
        </div>

      <div className="space-y-3">
        {/* Amount Input */}
          <div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

        {/* From Currency */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${textColor} w-12`}>From:</span>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={swapCurrencies}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ArrowRightLeft className={`h-4 w-4 ${textColor}`} />
            </Button>
          </div>

        {/* To Currency */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${textColor} w-12`}>To:</span>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Result */}
          <div className="p-3 bg-gray-50 rounded-md border">
            <div className={`text-xs ${textColor} opacity-75 mb-1`}>Result:</div>
            <div className={`text-lg font-mono ${textColor}`}>
              {getCurrencySymbol(toCurrency)} {formatNumber(result)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}