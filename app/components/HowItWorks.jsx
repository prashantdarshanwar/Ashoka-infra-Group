import { Search, MapPin, Headset } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: <Search size={32}/>, title: "Search Your Location", desc: "Find your perfect home using our advanced search filters." },
    { icon: <MapPin size={32}/>, title: "Visit Your Dream Home", desc: "Schedule a property tour at your convenience." },
    { icon: <Headset size={32}/>, title: "Talk to Our Expert Agents", desc: "Get professional guidance and close the deal." }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-gray-800">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="text-blue-900 bg-blue-50 p-3 rounded-full">{step.icon}</div>
            <div>
              <h4 className="font-bold text-gray-800">{step.title}</h4>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}