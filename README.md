# 🇦🇴 Sou da Banda

Quiz interativo sobre Angola - Conhecer Angola é jogá-la com orgulho!

## 🚀 Começando

Este é um aplicativo mobile multiplataforma desenvolvido com Expo React Native que puxa conteúdo automaticamente do GitHub.

### Pré-requisitos

- Node.js 20+
- npm ou yarn
- Repositório GitHub com os dados do quiz

### Instalação

```bash
npm install
```

### Executar

```bash
# Web (porta 5000)
npm run web

# Todas as plataformas
npm run dev
```

## 📱 Funcionalidades

- ✅ Quiz competitivo com temporizador
- ✅ Modo treino sem pressão
- ✅ Sistema de pontuação e streak
- ✅ Ranking nacional e por província
- ✅ Perfil com estatísticas detalhadas
- ✅ Sincronização automática com GitHub
- ✅ Suporte offline com cache local
- ✅ Onboarding com seleção de província
- ✅ Múltiplos tipos de perguntas (múltipla escolha, verdadeiro/falso, completar frase, imagem)
- ✅ Design com tema angolano

## 🎨 Cores de Angola

- Vermelho: #CE1126 (bandeira de Angola)
- Preto: #000000 (bandeira de Angola)
- Amarelo: #FFCB05 (bandeira de Angola)
- Branco: #F5F5F5

## 🔄 Integração com GitHub

Este aplicativo usa o GitHub como "backend" para armazenar todas as perguntas, categorias e configurações. O conteúdo é sincronizado automaticamente a cada 24 horas.

### Estrutura do Repositório GitHub

O repositório deve seguir esta estrutura:

```
QUIZ_SOU_DA_BANDA/
├── data/
│   ├── config.json        # Configurações e versão do app
│   ├── categorias.json    # Lista de categorias
│   └── quizzes.json       # Todas as perguntas
└── imagens/               # Imagens usadas nos quizzes
    ├── historia/
    ├── geografia/
    └── cultura/
```

### Formato dos Arquivos JSON

#### config.json

```json
{
  "versao": "1.0.0",
  "ultima_atualizacao": "2025-10-24T00:00:00Z",
  "intervalo_atualizacao_horas": 24,
  "tema": {
    "cor_primaria": "#CE1126",
    "cor_secundaria": "#FFCB05",
    "modo": "escuro"
  }
}
```

#### categorias.json

```json
[
  {
    "id": 1,
    "nome": "História",
    "descricao": "Eventos históricos de Angola",
    "icone": "https://raw.githubusercontent.com/.../icone.png"
  },
  {
    "id": 2,
    "nome": "Geografia",
    "descricao": "Cidades, rios e províncias",
    "icone": "https://raw.githubusercontent.com/.../icone.png"
  }
]
```

#### quizzes.json

```json
[
  {
    "id": 1,
    "categoria": "História",
    "tipo": "multipla_escolha",
    "pergunta": "Em que ano Angola conquistou a sua independência?",
    "opcoes": ["1973", "1974", "1975", "1976"],
    "resposta_correta": 2,
    "explicacao": "Angola conquistou sua independência em 11 de novembro de 1975."
  },
  {
    "id": 2,
    "categoria": "Geografia",
    "tipo": "verdadeiro_falso",
    "pergunta": "Luanda é a capital de Angola.",
    "resposta_correta": true,
    "explicacao": "Sim, Luanda é a capital e maior cidade de Angola."
  },
  {
    "id": 3,
    "categoria": "Cultura",
    "tipo": "imagem_para_texto",
    "imagem": "https://raw.githubusercontent.com/.../danca.jpg",
    "pergunta": "Qual é o nome desta dança tradicional?",
    "resposta_correta": "Semba",
    "explicacao": "O Semba é uma dança tradicional angolana que originou a Kizomba."
  },
  {
    "id": 4,
    "categoria": "História",
    "tipo": "completar_frase",
    "pergunta": "O primeiro presidente de Angola foi ___",
    "resposta_correta": "Agostinho Neto",
    "explicacao": "Dr. António Agostinho Neto foi o primeiro presidente de Angola."
  }
]
```

### Tipos de Quiz Suportados

1. **multipla_escolha** - Pergunta com 4 opções, apenas uma correta
   - `pergunta`: texto da pergunta
   - `opcoes`: array com 4 opções
   - `resposta_correta`: índice da opção correta (0-3)

2. **verdadeiro_falso** - Pergunta com resposta verdadeiro ou falso
   - `pergunta`: texto da pergunta
   - `resposta_correta`: true ou false

3. **imagem_para_texto** - Pergunta com imagem
   - `imagem`: URL da imagem
   - `pergunta`: texto da pergunta
   - `resposta_correta`: texto da resposta

4. **completar_frase** - Pergunta onde o usuário completa uma frase
   - `pergunta`: frase com espaço em branco (use ___)
   - `resposta_correta`: texto que completa a frase

### URLs do Repositório

Configure as URLs no arquivo `services/updateService.ts`:

```typescript
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/SEU_USUARIO/QUIZ_SOU_DA_BANDA/main';
```

O app irá buscar:
- Config: `${GITHUB_BASE_URL}/data/config.json`
- Categorias: `${GITHUB_BASE_URL}/data/categorias.json`
- Quizzes: `${GITHUB_BASE_URL}/data/quizzes.json`
- Imagens: `${GITHUB_BASE_URL}/imagens/categoria/arquivo.jpg`

### Atualização Automática

- O app verifica atualizações a cada 24 horas (configurável no `config.json`)
- Compara a versão local com a remota
- Baixa novos dados se houver atualização
- Mantém cache local para uso offline
- Notifica o usuário quando há novo conteúdo

### Atualização Manual

Os usuários podem forçar uma atualização manual através do botão "Atualizar Conteúdo" na tela inicial.

## 🗄️ Banco de Dados

O aplicativo usa Supabase para armazenar perfis de usuários e rankings. A estrutura do banco de dados:

### Tabela: profiles

- `id` (uuid) - ID único do perfil
- `nome` (text) - Nome do jogador
- `provincia` (text) - Província do jogador
- `pontuacao_total` (integer) - Pontuação total
- `acertos` (integer) - Total de acertos
- `erros` (integer) - Total de erros
- `tempo_medio` (integer) - Tempo médio de resposta
- `sequencia_maxima` (integer) - Maior sequência de acertos

## 📚 Documentação

Veja `replit.md` para documentação completa do projeto.

## 📄 Licença

Este projeto é de código aberto.
