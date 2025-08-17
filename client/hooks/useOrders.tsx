import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";

export interface Order {
  id: string;
  status: string;
  total_amount: number;
  schedule: any;
  address: any;
  payment_method: string | null;
  payment_method_label: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  item_id: string;
  name: string;
  service_category: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setOrders([]);
        return;
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch orders: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.error || 'Failed to fetch orders');
      }

      const data = result.data;

      setOrders(data || []);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (user) {
      fetchOrders();
    }
  };

  return {
    orders,
    loading,
    error,
    refetch
  };
}