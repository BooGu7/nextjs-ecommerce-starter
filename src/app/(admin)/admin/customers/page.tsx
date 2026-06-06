import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";

export default async function AdminCustomersPage() {
  const supabase = createSupabaseServerClient();

  const { data: orders, error } = await supabase
    .from("ecommerce_orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div>
        <PageHeader
          title="Customers"
          description="View and manage your customer base."
        />
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const customers = Array.from(
    new Map(
      (orders || []).map((order) => [
        order.customer_email,
        {
          email: order.customer_email,
          orderCount: 1,
          lastOrder: order.created_at,
        },
      ])
    ).values()
  );

  return (
    <div>
      <PageHeader
        title="Customers"
        description="View and manage your customer base."
      />

      {customers.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Last Order
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.email}
                  className="border-b"
                >
                  <td className="p-3">
                    {customer.email}
                  </td>

                  <td className="p-3">
                    {new Date(
                      customer.lastOrder
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          No customers found.
        </p>
      )}
    </div>
  );
}