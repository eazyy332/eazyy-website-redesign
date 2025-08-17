import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

type OrderStatus =
  | "confirmed"
  | "pickup_scheduled"
  | "picked_up"
  | "in_processing"
  | "ready_for_delivery"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export default function OrderHistory() {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders();
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all");
  const [sortBy, setSortBy] = useState<"date" | "status" | "total">("date");

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-black mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view your orders.</p>
          <Link to="/auth/login" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "in_processing":
        return "bg-yellow-100 text-yellow-800";
      case "picked_up":
        return "bg-purple-100 text-purple-800";
      case "pickup_scheduled":
        return "bg-orange-100 text-orange-800";
      case "confirmed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pickup_scheduled":
        return "Pickup Scheduled";
      case "picked_up":
        return "Picked Up";
      case "in_processing":
        return "In Processing";
      case "ready_for_delivery":
        return "Ready for Delivery";
      case "out_for_delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatAddress = (address: any) => {
    if (!address) return "No address provided";
    if (typeof address === 'string') return address;
    
    return `${address.streetAddress || address.address || ''}${
      address.apartment ? `, ${address.apartment}` : ''
    }, ${address.city || ''}, ${address.postalCode || address.zipCode || ''}`;
  };

  const getOrderServices = (order: any) => {
    if (!order.order_items || order.order_items.length === 0) {
      return [{ name: "No items", quantity: 0, price: 0 }];
    }
    
    return order.order_items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.unit_price
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-4 lg:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-medium text-black mb-4 leading-tight">
                Order History
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Loading your orders...
              </p>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-4 lg:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-medium text-black mb-4">Error loading orders</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "total":
        return b.total_amount - a.total_amount;
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const reorderService = (order: any) => {
    // In a real app, this would populate the order form with the same services
    alert(
      `Reorder functionality coming soon! This would recreate order ${order.id} with the same services.`,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="hidden">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-black hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-black hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-primary transition-colors"
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F0ba0452a2d1340e7b84136d8ed253a1b%2Fb6e642e462f04f14827396626baf4d5e?format=webp&width=800"
              alt="eazyy logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/orders" className="text-primary font-medium">
              My Orders
            </Link>
            <Link
              to="/notifications"
              className="text-black hover:text-primary transition-colors relative"
            >
              Notifications
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <Link
              to="/help"
              className="text-black hover:text-primary transition-colors"
            >
              Help
            </Link>
            <div className="text-black">EN</div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-medium text-black mb-4 leading-tight">
              Order History
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Track your past and current orders, reorder favorite services
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Filter by Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  >
                    <option value="all">All Orders</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pickup_scheduled">Pickup Scheduled</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="in_processing">In Processing</option>
                    <option value="ready_for_delivery">
                      Ready for Delivery
                    </option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  >
                    <option value="date">Order Date</option>
                    <option value="status">Status</option>
                    <option value="total">Total Amount</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredOrders.length} order
                  {filteredOrders.length !== 1 ? "s" : ""}
                </span>
                <Link
                  to="/order/start"
                  className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  + New Order
                </Link>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                No orders match your current filter criteria.
              </p>
              <Link
                to="/order/start"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Place Your First Order
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-medium text-black">
                          Order #{order.id.slice(0, 8)}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>

                        {/* Special indicators */}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Order Date:</span>
                          <div className="font-medium text-black">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>

                        {order.schedule?.pickupDate && (
                          <div>
                            <span className="text-gray-600">Pickup:</span>
                            <div className="font-medium text-black">
                              {new Date(order.schedule.pickupDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </div>
                          </div>
                        )}

                        {order.schedule?.deliveryDate && (
                          <div>
                            <span className="text-gray-600">Delivery:</span>
                            <div className="font-medium text-black">
                              {new Date(order.schedule.deliveryDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <span className="text-gray-600 text-sm">Services:</span>
                        <div className="font-medium text-black">
                          {getOrderServices(order).map((service, index) => (
                            <span key={index}>
                              {service.name}{" "}
                              {service.quantity > 1
                                ? `(×${service.quantity})`
                                : ""}
                              {index < getOrderServices(order).length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order Total & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          €{order.total_amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.order_items?.length || 0} item
                          {(order.order_items?.length || 0) > 1 ? "s" : ""}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/order/${order.id}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </Link>
                        {order.status === "delivered" && (
                          <button
                            onClick={() => reorderService(order)}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {orders.length}
              </div>
              <div className="text-gray-600">Total Orders</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                €{orders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}
              </div>
              <div className="text-gray-600">Total Spent</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {orders.filter((order) => order.status === "delivered").length}
              </div>
              <div className="text-gray-600">Completed Orders</div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-accent rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-lg font-medium text-black mb-4">
              Need Help with an Order?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for or have questions about an
              order?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/help"
                className="inline-block border border-gray-300 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}