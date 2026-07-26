import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Brain } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-dark via-blue-900 to-dark flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block px-4 py-2 bg-primary/20 rounded-full border border-primary/50">
            <span className="text-primary font-semibold text-sm">🚀 Powered by AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Tendências em Tempo Real
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Descubra o que o mundo está buscando com análises impulsionadas por IA e insights acionáveis
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              Acessar Dashboard
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold transition-all"
            >
              Ver Recursos
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-gray-400">Países Monitorados</p>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-gray-400">Análise em Tempo Real</p>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50">
              <div className="text-3xl font-bold text-primary mb-2">AI</div>
              <p className="text-gray-400">Insights Automáticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Recursos Poderosos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dados em Tempo Real</h3>
              <p className="text-gray-400">
                Acompanhe tendências globais conforme elas evoluem, com atualizações instantâneas
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-accent/50 transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <Brain className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Análise com IA</h3>
              <p className="text-gray-400">
                Receba insights inteligentes e previsões sobre futuras tendências
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visualizações</h3>
              <p className="text-gray-400">
                Gráficos interativos e dashboards personalizados para suas necessidades
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
