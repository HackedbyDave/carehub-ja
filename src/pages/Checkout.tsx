import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const shipping = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Order Placed!</h2>
        <p className="text-muted-foreground mb-6">Thank you for ordering with CareHub JA. Your medication is being prepared for delivery.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/dashboard" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Track Order
          </Link>
          <Link to="/" className="border border-border px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Link>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Delivery Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required type="email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input required type="tel" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Delivery Address</label>
                <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Parish</label>
                  <select required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select</option>
                    {["Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary", "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland", "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-colors">
                  <input type="radio" name="payment" value="card" defaultChecked className="text-primary" />
                  <span className="text-sm font-medium">Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-colors">
                  <input type="radio" name="payment" value="cod" className="text-primary" />
                  <span className="text-sm font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg shadow-card p-6 sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} loading="lazy" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">J${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>J${totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>J${shipping.toLocaleString()}</span></div>
                <div className="border-t border-border pt-2 flex justify-between text-base font-bold"><span>Total</span><span>J${(totalPrice + shipping).toLocaleString()}</span></div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
