'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from '@/components/Dashboard/Sidebar';
import TopTrends from '@/components/Dashboard/TopTrends';
import TrendChart from '@/components/Dashboard/TrendChart';
import Loading from '@/components/Loading';
import { Trends } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Dashboard() {
  const router = useRouter();
  const [trends, setTrends] = useState<Trends[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('BR');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/trends`, {
          params: {
            country: selectedCountry,
            category: selectedCategory,
          },
        });
        setTrends(response.data);
      } catch (error) {
        console.error('Erro ao buscar tendências:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [selectedCountry, selectedCategory]);

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard de Tendências</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TopTrends trends={trends} />
              <div className="mt-8">
                <TrendChart trends={trends} />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Resumo</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Total de Tendências</p>
                  <p className="text-2xl font-bold text-primary">{trends.length}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">País</p>
                  <p className="text-lg font-semibold">{selectedCountry}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Última Atualização</p>
                  <p className="text-sm text-gray-300">{new Date().toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
