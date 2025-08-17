import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Service banner backgrounds and icons - using placeholder images
const heroEazzy = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop";
const heroDry = "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=400&fit=crop";
const heroWash = "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=400&fit=crop";
const heroRepair = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop";

// Item imagery used in the grid - using placeholder images
const tshirtIcon = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop";
const poloIcon = "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop";
const henleyIcon = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop";
const teeGraphicIcon = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop";
const foldedBagIcon = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop";
const altIcon = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&h=200&fit=crop";

// Service selector icons - using placeholder images
const iconBag = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=64&h=64&fit=crop";
const iconWashIron = "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=64&h=64&fit=crop";
const iconDry = "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=64&h=64&fit=crop";
const iconRepair = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop";

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  quantity: number;
}

interface CartItem extends Item {
  serviceCategory: string;
}

export default function ItemSelection() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  // Service data organized by category
  const serviceData: Record<string, any> = {
    'eazzy-bag': {
      name: 'eazzy Bag Services',
      description: 'Choose from different bag sizes and laundry options',
      icon: '🧺',
      items: [
        { id: 'small-bag', name: 'Small Bag (up to 5 lbs)', description: 'Perfect for a few items or undergarments', price: 15.99, subcategory: 'bags', icon: '👝' },
        { id: 'regular-bag', name: 'Regular Bag (up to 10 lbs)', description: 'Standard size for weekly laundry', price: 24.99, subcategory: 'bags', icon: '🎒' },
        { id: 'large-bag', name: 'Large Bag (up to 15 lbs)', description: 'Maximum capacity for families', price: 34.99, subcategory: 'bags', icon: '🧳' },
        { id: 'delicate-bag', name: 'Delicate Items Bag', description: 'Special care for sensitive fabrics', price: 29.99, subcategory: 'specialty', icon: '🌸' },
        { id: 'eco-bag', name: 'Eco-Friendly Wash Bag', description: 'Environmentally conscious cleaning', price: 27.99, subcategory: 'specialty', icon: '🌿' }
      ],
      subcategories: ['all', 'bags', 'specialty']
    },
    'wash-iron': {
      name: 'Wash & Iron Services',
      description: 'Individual items professionally washed and ironed',
      icon: '👔',
      items: [
        { id: 'dress-shirt', name: 'Dress Shirt', description: 'Professional shirt cleaning and pressing', price: 4.99, subcategory: 'shirts', icon: '👔' },
        { id: 'casual-shirt', name: 'Casual Shirt', description: 'Regular shirt wash and iron', price: 3.99, subcategory: 'shirts', icon: '👕' },
        { id: 'blouse', name: 'Blouse', description: 'Delicate blouse care', price: 5.99, subcategory: 'shirts', icon: '👚' },
        { id: 'trousers', name: 'Trousers', description: 'Professional trouser pressing', price: 6.99, subcategory: 'pants', icon: '👖' },
        { id: 'jeans', name: 'Jeans', description: 'Denim wash and press', price: 5.99, subcategory: 'pants', icon: '👖' },
        { id: 'skirt', name: 'Skirt', description: 'Skirt cleaning and pressing', price: 5.99, subcategory: 'other', icon: '👗' },
        { id: 'polo-shirt', name: 'Polo Shirt', description: 'Polo shirt wash and iron', price: 4.99, subcategory: 'shirts', icon: '👕' },
        { id: 'chinos', name: 'Chinos', description: 'Chino pants cleaning', price: 6.99, subcategory: 'pants', icon: '👖' }
      ],
      subcategories: ['all', 'shirts', 'pants', 'other']
    },
    'dry-cleaning': {
      name: 'Dry Cleaning Services',
      description: 'Professional dry cleaning for delicate and special items',
      icon: '🧼',
      items: [
        { id: 'suit-jacket', name: 'Suit Jacket', description: 'Professional suit jacket cleaning', price: 15.99, subcategory: 'suits', icon: '🤵' },
        { id: 'suit-pants', name: 'Suit Pants', description: 'Matching suit trouser cleaning', price: 12.99, subcategory: 'suits', icon: '👔' },
        { id: 'dress', name: 'Dress', description: 'Elegant dress dry cleaning', price: 18.99, subcategory: 'dresses', icon: '👗' },
        { id: 'evening-gown', name: 'Evening Gown', description: 'Special occasion dress care', price: 35.99, subcategory: 'dresses', icon: '👰' },
        { id: 'coat', name: 'Coat', description: 'Winter coat cleaning', price: 25.99, subcategory: 'outerwear', icon: '🧥' },
        { id: 'blazer', name: 'Blazer', description: 'Business blazer cleaning', price: 16.99, subcategory: 'suits', icon: '🤵' },
        { id: 'wool-sweater', name: 'Wool Sweater', description: 'Delicate wool care', price: 13.99, subcategory: 'knitwear', icon: '🧶' },
        { id: 'cashmere', name: 'Cashmere Item', description: 'Luxury cashmere cleaning', price: 22.99, subcategory: 'knitwear', icon: '✨' },
        { id: 'leather-jacket', name: 'Leather Jacket', description: 'Specialized leather cleaning', price: 45.99, subcategory: 'specialty', icon: '🧥' },
        { id: 'fur-item', name: 'Fur Item', description: 'Expert fur care and storage', price: 89.99, subcategory: 'specialty', icon: '🦔' }
      ],
      subcategories: ['all', 'suits', 'dresses', 'outerwear', 'knitwear', 'specialty']
    },
    'repairs': {
      name: 'Repairs & Alterations',
      description: 'Tailoring and repair services for your garments',
      icon: '✂️',
      items: [
        { id: 'hem-pants', name: 'Hem Pants', description: 'Adjust trouser length', price: 12.99, subcategory: 'hemming', icon: '📏' },
        { id: 'hem-dress', name: 'Hem Dress', description: 'Adjust dress length', price: 15.99, subcategory: 'hemming', icon: '📐' },
        { id: 'hem-skirt', name: 'Hem Skirt', description: 'Adjust skirt length', price: 13.99, subcategory: 'hemming', icon: '📏' },
        { id: 'take-in-waist', name: 'Take in Waist', description: 'Reduce waist size', price: 18.99, subcategory: 'fitting', icon: '📎' },
        { id: 'let-out-waist', name: 'Let out Waist', description: 'Increase waist size', price: 16.99, subcategory: 'fitting', icon: '📎' },
        { id: 'shorten-sleeves', name: 'Shorten Sleeves', description: 'Adjust sleeve length', price: 14.99, subcategory: 'fitting', icon: '✂️' },
        { id: 'replace-zipper', name: 'Replace Zipper', description: 'New zipper installation', price: 19.99, subcategory: 'repairs', icon: '🔧' },
        { id: 'button-replacement', name: 'Button Replacement', description: 'Replace missing buttons', price: 8.99, subcategory: 'repairs', icon: '🔘' },
        { id: 'patch-hole', name: 'Patch Small Hole', description: 'Repair small tears or holes', price: 12.99, subcategory: 'repairs', icon: '🪡' },
        { id: 'reinforcement', name: 'Reinforcement', description: 'Strengthen weak seams', price: 11.99, subcategory: 'repairs', icon: '💪' }
      ],
      subcategories: ['all', 'hemming', 'fitting', 'repairs']
    }
  };

  const currentService = serviceData[category || ''];

  // Per-service hero meta
  const serviceMeta: Record<string, { title: string; description: string; hero: string; accent: string; label: string } > = {
    'eazzy-bag': {
      title: 'eazyy Bag',
      description: "Fill a bag. We'll handle the rest. Weight-based washing with pickup & delivery on your schedule.",
      hero: heroEazzy,
      accent: '#1D62DB',
      label: 'Laundry'
    },
    'dry-cleaning': {
      title: 'Dry Cleaning',
      description: 'Crisp care for delicate garments. Professional solvent cleaning and finishing, picked up and delivered.',
      hero: heroDry,
      accent: '#16A34A',
      label: 'Dry clean'
    },
    'wash-iron': {
      title: 'Wash & Iron',
      description: 'Washed. Pressed. Delivered. Per-item washing and precise ironing, picked up and delivered on your schedule.',
      hero: heroWash,
      accent: '#DC2626',
      label: 'Wash & iron'
    },
    'repairs': {
      title: 'Repairs',
      description: "Fix, tailor, and extend your garment’s life. From hemming to zippers—skilled repairs with pickup & delivery.",
      hero: heroRepair,
      accent: '#F59E0B',
      label: 'Repairs'
    }
  };
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('eazzy-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Reset subcategory when switching services so grids don't appear empty
  useEffect(() => {
    setSelectedSubcategory('all');
  }, [category]);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('eazzy-cart', JSON.stringify(cart));
  }, [cart]);

  if (!currentService) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-black mb-4">Service Category Not Found</h1>
          <Link to="/order/start" className="text-primary hover:underline">← Back to Service Categories</Link>
        </div>
      </div>
    );
  }

  const filteredItems = selectedSubcategory === 'all' 
    ? currentService.items 
    : currentService.items.filter((item: Item) => item.subcategory === selectedSubcategory);

  const addToCart = (item: Item) => {
    const cartItem: CartItem = {
      ...item,
      serviceCategory: category || '',
      quantity: 1
    };

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.serviceCategory === category
      );

      if (existingIndex >= 0) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, cartItem];
      }
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.serviceCategory === category)));
    } else {
      setCart(prevCart => prevCart.map(item => 
        item.id === itemId && item.serviceCategory === category
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId && item.serviceCategory === category);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      navigate('/order/scheduling', {
        state: {
          selectedServices: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            serviceCategory: item.serviceCategory
          })),
          totalPrice: getTotalPrice()
        }
      });
    }
  };

  const continueShopping = () => {
    navigate('/order/start');
  };

  const meta = serviceMeta[category || 'eazzy-bag'];
  const formatEuro = (value: number) => value.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const getItemImage = (item: Item) => {
    const key = (item.name || '').toLowerCase();
    if (key.includes('polo')) return poloIcon;
    if (key.includes('henley')) return henleyIcon;
    if (key.includes('bag')) return foldedBagIcon;
    if (key.includes('t-shirt') || key.includes('tee') || key.includes('shirt')) return tshirtIcon;
    return teeGraphicIcon;
  };

  // Category pill icon mapping per service
  const getSubcategoryIcon = (subcat: string): string => {
    const s = (subcat || '').toLowerCase();
    switch (category) {
      case 'eazzy-bag':
        if (s === 'bags' || s === 'all') return foldedBagIcon;
        if (s === 'specialty') return altIcon;
        return tshirtIcon;
      case 'wash-iron':
        if (s === 'shirts' || s === 'all') return tshirtIcon;
        if (s === 'pants') return henleyIcon;
        return poloIcon;
      case 'dry-cleaning':
        if (s === 'suits') return poloIcon;
        if (s === 'dresses') return teeGraphicIcon;
        if (s === 'outerwear') return henleyIcon;
        if (s === 'knitwear') return altIcon;
        return tshirtIcon;
      case 'repairs':
        if (s === 'hemming' || s === 'fitting') return altIcon;
        return poloIcon;
      default:
        return tshirtIcon;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="px-4 md:px-8 lg:px-12 pt-8 pb-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero banner */}
          <section className="relative rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(17,24,39,0.15)]">
            <img src={meta.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 px-6 md:px-10 py-10 md:py-14">
              <div className="inline-flex items-center h-8 px-3 rounded-full text-white/90" style={{ backgroundColor: meta.accent }}>
                <span className="text-[13px] font-medium">6 services</span>
              </div>
              <h1 className="mt-5 text-4xl md:text-5xl font-medium text-white">{meta.title}</h1>
              <p className="mt-3 max-w-2xl text-white/90 text-lg leading-relaxed">{meta.description}</p>
              <div className="hidden md:flex items-center gap-5 absolute bottom-6 right-8">
                {[
                  { key: 'eazzy-bag', src: iconBag, alt: 'eazyy bag' },
                  { key: 'dry-cleaning', src: iconDry, alt: 'dry cleaning' },
                  { key: 'wash-iron', src: iconWashIron, alt: 'wash & iron' },
                  { key: 'repairs', src: iconRepair, alt: 'repairs' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => navigate(`/order/items/${item.key}`)}
                    className="w-14 h-14 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow border"
                    style={{ borderColor: `${meta.accent}30` }}
                    aria-label={item.alt}
                  >
                    <img src={item.src} alt="" className="w-8 h-8 object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Subcategory pills */}
          <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar">
            {currentService.subcategories.map((subcat: string) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(subcat)}
                className={`inline-flex items-center gap-2 h-10 px-4 rounded-[10px] border text-sm ${selectedSubcategory === subcat ? 'text-white' : 'text-black'} transition-colors`}
                style={{
                  backgroundColor: selectedSubcategory === subcat ? meta.accent : '#fff',
                  borderColor: selectedSubcategory === subcat ? meta.accent : '#E5E7EB'
                }}
              >
                <img src={getSubcategoryIcon(subcat)} alt="" className={`w-5 h-5 object-contain rounded ${selectedSubcategory === subcat ? 'bg-white' : 'bg-transparent'}`} />
                {subcat === 'all' ? 'Tops' : subcat.charAt(0).toUpperCase() + subcat.slice(1)}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {filteredItems.map((item: Item) => {
              const quantityInCart = getItemQuantityInCart(item.id);
              const accent = meta.accent;
              return (
                <div key={item.id} className="group">
                  <img src={getItemImage(item)} alt="" className="w-36 h-36 md:w-40 md:h-40 object-contain mx-auto" />
                  <div className="mt-2 text-[13px] text-black">{item.name}</div>
                  <div className="flex items-baseline gap-1 text-[11px] text-gray-600">
                    <span className="align-super">€</span>
                    <span className="text-[15px] font-semibold text-black">{formatEuro(item.price)}</span>
                    <span className="ml-1">per piece</span>
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: accent }}>{meta.label}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, quantityInCart - 1))}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm disabled:opacity-50"
                      disabled={quantityInCart === 0}
                      aria-label="Decrease"
                    >
                      –
                    </button>
                    <span className="text-sm w-4 text-center">{quantityInCart}</span>
                    <button
                      onClick={() => (quantityInCart === 0 ? addToCart(item) : updateQuantity(item.id, quantityInCart + 1))}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Sticky order actions */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 z-50" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
          <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600">{getTotalItems()} items</div>
                <div className="text-lg font-semibold text-black">€{getTotalPrice().toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/cart')}
                  className="rounded-full border border-gray-300 px-5 py-2.5 font-medium text-sm"
                >
                  View cart
                </button>
                <button
                  onClick={proceedToCheckout}
                  className="rounded-full bg-primary text-white px-5 py-2.5 font-semibold text-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
