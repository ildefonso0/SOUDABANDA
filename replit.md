# Sou da Banda - Quiz Interativo sobre Angola

## Visão Geral
"Sou da Banda" é um aplicativo mobile multiplataforma (Android e iOS) desenvolvido com Expo React Native. É um quiz interativo e cultural sobre Angola, com design moderno, animações suaves e foco em diversão, orgulho nacional e aprendizagem.

## Identidade Visual

### Cores Principais
- 🔴 **Vermelho profundo** (#D62828) - coragem e energia  
- ⚫ **Preto elegante** (#0B0B0B) - base de contraste
- 🟡 **Dourado** (#FDC500) - símbolo de riqueza e cultura
- ⚪ **Branco** (#F5F5F5) - equilíbrio e legibilidade

### Tipografia
- **Título** → Poppins Bold
- **Texto** → Inter Regular  
- **Números/Pontuação** → Orbitron

## Estrutura do Projeto

```
app/
├── (tabs)/                # Navegação por tabs
│   ├── _layout.tsx       # Layout das tabs
│   ├── index.tsx         # Tela inicial
│   ├── treino.tsx        # Modo treino
│   ├── ranking.tsx       # Ranking nacional
│   └── perfil.tsx        # Perfil do usuário
├── _layout.tsx           # Layout raiz
├── jogo.tsx             # Tela de quiz
├── sobre-angola.tsx     # Informações sobre Angola
└── +not-found.tsx       # Tela 404

components/
├── QuestionCard.tsx          # Componente de pergunta reutilizável (legacy)
├── DynamicQuizRenderer.tsx   # Renderizador dinâmico para todos os tipos
├── QuizMultiplaEscolha.tsx   # Componente para múltipla escolha
├── QuizVerdadeiroFalso.tsx   # Componente para verdadeiro/falso
├── QuizImagemTexto.tsx       # Componente para quiz com imagem
└── QuizCompletarFrase.tsx    # Componente para completar frase

constants/
└── theme.ts             # Tema e cores do app

types/
└── quiz.ts              # Tipos TypeScript

services/
├── questionsService.ts  # Serviço principal de perguntas
├── updateService.ts     # Serviço de sincronização com GitHub
└── cache.ts             # Serviço de cache local (AsyncStorage)

data/
└── questions.json       # Banco de perguntas local (fallback)
```

## Funcionalidades Implementadas

### ✅ Versão Atual (v1.0)
- [x] Tela inicial com logo animado
- [x] Navegação por tabs
- [x] Modo Quiz com temporizador (30s)
- [x] Modo Treino com filtragem por categorias
- [x] Sistema de pontuação e streak
- [x] Feedback visual e tátil (vibração)
- [x] Tela de ranking com mock data
- [x] Tela de perfil com estatísticas
- [x] Tela "Sobre Angola" com conteúdo educativo
- [x] Tema dark com cores patrióticas
- [x] Animações suaves
- [x] Suporte para perguntas com imagem
- [x] Suporte para perguntas com áudio (expo-av)
- [x] Componente QuestionCard reutilizável para todos os tipos de perguntas

### ✅ Integração GitHub (v2.0 - 24 de Outubro de 2025)
- [x] Sincronização automática com repositório GitHub
- [x] Suporte para múltiplos tipos de quiz (multipla_escolha, verdadeiro_falso, imagem_para_texto, completar_frase)
- [x] Cache local para modo offline (AsyncStorage)
- [x] Atualização automática a cada 24 horas
- [x] Botão de atualização manual
- [x] Status de sincronização visível ao usuário
- [x] Comparação de versões para downloads inteligentes

### 🚧 Próximas Implementações
- [ ] Sistema de ranking online (backend)
- [ ] Compartilhamento de resultados
- [ ] Estatísticas avançadas por categoria
- [ ] Aprendizagem adaptativa (IA)
- [ ] Notificações push para novos conteúdos

## Estrutura de Dados

### Formato de Perguntas (JSON)
```json
{
  "id": "001",
  "categoria": "História",
  "tipo": "text|image|audio|mixed",
  "pergunta": "Qual foi o primeiro presidente de Angola?",
  "opcoes": [
    {"texto": "Agostinho Neto", "imagem": "url", "audio": "url"}
  ],
  "resposta_correta": 0,
  "explicacao": "Agostinho Neto foi o primeiro presidente..."
}
```

## Scripts Disponíveis

- `npm run web` - Inicia o servidor de desenvolvimento web (porta 5000)
- `npm run dev` - Inicia Expo com todas as plataformas
- `npm run build:web` - Build para web
- `npm run lint` - Linter
- `npm run typecheck` - Verificação de tipos

## Tecnologias Utilizadas

- **Expo 54** - Framework React Native
- **React Navigation** - Navegação entre telas
- **Expo Router** - Roteamento file-based
- **TypeScript** - Tipagem estática
- **Expo Linear Gradient** - Gradientes
- **Expo Haptics** - Feedback tátil
- **Expo Icons** - Ícones
- **Expo AV** - Reprodução de áudio (deprecado no SDK 54, migrar para expo-audio futuramente)

## Desenvolvimento no Replit

O app está configurado para rodar no ambiente Replit:
- Porta: 5000
- Host: lan (para acesso via proxy do Replit)
- Cache desabilitado para atualizações em tempo real
- Status Bar: light (texto claro)

## Histórico de Mudanças

### 24 de Outubro de 2025
- ✅ Criação inicial do projeto
- ✅ Implementação de todas as telas principais
- ✅ Sistema de quiz e treino funcional
- ✅ Correção do bug "Todas as Categorias" no modo treino
- ✅ Adição de suporte para perguntas com áudio usando expo-av
- ✅ QuestionCard com controles play/pause para áudio
- ✅ **Integração completa com GitHub**:
  - Sincronização automática de perguntas e categorias
  - Suporte para 4 tipos de quiz (múltipla escolha, verdadeiro/falso, imagem-texto, completar frase)
  - Cache local com AsyncStorage
  - Auto-update a cada 24 horas
  - Botão de atualização manual na tela inicial

## Integração com GitHub

### Repositório de Dados
**URL:** https://github.com/ildefonso0/QUIZ_SOU_DA_BANDA

O aplicativo agora sincroniza automaticamente com este repositório do GitHub, que serve como base de dados central. Toda vez que você fizer `push` de novos quizzes ou atualizações, o app baixará automaticamente o novo conteúdo dentro de 24 horas.

### Estrutura de Dados no GitHub

```
QUIZ_SOU_DA_BANDA/
├── data/
│   ├── config.json       # Versão, tema e configurações
│   ├── categorias.json   # Lista de categorias
│   └── quizzes.json      # Todas as perguntas
└── imagens/              # Imagens dos quizzes
    ├── historia/
    ├── geografia/
    └── cultura/
```

### Tipos de Quiz Suportados

1. **multipla_escolha** - Pergunta com múltiplas opções
2. **verdadeiro_falso** - Pergunta de verdadeiro ou falso
3. **imagem_para_texto** - Mostrar imagem e pedir resposta em texto
4. **completar_frase** - Completar uma frase ou pensamento

### Como Funciona

1. **Primeira Execução**: App baixa todos os dados do GitHub
2. **Verificação de Versão**: Compara `config.versao` e `ultima_atualizacao`
3. **Download Condicional**: Só baixa se houver versão nova
4. **Cache Local**: Dados ficam salvos para uso offline
5. **Auto-Update**: Verifica atualizações a cada 24h automaticamente

### Atualização Manual

O usuário pode forçar uma atualização clicando no botão "Atualizar Conteúdo" na tela inicial.

## Próximos Passos Importantes

1. **Sistema de Ranking Online**
   - Backend para salvar pontuações
   - Ranking por província
   - Atualização em tempo real

3. **Conteúdo Multimídia**
   - Upload de imagens das perguntas
   - Gravação de áudios educativos
   - Otimização de assets

4. **Melhorias de UX**
   - Mais animações (partículas ao acertar)
   - Sons de batuque angolano
   - Tutorial inicial (onboarding)
