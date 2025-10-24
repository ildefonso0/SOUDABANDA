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
└── QuestionCard.tsx     # Componente de pergunta reutilizável

constants/
└── theme.ts             # Tema e cores do app

types/
└── quiz.ts              # Tipos TypeScript

services/
└── questionsService.ts  # Serviço de perguntas

data/
└── questions.json       # Banco de perguntas (10 perguntas sobre Angola)
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

### 🚧 Próximas Implementações
- [ ] Sincronização com Google Drive (perguntas, imagens, áudios)
- [ ] Sistema de ranking online (backend)
- [ ] Modo offline completo
- [ ] Compartilhamento de resultados
- [ ] Estatísticas avançadas por categoria
- [ ] Aprendizagem adaptativa (IA)

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

## Próximos Passos Importantes

1. **Integração Google Drive**
   - Configurar API do Google Drive
   - Implementar sincronização automática (24h)
   - Cache local para modo offline

2. **Sistema de Ranking Online**
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
