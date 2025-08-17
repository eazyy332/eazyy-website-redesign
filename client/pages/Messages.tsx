import { useMessages } from "@/hooks/useMessages";

export default function Messages() {
  const { messages, loading, error } = useMessages();

  if (loading) return <div className="p-8">Loading…</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <h1 className="text-3xl font-semibold mb-6">Recent Messages</h1>
      {messages.length === 0 ? (
        <div className="text-gray-600">No messages yet.</div>
      ) : (
        <div className="grid gap-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between flex-wrap gap-2 mb-2">
                <div className="font-medium">{m.first_name} {m.last_name}</div>
                <div className="text-sm text-gray-500">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600 mb-1">{m.email}{m.phone ? ` • ${m.phone}` : ""}</div>
              <div className="font-semibold mb-1">{m.subject}</div>
              <div className="text-gray-800 whitespace-pre-wrap">{m.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


