import { ShoppingCart, Star, Heart, Filter, Search, Package, CreditCard } from 'lucide-react'

export default function ShopPage() {
  const products = [
    { id: 1, title: 'Mountain Sunrise Print', price: 45, originalPrice: 60, rating: 4.9, reviews: 124, category: 'Fine Art', image: '🏔️', badge: 'Best Seller' },
    { id: 2, title: 'Lightroom Preset Pack', price: 29, originalPrice: 49, rating: 4.8, reviews: 89, category: 'Digital', image: '🎨', badge: 'New' },
    { id: 3, title: 'Urban Night Canvas', price: 89, originalPrice: 120, rating: 4.7, reviews: 56, category: 'Canvas', image: '🌃', badge: 'Sale' },
    { id: 4, title: 'Portrait Editing Bundle', price: 39, originalPrice: 59, rating: 5.0, reviews: 203, category: 'Digital', image: '📸', badge: 'Top Rated' },
    { id: 5, title: 'Ocean Waves Metal Print', price: 129, originalPrice: 160, rating: 4.9, reviews: 78, category: 'Metal', image: '🌊', badge: null },
    { id: 6, title: 'Nature Photography eBook', price: 19, originalPrice: 29, rating: 4.6, reviews: 342, category: 'Digital', image: '📖', badge: null },
  ]

  const categories = ['All', 'Fine Art', 'Canvas', 'Metal', 'Digital', 'Presets']

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000]">
      <header className="bg-white dark:bg-[#1C1C1E] shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5856D6] flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-[#000000] dark:text-[#FFFFFF]">ShopFrame</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><Search className="text-gray-600 dark:text-gray-400" size={20} /></button>
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart className="text-[#5856D6]" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3B30] text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <section className="bg-gradient-to-br from-[#5856D6] to-[#007AFF] rounded-2xl p-8 text-white">
          <p className="text-white/80 text-sm mb-2">Summer Sale — Up to 40% Off</p>
          <h2 className="text-3xl font-bold mb-3">Photography Art & Presets</h2>
          <p className="text-white/90 mb-6">Prints, canvases, presets, and digital downloads by independent photographers.</p>
          <button className="bg-white text-[#5856D6] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Shop Now</button>
        </section>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button key={cat} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-[#5856D6] text-white' : 'bg-white dark:bg-[#1C1C1E] text-gray-600 dark:text-gray-400 hover:text-[#5856D6]'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#000000] dark:text-[#FFFFFF]">Featured Products</h3>
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Filter size={16} /> Filter</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#5856D6] text-white text-xs px-2 py-1 rounded-full font-medium">{product.badge}</span>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white transition-colors">
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-[#5856D6] font-medium mb-1">{product.category}</p>
                <h4 className="font-semibold text-[#000000] dark:text-[#FFFFFF] mb-2 text-sm">{product.title}</h4>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">${product.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice}</span>
                  </div>
                  <button className="bg-[#5856D6] text-white p-2 rounded-xl hover:bg-[#4744C6] transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 text-[#000000] dark:text-[#FFFFFF]">Why ShopFrame?</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Package size={24} />, title: 'Free Shipping', desc: 'On orders over $75', color: 'text-[#5856D6]' },
              { icon: <CreditCard size={24} />, title: 'Secure Payment', desc: 'Stripe protected', color: 'text-[#34C759]' },
              { icon: <Star size={24} />, title: 'Quality Prints', desc: 'Museum grade', color: 'text-[#FF9500]' },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className={`flex justify-center mb-2 ${feature.color}`}>{feature.icon}</div>
                <h4 className="font-semibold text-sm text-[#000000] dark:text-[#FFFFFF]">{feature.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}