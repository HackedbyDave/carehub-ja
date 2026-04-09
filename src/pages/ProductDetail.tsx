import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Truck, Shield, ArrowLeft, MapPin, Package, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const reviews = [
  { id: 1, name: "Marcia T.", rating: 5, date: "2 weeks ago", text: "Fast delivery to Kingston. Medication was exactly what my doctor prescribed. CareHub JA made it so easy." },
  { id: 2, name: "Devon R.", rating: 4, date: "1 month ago", text: "Great service! Easy to upload my prescription and the pharmacy had it ready same day." },
  { id: 3, name: "Shana P.", rating: 5, date: "3 weeks ago", text: "Love the convenience. No more driving to multiple pharmacies to find my medications in stock." },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="font-heading text-2xl font-bold mb-4">Product not found</h2>
      <Link to="/products" className="text-primary hover:underline">Back to medications</Link>
    </div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to medications
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="relative">
          <img src={product.image} alt={product.name} width={600} height={600} className="w-full aspect-square object-cover rounded-lg" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">{product.badge}</span>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          {product.requiresPrescription && (
            <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2.5 rounded-lg mb-4">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Prescription required — upload yours to order</span>
            </div>
          )}

          {product.dosage && (
            <p className="text-sm text-muted-foreground mb-4"><strong>Dosage:</strong> {product.dosage}</p>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-foreground">J${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">J${product.originalPrice.toLocaleString()}</span>
            )}
            {product.originalPrice && (
              <span className="text-sm font-semibold bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                Save J${(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          {product.bundleItems && (
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">Bundle Includes:</h3>
              <div className="space-y-1">
                {product.bundleItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-3.5 w-3.5 text-primary" /> {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addItem(product)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-4"
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </button>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-surface rounded-lg p-3">
              <Truck className="h-4 w-4 text-primary" /> Same-day delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-surface rounded-lg p-3">
              <Shield className="h-4 w-4 text-primary" /> Licensed pharmacy
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Available At</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{product.vendor}</span> · {product.vendorLocation}
            </div>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-card rounded-lg shadow-card p-5">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground mb-3">{r.text}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">You May Also Need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
