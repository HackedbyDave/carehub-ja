import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold">
            {product.badge}
          </Badge>
        )}
      </Link>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.vendor}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body font-semibold text-sm text-foreground leading-tight mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">J${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">J${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
