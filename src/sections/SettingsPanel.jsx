import { X, Sun, Moon, Clock, Calendar, ToggleLeft, ToggleRight, DollarSign, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const timezones = [
  { label: 'Local Time', value: 'local' },
  { label: 'UTC', value: 0 },
  { label: 'EST (UTC-5)', value: -5 },
  { label: 'PST (UTC-8)', value: -8 },
  { label: 'GMT (UTC+0)', value: 0 },
  { label: 'CET (UTC+1)', value: 1 },
  { label: 'JST (UTC+9)', value: 9 }
];

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

export default function SettingsPanel({ 
  showSettings, setShowSettings, theme, setTheme, 
  clockVariant, setClockVariant, dateVariant, setDateVariant,
  layout, setLayout, showClock, setShowClock, showDate, setShowDate,
  format24h, setFormat24h, timezone, setTimezone,
  showCurrency, setShowCurrency, maxQuickLinks, setMaxQuickLinks,
  baseCurrency, setBaseCurrency, targetCurrencies, setTargetCurrencies
}) {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('zhuzh-theme', newTheme);
  };

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
    localStorage.setItem('zhuzh-base-currency', currency);
  };

  const handleTargetCurrencyToggle = (currency) => {
    let newTargets;
    if (targetCurrencies.includes(currency)) {
      newTargets = targetCurrencies.filter(c => c !== currency);
    } else if (targetCurrencies.length < 4) {
      newTargets = [...targetCurrencies, currency];
    } else {
      return; // Max 4 currencies
    }
    setTargetCurrencies(newTargets);
    localStorage.setItem('zhuzh-target-currencies', JSON.stringify(newTargets));
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={() => setShowSettings(false)} />
      <div className="w-80 bg-white shadow-xl transform transition-transform h-full duration-300 ease-in-out">
        <div className="h-full p-6 w-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-72 flex-1 pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Theme</h3>
                <div className="flex space-x-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Clock Settings
                </h3>
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show Clock</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowClock(!showClock);
                        localStorage.setItem('zhuzh-show-clock', !showClock);
                      }}
                    >
                      {showClock ? <ToggleRight className="h-5 w-5 text-blue-500" /> : <ToggleLeft className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Style</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['digital', 'analog', 'minimal'].map((variant) => (
                        <Button
                          key={variant}
                          variant={clockVariant === variant ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setClockVariant(variant);
                            localStorage.setItem('zhuzh-clock-variant', variant);
                          }}
                        >
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Format</span>
                    <div className="flex space-x-2">
                      <Button
                        variant={format24h ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setFormat24h(true);
                          localStorage.setItem('zhuzh-format-24h', true);
                        }}
                      >
                        24 Hour
                      </Button>
                      <Button
                        variant={!format24h ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setFormat24h(false);
                          localStorage.setItem('zhuzh-format-24h', false);
                        }}
                      >
                        12 Hour
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Timezone</span>
                    <select 
                      className="w-full p-2 border rounded text-sm"
                      value={timezone}
                      onChange={(e) => {
                        const value = e.target.value === 'local' ? 'local' : parseInt(e.target.value);
                        setTimezone(value);
                        localStorage.setItem('zhuzh-timezone', value);
                      }}
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Settings
                </h3>
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show Date</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowDate(!showDate);
                        localStorage.setItem('zhuzh-show-date', !showDate);
                      }}
                    >
                      {showDate ? <ToggleRight className="h-5 w-5 text-blue-500" /> : <ToggleLeft className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Style</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['full', 'compact', 'minimal', 'card'].map((variant) => (
                        <Button
                          key={variant}
                          variant={dateVariant === variant ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setDateVariant(variant);
                            localStorage.setItem('zhuzh-date-variant', variant);
                          }}
                        >
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Layout</h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: 'vertical', label: 'Vertical' },
                    { value: 'horizontal-clock-first', label: 'Clock → Date' },
                    { value: 'horizontal-date-first', label: 'Date → Clock' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={layout === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setLayout(option.value);
                        localStorage.setItem('zhuzh-layout', option.value);
                      }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Quick Links
                </h3>
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <div>
                    <span className="text-sm font-medium mb-2 block">Number of Links</span>
                    <select 
                      className="w-full p-2 border rounded text-sm"
                      value={maxQuickLinks}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setMaxQuickLinks(value);
                        localStorage.setItem('zhuzh-max-quick-links', value);
                      }}
                    >
                      {[5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} links
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Currency Converter
                </h3>
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show Currency</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowCurrency(!showCurrency);
                        localStorage.setItem('zhuzh-show-currency', !showCurrency);
                      }}
                    >
                      {showCurrency ? <ToggleRight className="h-5 w-5 text-blue-500" /> : <ToggleLeft className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Base Currency</span>
                    <select 
                      className="w-full p-2 border rounded text-sm"
                      value={baseCurrency}
                      onChange={(e) => handleBaseCurrencyChange(e.target.value)}
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="text-sm font-medium mb-2 block">Target Currencies (Max 4)</span>
                    <ScrollArea className="">
                      <div className="grid grid-cols-2 gap-1 pr-4">
                        {currencies.filter(c => c.code !== baseCurrency).map((currency) => (
                          <Button
                            key={currency.code}
                            variant={targetCurrencies.includes(currency.code) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleTargetCurrencyToggle(currency.code)}
                            disabled={!targetCurrencies.includes(currency.code) && targetCurrencies.length >= 4}
                            className="text-xs p-1 h-8"
                          >
                            {currency.symbol} {currency.code}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="text-xs text-gray-500 mt-1">
                      Selected: {targetCurrencies.length}/4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}