-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create trends table
CREATE TABLE IF NOT EXISTS trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  search_volume INTEGER DEFAULT 0,
  growth_rate DECIMAL(10, 2) DEFAULT 0,
  country VARCHAR(2) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'all',
  related_queries TEXT[] DEFAULT '{}',
  source VARCHAR(50) DEFAULT 'google_trends',
  url TEXT,
  image_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(title, country, DATE(timestamp))
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trend_id UUID NOT NULL REFERENCES trends(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sentiment VARCHAR(20) DEFAULT 'neutral',
  language VARCHAR(10) DEFAULT 'pt',
  ai_model VARCHAR(50) DEFAULT 'ollama',
  confidence DECIMAL(5, 2) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  plan VARCHAR(20) DEFAULT 'free',
  status VARCHAR(20) DEFAULT 'active',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  favorite_countries TEXT[] DEFAULT '{}',
  favorite_categories TEXT[] DEFAULT '{}',
  language VARCHAR(10) DEFAULT 'pt',
  theme VARCHAR(20) DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_digest BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trending_history table (for analytics)
CREATE TABLE IF NOT EXISTS trending_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trend_id UUID NOT NULL REFERENCES trends(id) ON DELETE CASCADE,
  search_volume_snapshot INTEGER,
  growth_rate_snapshot DECIMAL(10, 2),
  rank INTEGER,
  country VARCHAR(2) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table (for scheduler tracking)
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create API logs table
CREATE TABLE IF NOT EXISTS api_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_trends_country ON trends(country);
CREATE INDEX idx_trends_category ON trends(category);
CREATE INDEX idx_trends_timestamp ON trends(timestamp DESC);
CREATE INDEX idx_trends_growth_rate ON trends(growth_rate DESC);
CREATE INDEX idx_trends_search_volume ON trends(search_volume DESC);
CREATE INDEX idx_insights_trend_id ON insights(trend_id);
CREATE INDEX idx_insights_sentiment ON insights(sentiment);
CREATE INDEX idx_trending_history_trend_id ON trending_history(trend_id);
CREATE INDEX idx_trending_history_recorded_at ON trending_history(recorded_at DESC);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_api_logs_endpoint ON api_logs(endpoint);
CREATE INDEX idx_api_logs_created_at ON api_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public trends access
CREATE POLICY \"Trends are publicly readable\"
  ON trends FOR SELECT
  USING (true);

CREATE POLICY \"Only authenticated users can insert trends\"
  ON trends FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policies for insights
CREATE POLICY \"Insights are publicly readable\"
  ON insights FOR SELECT
  USING (true);

CREATE POLICY \"Only authenticated users can insert insights\"
  ON insights FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policies for users
CREATE POLICY \"Users can read their own profile\"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY \"Users can update their own profile\"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for user_preferences
CREATE POLICY \"Users can read their own preferences\"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY \"Users can update their own preferences\"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_trends_updated_at BEFORE UPDATE ON trends
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically create user preferences
CREATE OR REPLACE FUNCTION create_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-create preferences
CREATE TRIGGER create_user_preferences_on_signup AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_user_preferences();

-- Insert sample data for countries and categories
CREATE TABLE IF NOT EXISTS countries (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10)
);

INSERT INTO countries (code, name, emoji) VALUES
  ('BR', 'Brasil', '🇧🇷'),
  ('US', 'Estados Unidos', '🇺🇸'),
  ('GB', 'Reino Unido', '🇬🇧'),
  ('DE', 'Alemanha', '🇩🇪'),
  ('FR', 'França', '🇫🇷'),
  ('JP', 'Japão', '🇯🇵'),
  ('IN', 'Índia', '🇮🇳'),
  ('CA', 'Canadá', '🇨🇦'),
  ('AU', 'Austrália', '🇦🇺'),
  ('MX', 'México', '🇲🇽')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10)
);

INSERT INTO categories (id, name, emoji) VALUES
  ('all', 'Todos', '📊'),
  ('business', 'Negócios', '💼'),
  ('technology', 'Tecnologia', '💻'),
  ('entertainment', 'Entretenimento', '🎬'),
  ('sports', 'Esportes', '⚽'),
  ('health', 'Saúde', '🏥'),
  ('science', 'Ciência', '🔬'),
  ('politics', 'Política', '🏛️'),
  ('fashion', 'Moda', '👗'),
  ('travel', 'Viagem', '✈️')
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
"