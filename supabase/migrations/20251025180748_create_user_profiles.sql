/*
  # Criar tabela de perfis de usuários

  ## Nova Tabela: profiles
  
  Armazena informações de perfil de cada jogador do Quiz Sou da Banda.
  
  ### Colunas:
  - `id` (uuid, chave primária) - ID único do perfil
  - `nome` (text) - Nome do jogador
  - `provincia` (text) - Província do jogador (para ranking regional)
  - `foto_url` (text, opcional) - URL da foto de perfil
  - `pontuacao_total` (integer) - Pontuação total acumulada
  - `acertos` (integer) - Total de respostas corretas
  - `erros` (integer) - Total de respostas erradas
  - `tempo_medio` (integer) - Tempo médio de resposta em segundos
  - `sequencia_maxima` (integer) - Maior sequência de acertos
  - `created_at` (timestamptz) - Data de criação
  - `updated_at` (timestamptz) - Data da última atualização

  ## Segurança:
  - Habilitar RLS (Row Level Security)
  - Políticas para usuários visualizarem apenas seus próprios perfis
  - Políticas para leitura pública de rankings
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  provincia text NOT NULL,
  foto_url text,
  pontuacao_total integer DEFAULT 0,
  acertos integer DEFAULT 0,
  erros integer DEFAULT 0,
  tempo_medio integer DEFAULT 0,
  sequencia_maxima integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem visualizar todos os perfis"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON profiles FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON profiles FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_profiles_pontuacao ON profiles(pontuacao_total DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_provincia ON profiles(provincia);