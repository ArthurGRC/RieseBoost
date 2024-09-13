import { sessionOptions } from '@/lib/session';
import redis from '@/src/redis';
import getOrders from '@/src/services/mercadoLivre/GET/orders';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const Dashboard = async () => {
  const { user }: { user: string } = await getIronSession(cookies(), sessionOptions);
  const client: { id: string, email: string, roles: string[], refreshToken?: any } = JSON.parse(await redis.get(user) as string);
  
  const { data } = await getOrders(client.refreshToken);
  const orders = data?.results || [];

  return (
    <div className="flex justify-center items-center">
      <div className="flex-col w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Taxa
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Custos
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, order_items, total_amount }) => (
              <tr key={id}>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">{id}</td>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">{order_items[0]?.item.title}</td>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">{order_items[0]?.quantity}</td>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">R$ {total_amount.toFixed(2).split('.').join(',')}</td>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">R$ {order_items[0].sale_fee.toFixed(2).split('.').join(',')}</td>
                <td className="px-6 py-4 truncate whitespace-no-wrap border-b border-gray-200">
                  <input type="text" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
