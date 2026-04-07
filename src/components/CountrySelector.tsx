import { COUNTRIES, type Country } from "@/lib/countries";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface CountrySelectorProps {
  onSelect: (country: Country) => void;
  selectedCountry?: Country;
}

const CountrySelector = ({ onSelect, selectedCountry }: CountrySelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {COUNTRIES.map((country) => {
        const isSelected = selectedCountry?.code === country.code;
        return (
          <Card
            key={country.code}
            className={`
              relative overflow-hidden cursor-pointer transition-all duration-300
              hover:scale-105 hover:shadow-elevated group
              ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""}
            `}
            onClick={() => onSelect(country)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{country.flag}</div>
                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-blue-500 animate-fade-in" />
                )}
              </div>

              <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                {country.nameAr}
              </h3>
              <p className="text-sm text-gray-500">{country.name}</p>

              <div
                className={`
                  absolute bottom-0 left-0 right-0 h-1 transition-all duration-300
                  ${isSelected ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  background: `linear-gradient(90deg, ${country.primaryColor}, ${country.secondaryColor})`,
                }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CountrySelector;
