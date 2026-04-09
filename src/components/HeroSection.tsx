import { Search, Upload, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm">🇯🇲</span>
            <span className="text-xs font-medium text-primary-foreground/90">Jamaica's Trusted Digital Pharmacy</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
            Your Prescription,<br />
            <span className="text-gradient-gold">Delivered Safely</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
            Upload your prescription, connect with licensed doctors, find medications across verified pharmacies, and get them delivered to your door.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medications, pharmacies..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-foreground/30 transition-colors"
            >
              <Upload className="h-4 w-4" /> Upload Prescription
            </button>
            <button
              onClick={() => navigate("/pharmacies")}
              className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-foreground/30 transition-colors"
            >
              <MapPin className="h-4 w-4" /> Find a Pharmacy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
