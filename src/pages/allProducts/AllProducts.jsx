import React, { useRef, useState, useEffect, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import { LuLoaderCircle } from "react-icons/lu";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import { useTheme } from "@/context/ThemeContext";
import ProductCard from "@/components/cards/ProductCard";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { categories } = useCategories();
  const { products, fetchMoreProducts, loading } = useProducts();
  const { isDarkMode } = useTheme();
  const scrollContainerRef = useRef(null);
  const lastProductRef = useRef(null);
  const [visibleProducts, setVisibleProducts] = useState(10); // Lazy load 10 products initially

  // Lazy loading using Intersection Observer
  const loadMoreProducts = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setVisibleProducts((prev) => prev + 10); // Load 10 more products when last item is visible
      }
    },
    [loading]
  );

  useEffect(() => {
    const observerInstance = new IntersectionObserver(loadMoreProducts, {
      root: null,
      rootMargin: "50px",
      threshold: 1.0,
    });

    if (lastProductRef.current) {
      observerInstance.observe(lastProductRef.current);
    }

    return () => {
      if (lastProductRef.current) observerInstance.unobserve(lastProductRef.current);
    };
  }, [products, loadMoreProducts]);

  // Drag scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse down event
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // Mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Layout>
      <section className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className={`space-y-6 pt-8 max-w-[1444px] p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
          {categories.map((category) => {
            const categoryProducts = products
              .filter((product) => product.category === category.name)
              .slice(0, visibleProducts); // Show only a limited number of products initially

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="space-y-3">
                <h2 className="text-2xl leading-3 font-bold text-left font-[roboto]">{category.name}</h2>
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto space-x-4 p-2 py-4 scrollbar-hide"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseUp}
                  onMouseUp={handleMouseUp}
                  style={{ userSelect: isDragging ? "none" : "auto" }}
                >
                  {categoryProducts.map((product, index) => (
                    <Link to={`/product/${product.id}`} className="cursor-default" key={product.id}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                  <div ref={lastProductRef} /> {/* Lazy loading trigger */}
                </div>
                {products[category]?.hasMore && (
                  <div className="flex justify-center">
                    <button onClick={() => fetchMoreProducts(category)} disabled={loading}>
                      {loading ? <LuLoaderCircle className="animate-spin" /> : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default AllProducts;
