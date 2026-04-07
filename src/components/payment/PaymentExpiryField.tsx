import React from 'react';

interface PaymentExpiryFieldProps {
  label: string;
  error?: string;
  monthValue: string;
  yearValue: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  helpText?: string;
}

export const PaymentExpiryField: React.FC<PaymentExpiryFieldProps> = ({
  label,
  error,
  monthValue,
  yearValue,
  onMonthChange,
  onYearChange,
  helpText,
}) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      value: month.toString().padStart(2, '0'),
      label: month.toString().padStart(2, '0'),
    };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  return (
    <div className="payment-form__field payment-form__field--expiry w-full mb-4">
      <label className="payment-form__label block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="payment-form__expiry-selects flex gap-2">
        <select
          className={`
            payment-form__select payment-form__select--month
            flex-1 h-12 px-4
            text-gray-900
            border rounded-lg
            bg-white
            transition-all duration-300
            cursor-pointer
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            focus:outline-none
          `}
          value={monthValue}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          className={`
            payment-form__select payment-form__select--year
            flex-1 h-12 px-4
            text-gray-900
            border rounded-lg
            bg-white
            transition-all duration-300
            cursor-pointer
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            focus:outline-none
          `}
          value={yearValue}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="payment-form__error text-red-500 text-xs mt-1">
          {error}
        </p>
      )}

      {!error && helpText && (
        <p className="payment-form__help-text text-gray-500 text-xs mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default PaymentExpiryField;
