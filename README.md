# Lígia Cavallera — Teaser Page

React + Vite + Tailwind v4 + GSAP. Sem API keys, sem backend.

## Estrutura

```
ligia-cavallera/
├── public/
│   └── images/
│       ├── ligia.jpeg
│       └── barril.png
├── src/
│   ├── components/
│   │   ├── AcousticAging.tsx
│   │   ├── Artist.tsx
│   │   ├── BackgroundEffects.tsx
│   │   ├── Concept.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Status.tsx
│   │   └── Waveform.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Rodar localmente

```bash
npm install
npm run dev
# Abre em http://localhost:3000
```

---

## Deploy no GitHub + Vercel

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome: `ligia-cavallera` · Public · sem README
3. Clique em **Create repository**

### 2. Subir os arquivos

**Via terminal (recomendado):**
```bash
cd ligia-cavallera
git init
git add .
git commit -m "feat: ligia cavallera teaser"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ligia-cavallera.git
git push -u origin main
```

**Via interface do GitHub:**
- Clique em "uploading an existing file"
- Arraste toda a pasta mantendo a estrutura

### 3. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) → login com GitHub
2. **Add New Project** → selecione `ligia-cavallera`
3. Configurações (Vercel detecta automaticamente):
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Sem variáveis de ambiente necessárias** ← esse era o problema anterior
5. Clique em **Deploy**

URL gerada: `ligia-cavallera.vercel.app`

---

## O que foi corrigido vs. versão AI Studio

| Problema | Causa | Correção |
|---|---|---|
| Build quebrava na Vercel | `vite.config.ts` exigia `GEMINI_API_KEY` | Removida a injeção da key |
| Imagens não carregavam | URLs do AI Studio Cloud Run (privadas) | Imagens em `/public/images/` |
| Dependências desnecessárias | `@google/genai`, `express`, `dotenv` no package.json | Removidas |
| Footer errado | "LabFuture" | Corrigido para "Nova AI Solutions" |
