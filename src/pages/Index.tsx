import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, Clock, Upload, MapPin, Bell, Stethoscope } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products, categories, vendors } from "@/data/products";

const Index = () => {
  const featured = products.filter((p) => p.isFeatured);
  const bundles = products.filter((p) => p.isBundle);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Trust bar */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Same-Day Delivery</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Licensed Pharmacies</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Real-Time Availability</div>
            <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-accent" /> Verified Prescriptions</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">How CareHub JA Works</h2>
          <p className="text-muted-foreground">Get your medications in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-card rounded-lg shadow-card p-8">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Upload Prescription</h3>
            <p className="text-sm text-muted-foreground">Take a photo or upload your prescription. A licensed doctor reviews and approves it digitally.</p>
          </div>
          <div className="text-center bg-card rounded-lg shadow-card p-8">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Find Your Medication</h3>
            <p className="text-sm text-muted-foreground">Check real-time availability and prices across verified pharmacies near you across Jamaica.</p>
          </div>
          <div className="text-center bg-card rounded-lg shadow-card p-8">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Deliver or Pickup</h3>
            <p className="text-sm text-muted-foreground">Choose home delivery or in-store pickup. Track your order in real time from pharmacy to door.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Browse Categories</h2>
            <p className="text-muted-foreground">Find the medications and health products you need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="bg-card rounded-lg shadow-card hover:shadow-card-hover p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-body font-semibold text-sm text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medications */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">Popular Medications</h2>
            <p className="text-muted-foreground mt-1">Most ordered across Jamaican pharmacies</p>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Health Bundles */}
      <section className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Health Bundles</h2>
            <p className="text-muted-foreground">Save with curated medication and wellness packages</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((b) => (
              <Link key={b.id} to={`/product/${b.id}`} className="bg-card rounded-lg shadow-card hover:shadow-card-hover p-6 flex gap-6 transition-all duration-300">
                <img src={b.image} alt={b.name} loading="lazy" width={400} height={400} className="w-32 h-32 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">{b.badge}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{b.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{b.description}</p>
                  {b.bundleItems && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {b.bundleItems.map((item) => (
                        <span key={item} className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{item}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-lg">J${b.price.toLocaleString()}</span>
                    {b.originalPrice && <span className="text-sm text-muted-foreground line-through">J${b.originalPrice.toLocaleString()}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Medication Reminder CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <Bell className="h-10 w-10 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl font-bold mb-3">Never Miss a Dose</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Set up medication reminders and auto-refill alerts. CareHub JA keeps you on track with your health.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Partner Pharmacies */}
      <section className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Trusted Partner Pharmacies</h2>
            <p className="text-muted-foreground">Licensed pharmacies across Jamaica on our platform</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {vendors.map((v) => (
              <div key={v.id} className="bg-card rounded-lg shadow-card p-5 text-center hover:shadow-card-hover transition-all duration-300">
                <span className="text-4xl mb-3 block">{v.image}</span>
                <h3 className="font-body font-semibold text-sm text-foreground mb-1">{v.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">📍 {v.location}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs font-medium">{v.rating}</span>
                  <span className="text-xs text-muted-foreground">· {v.products} items</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pharmacies" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View All Pharmacies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
