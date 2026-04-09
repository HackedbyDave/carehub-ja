import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark text-dark-foreground mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏥</span>
            <span className="font-heading text-xl font-bold">CareHub JA</span>
          </div>
          <p className="text-sm text-dark-foreground/70">Your Prescription, Delivered Safely. Connecting Jamaica with quality healthcare through technology.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Shop</h4>
          <div className="space-y-2 text-sm text-dark-foreground/70">
            <Link to="/products" className="block hover:text-gold transition-colors">All Medications</Link>
            <Link to="/products?category=prescription" className="block hover:text-gold transition-colors">Prescription Drugs</Link>
            <Link to="/products?category=otc" className="block hover:text-gold transition-colors">OTC Medications</Link>
            <Link to="/products?category=vitamins" className="block hover:text-gold transition-colors">Vitamins & Supplements</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Company</h4>
          <div className="space-y-2 text-sm text-dark-foreground/70">
            <Link to="/about" className="block hover:text-gold transition-colors">About Us</Link>
            <Link to="/contact" className="block hover:text-gold transition-colors">Contact</Link>
            <Link to="/pharmacies" className="block hover:text-gold transition-colors">Find a Pharmacy</Link>
            <Link to="/privacy" className="block hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="block hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm text-dark-foreground/70 mb-4">Get health tips and medication reminders delivered to your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-lg bg-dark-foreground/10 text-sm border border-dark-foreground/20 placeholder:text-dark-foreground/40" />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-dark-foreground/10 mt-8 pt-8 text-center text-sm text-dark-foreground/50">
        © 2026 CareHub JA. All rights reserved. Made with 💚 in Jamaica.
      </div>
    </div>
  </footer>
);

export default Footer;
