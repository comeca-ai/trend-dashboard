# Trend Dashboard - Frontend

Frontend Next.js para o Trend Dashboard com análise de tendências do Google Trends com IA.

## 🚀 Quick Start

### Instalação

```bash
cd frontend
npm install
```

### Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Adicione suas credenciais Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm run start
```

## 📁 Estrutura

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React Components
│   ├── styles/          # CSS Global
│   ├── lib/             # Utilitários (Supabase, etc)
│   └── types/           # TypeScript Types
├── public/              # Arquivos estáticos
└── package.json
```

## 🎨 Componentes Principais

- **Header**: Navegação principal
- **Dashboard**: Página principal com filtros
- **TopTrends**: Lista das 10 tendências principais
- **TrendChart**: Gráficos com Recharts
- **Sidebar**: Filtros por país e categoria

## 🔧 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Visualizações
- **Supabase** - Backend & Auth
- **Axios** - HTTP Client

## 📝 License

MIT
