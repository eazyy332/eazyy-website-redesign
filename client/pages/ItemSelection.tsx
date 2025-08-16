import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('eazzy-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="hidden">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="text-black hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="text-black hover:text-primary transition-colors">About us</Link>
            <Link to="/contact" className="text-black hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F0ba0452a2d1340e7b84136d8ed253a1b%2Fb6e642e462f04f14827396626baf4d5e?format=webp&width=800" 
              alt="eazyy logo" 
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/help" className="text-black hover:text-primary transition-colors">Help</Link>
            <div className="text-black">EN</div>
            {/* Cart indicator */}
            {getTotalItems() > 0 && (
              <div className="relative">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 21a2 2 0 100-4 2 2 0 000 4zM5 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 lg:px-16 pt-12 pb-36 md:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/order/start" className="hover:text-primary">Service Categories</Link>
              <span>›</span>
              <span className="text-black font-medium">{currentService.name}</span>
            </nav>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">{currentService.icon}</div>
            <h1 className="text-4xl lg:text-5xl font-medium text-black mb-4 leading-tight">
              {currentService.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {currentService.description}
            </p>
          </div>

          {/* Subcategory Filter */}
          {currentService.subcategories.length > 2 && (
            <div className="mb-8">
              <div className="md:flex md:justify-center -mx-4 px-4">
                <div className="bg-gray-100 rounded-full p-1 inline-flex gap-1 overflow-x-auto no-scrollbar w-full md:w-auto whitespace-nowrap">
                  {currentService.subcategories.map((subcat: string) => (
                    <button
                      key={subcat}
                      onClick={() => setSelectedSubcategory(subcat)}
                      className={`px-5 md:px-6 py-2 rounded-full text-sm font-medium transition-colors select-none ${
                        selectedSubcategory === subcat
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {subcat === 'all' ? 'All Items' : subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Items Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item: Item) => {
                  const quantityInCart = getItemQuantityInCart(item.id);
                  return (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-2xl">{item.icon}</div>
                          <h3 className="text-lg font-medium text-black">{item.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="text-xl font-bold text-primary">€{item.price.toFixed(2)}</div>
                      </div>

                      {quantityInCart === 0 ? (
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-3">
                            <button 
                              onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 text-center font-medium">{quantityInCart}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-center text-sm text-gray-600">
                            Subtotal: €{(item.price * quantityInCart).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Sidebar (desktop only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                <h3 className="text-lg font-medium text-black mb-4">Your Cart</h3>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 21a2 2 0 100-4 2 2 0 000 4zM5 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <p className="text-gray-500">No items in cart</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {cart.map((item) => (
                        <div key={`${item.serviceCategory}-${item.id}`} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <div className="font-medium text-black">{item.name}</div>
                            <div className="text-gray-600 text-xs">{item.serviceCategory}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">×{item.quantity}</div>
                            <div className="text-primary">€{(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between">
                        <span className="font-medium text-black">Total</span>
                        <span className="font-bold text-primary text-lg">€{getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={proceedToCheckout}
                        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Continue to Scheduling
                      </button>
                      <button 
                        onClick={continueShopping}
                        className="w-full border border-gray-300 text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Add More Services
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart (mobile only) - expandable drawer */}
      {cart.length > 0 && (
        <Drawer open={cartOpen} onOpenChange={setCartOpen}>
          <DrawerTrigger asChild>
            <button
              className="fixed inset-x-0 z-50 md:hidden"
              style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}
              aria-label="Open cart"
            >
              <div className="mx-4 rounded-2xl border border-gray-200 bg-white shadow-xl p-3 flex items-center justify-between active:bg-gray-50">
                <div>
                  <div className="text-xs text-gray-600">{getTotalItems()} items</div>
                  <div className="text-lg font-semibold text-black">€{getTotalPrice().toFixed(2)}</div>
                </div>
                <span className="rounded-full bg-primary text-white px-4 py-2 text-sm font-medium">View cart</span>
              </div>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Your Cart</DrawerTitle>
              <DrawerDescription>Review items before continuing</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-2 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={`${item.serviceCategory}-${item.id}`} className="flex items-center justify-between rounded-2xl border border-gray-200 p-3">
                    <div className="flex items-center gap-3 flex-1 pr-3">
                      <div className="text-2xl">{(item as any).icon ?? '🧺'}</div>
                      <div>
                        <div className="font-medium text-black text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.serviceCategory}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center active:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center active:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
                      </button>
                    </div>
                    <div className="text-right w-20 text-sm font-semibold text-primary">€{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-lg font-semibold text-black">€{getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={() => setPromptOpen(true)}
                className="w-full rounded-full bg-primary text-white px-5 py-3 font-medium"
              >
                Continue
              </button>
              <DrawerClose asChild>
                <button className="w-full rounded-full border border-gray-300 px-5 py-3 font-medium">Close</button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {/* Add other services prompt */}
      <AlertDialog open={promptOpen} onOpenChange={setPromptOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl">➕</span>
            </div>
            <AlertDialogTitle className="text-lg">Add other services?</AlertDialogTitle>
            <AlertDialogDescription>
              You can continue to scheduling now, or add items from other services first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setPromptOpen(false); proceedToCheckout(); }}
              className="w-full rounded-full bg-primary text-white px-5 py-3 font-semibold"
            >
              Continue to Scheduling
            </button>
            <button
              onClick={() => { setPromptOpen(false); navigate('/order/start'); }}
              className="w-full rounded-full border border-gray-300 bg-white text-black px-5 py-3 font-medium"
            >
              Add Services
            </button>
            <AlertDialogCancel asChild>
              <button className="w-full rounded-full bg-gray-100 text-black px-5 py-3 font-medium">Cancel</button>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
