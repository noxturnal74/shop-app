'use client'

import { useState } from 'react'
import { ShoppingCart, Star, Heart, Filter, Search, Package, ShieldCheck, Sparkles, Check, ChevronRight, ShoppingBag, X, FileText, Printer, CheckCircle } from 'lucide-react'

interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  category: string
  image: string
  badge: string | null
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<number[]>([1, 2]) // Pre-populate for production demo feel
  const [favorites, setFavorites] = useState<number[]>([1, 3])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details')
  const [orderId, setOrderId] = useState('')
  
  // Checkout Form State
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const products: Product[] = [
    { id: 1, title: 'Mountain Sunrise Fine Art Canvas', price: 45, originalPrice: 60, rating: 4.9, reviews: 124, category: 'Fine Art', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', badge: 'Best Seller' },
    { id: 2, title: 'Ultimate Lightroom Preset Pack', price: 29, originalPrice: 49, rating: 4.8, reviews: 89, category: 'Presets', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80', badge: 'New' },
    { id: 3, title: 'Urban Night Skyline Canvas', price: 89, originalPrice: 120, rating: 4.7, reviews: 56, category: 'Canvas', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80', badge: 'Sale' },
    { id: 4, title: 'Master Portrait Editing Bundle', price: 39, originalPrice: 59, rating: 5.0, reviews: 203, category: 'Presets', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', badge: 'Top Rated' },
    { id: 5, title: 'Ocean Waves Premium Metal Print', price: 129, originalPrice: 160, rating: 4.9, reviews: 78, category: 'Metal Print', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&auto=format&fit=crop&q=80', badge: null },
    { id: 6, title: 'Nature Photography Guidebook', price: 19, originalPrice: 29, rating: 4.6, reviews: 342, category: 'Books', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80', badge: null },
  ]

  const categories = ['All', 'Fine Art', 'Presets', 'Canvas', 'Metal Print', 'Books']

  const handleToggleCart = (id: number) => {
    setCart(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderId('ORD-' + Math.floor(100000 + Math.random() * 900000))
    setCheckoutStep('success')
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    setCheckoutStep('details')
    setCart([]) // Clear cart on successful order
  }

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cartSubtotal = products.filter(p => cart.includes(p.id)).reduce((acc, curr) => acc + curr.price, 0)
  const cartTax = Math.round(cartSubtotal * 0.1)
  const cartTotal = cartSubtotal + cartTax

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md shadow-sm p-4 sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#5856D6] to-[#007AFF] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShoppingBag className="text-white animate-pulse" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#000000] dark:text-[#FFFFFF]">ShopFrame</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Premium Storefront</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-1.5 border border-transparent focus-within:border-purple-500/50 transition-all">
              <Search className="text-gray-400 mr-2" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-36 sm:w-48 focus:outline-none"
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-all"
            >
              <ShoppingCart className="text-[#5856D6]" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3B30] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Banner */}
        <section className="bg-gradient-to-br from-[#5856D6] to-[#007AFF] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Sparkles size={14} /> Summer Exclusive Sale
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Fine Art Prints & Asset Bundles</h2>
            <p className="text-white/95 max-w-xl text-sm leading-relaxed mt-2">
              Curated museum-grade prints, Lightroom presets, and high-fidelity canvases sourced from award-winning global photographers.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 top-0 opacity-15 flex items-center pr-10 pointer-events-none">
            <ShoppingBag size={220} />
          </div>
        </section>

        {/* Categories Carousel */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#5856D6] text-white shadow-md shadow-purple-500/20' 
                  : 'bg-white dark:bg-[#1C1C1E] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#000000] dark:text-[#FFFFFF]">Featured Products</h3>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1C1C1E] px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-800">
              Showing {filteredProducts.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800/80 group flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {product.badge}
                    </span>
                  )}
                  <button 
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/95 dark:bg-black/60 backdrop-blur-md rounded-full shadow-md hover:scale-110 active:scale-95 transition-all"
                  >
                    <Heart 
                      size={18} 
                      className={`transition-colors ${
                        favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#5856D6] uppercase tracking-wider block mb-1">
                      {product.category}
                    </span>
                    <h4 className="font-extrabold text-[#000000] dark:text-[#FFFFFF] text-base leading-tight group-hover:text-[#5856D6] transition-colors duration-300">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="text-xl font-black text-[#000000] dark:text-[#FFFFFF]">${product.price}</span>
                      <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <button 
                      onClick={() => handleToggleCart(product.id)}
                      className={`p-3 rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                        cart.includes(product.id) 
                          ? 'bg-[#34C759] text-white shadow-green-500/10' 
                          : 'bg-[#5856D6] hover:bg-[#4744C6] text-white shadow-purple-500/10'
                      }`}
                    >
                      {cart.includes(product.id) ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Prop Banner */}
        <section className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold mb-4 text-[#000000] dark:text-[#FFFFFF]">Why ShopFrame?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Package size={24} />, title: 'Free Global Shipping', desc: 'On canvas & metal prints over $75', color: 'text-[#5856D6]', bg: 'bg-purple-50 dark:bg-purple-950/20' },
              { icon: <ShieldCheck size={24} />, title: 'Secured Payments', desc: 'Fully protected by Stripe encryption', color: 'text-[#34C759]', bg: 'bg-green-50 dark:bg-green-950/20' },
              { icon: <Sparkles size={24} />, title: 'Museum Grade Quality', desc: 'Archival inks and premium canvases', color: 'text-[#FF9500]', bg: 'bg-orange-50 dark:bg-orange-950/20' },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 items-start p-4 rounded-2xl bg-gray-50 dark:bg-gray-850">
                <div className={`p-3 rounded-xl ${feature.bg} ${feature.color} shrink-0`}>
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#000000] dark:text-[#FFFFFF]">{feature.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] h-full shadow-2xl flex flex-col justify-between">
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="text-[#5856D6]" /> Your Cart
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="text-5xl">???</div>
                  <h4 className="font-bold text-gray-500">Your cart is empty</h4>
                  <p className="text-xs text-gray-400">Add art prints and presets to start!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.filter(p => cart.includes(p.id)).map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-gray-850 p-3 rounded-2xl border border-gray-100 dark:border-transparent">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.category} ? ${item.price}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-150 dark:border-gray-850 bg-gray-50 dark:bg-gray-900 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-500">Subtotal</span>
                  <span className="text-2xl font-black">${cartSubtotal}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false)
                    setIsCheckoutOpen(true)
                  }}
                  className="w-full bg-[#5856D6] hover:bg-[#4744C6] text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Production-Grade Checkout & Invoice Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden my-8">
            
            {checkoutStep === 'details' ? (
              <form onSubmit={handleCheckoutSubmit} className="flex flex-col md:flex-row h-full">
                {/* Left Side Form */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Secure Checkout</h3>
                    <button 
                      type="button" 
                      onClick={() => setIsCheckoutOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-[#5856D6]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Address</label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="123 Main St, San Francisco, CA"
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-[#5856D6]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cardholder Name</label>
                      <input 
                        type="text" 
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-[#5856D6]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Card Number</label>
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                        placeholder="4111 2222 3333 4444"
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-[#5856D6]"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#5856D6] hover:bg-[#4744C6] text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95 mt-4"
                  >
                    Complete Payment (${cartTotal})
                  </button>
                </div>

                {/* Right Side Cart Summary */}
                <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-6 border-t md:border-t-0 md:border-l border-gray-150 dark:border-gray-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Order Summary</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {products.filter(p => cart.includes(p.id)).map(item => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-300 truncate max-w-[150px]">{item.title}</span>
                          <span className="font-bold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Subtotal</span>
                      <span>${cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>VAT (10%)</span>
                      <span>${cartTax}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-800 dark:text-white pt-1">
                      <span>Total</span>
                      <span>${cartTotal}</span>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* High-End Production Invoice Receipt */
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-850">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle size={24} />
                    <span className="font-black text-lg">Order Confirmed</span>
                  </div>
                  <button 
                    onClick={window.print}
                    className="flex items-center gap-1 text-xs font-bold text-[#5856D6] border border-[#5856D6]/30 px-3 py-1.5 rounded-xl hover:bg-[#5856D6]/10"
                  >
                    <Printer size={14} /> Print Invoice
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-transparent space-y-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-gray-400 block">ORDER ID</span>
                      <span className="font-black text-sm text-gray-800 dark:text-white">{orderId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block">DATE</span>
                      <span className="font-black text-sm text-gray-800 dark:text-white">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                    <span className="text-gray-400 block">CUSTOMER DETAILS</span>
                    <span className="block text-gray-700 dark:text-gray-300">Email: {email}</span>
                    <span className="block text-gray-700 dark:text-gray-300">Address: {address}</span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                    <span className="text-gray-400 block">ITEMS SUMMARY</span>
                    {products.filter(p => cart.includes(p.id)).map(item => (
                      <div key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>1x {item.title}</span>
                        <span>${item.price}.00</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>${cartSubtotal}.00</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Tax (10%)</span>
                      <span>${cartTax}.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-gray-800 dark:text-white pt-1">
                      <span>Total Paid</span>
                      <span>${cartTotal}.00</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCloseCheckout}
                  className="w-full bg-[#5856D6] hover:bg-[#4744C6] text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Return to Storefront
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
