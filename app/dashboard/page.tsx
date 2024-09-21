import GenericCard from '@/components/GenericCard';
import { DollarSign, Package, Smartphone } from 'lucide-react';

const Home = () => {
  return (
    <main className="sm:ml-14 p-4 flex flex-col gap-6">
      <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
        <GenericCard
          title="Anúncios"
          description="Anúncios ativos de todas as contas"
          content="102"
          item={{ icon: Smartphone }}
        />
        <GenericCard
          title="Devolucões"
          description="Produtos em processo de devolucão"
          content="10"
          item={{ icon: Package }}
        />
        <GenericCard
          title="Vendas"
          description="Total de vendas em 365 dias"
          content="10.000"
          item={{ icon: DollarSign }}
        />
      </section>
      <h1 className="text-lg sm:text-xl"> Contas vinculadas </h1>
      <section></section>
    </main>
  );
};

export default Home;
