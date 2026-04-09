import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="font-heading text-xl font-bold text-primary">CareHub JA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Medications</Link>
            <Link to="/pharmacies" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pharmacies</Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/products" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Search className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link to="/cart" className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Link>
            {user ? (
              <Link to="/dashboard" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <User className="h-5 w-5 text-muted-foreground" />
              </Link>
            ) : (
              <Link to="/auth" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <LogIn className="h-5 w-5 text-muted-foreground" />
              </Link>
            )}
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Medications</Link>
            <Link to="/pharmacies" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Pharmacies</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Contact</Link>
            {!user && (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-primary">Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
