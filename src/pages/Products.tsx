import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          {selectedCategory === "all" ? "All Products" : categories.find((c) => c.id === selectedCategory)?.name || "Products"}
        </h1>
        <p className="text-muted-foreground">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm hover:bg-secondary transition-colors md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 shrink-0`}>
          <div className="bg-card rounded-lg shadow-card p-4">
            <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === "all" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
