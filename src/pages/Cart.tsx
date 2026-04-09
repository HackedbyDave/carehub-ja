import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Browse medications and health products on CareHub JA</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Browse Medications
        </Link>
      </div>
    );
  }

  const delivery = 500;
  const total = totalPrice + delivery;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-card p-4 flex gap-4">
              <img src={item.image} alt={item.name} loading="lazy" width={100} height={100} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.vendor}</p>
                <p className="font-bold text-foreground mt-1">J${item.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 bg-secondary rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-border rounded-l-lg transition-colors">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-border rounded-r-lg transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg shadow-card p-6 h-fit">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">J${totalPrice.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium">J${delivery.toLocaleString()}</span></div>
            <div className="border-t border-border pt-3 flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-bold">J${total.toLocaleString()}</span></div>
          </div>
          <Link
            to="/checkout"
            className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
