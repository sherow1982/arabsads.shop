import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(async (value) => {
    setQuery(value);
    if (value.length > 1) {
      const { products } = await import('@/data/products');
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, []);

  const handleSelect = (product) => {
    router.push(`/product/${product.slug}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 1 && setShowResults(true)}
          placeholder="ابحث عن منتج..."
          className="w-full py-3 px-5 pr-12 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none text-right"
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
          {results.map(product => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <img src={product.image} alt={product.title} width="48" height="48" loading="lazy" className="w-12 h-12 object-cover rounded" />
              <div className="flex-1 text-right">
                <p className="font-medium text-dark text-sm">{product.title}</p>
                <p className="text-primary font-bold text-sm">{product.salePrice.toFixed(3)} د.ك</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
