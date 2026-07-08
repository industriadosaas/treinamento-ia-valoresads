# Treinamento de IA · ValoresAds Consultoria

Deck de treinamento corporativo de IA (29 slides) na identidade da ValoresAds — grafite + âmbar, tipografia Space Grotesk / IBM Plex, com efeitos cinematográficos e revelações por clique.

Site estático, **sem build e 100% offline**: fontes, imagens e o motor de slides são todos locais.

## Como apresentar

Abra `index.html` em qualquer navegador (duplo clique já funciona).

| Ação | Tecla / gesto |
|------|---------------|
| Avançar (revela o próximo elemento ou passa de slide) | `→` · `Espaço` · `PgDn` · toque na metade direita |
| Voltar | `←` · `PgUp` · toque na metade esquerda |
| Primeiro / último slide | `Home` / `End` |
| Exportar PDF (um slide por página, tudo revelado) | `Ctrl/Cmd + P` |

**Builds por clique:** slides com elementos marcados começam ocultos e revelam um a um a cada avanço (ex.: slide 21 mostra "Contexto é tudo" → "Como eu faço um ovo?" → cada pergunta → conclusão). Quando tudo está revelado, o próximo avanço passa de slide. Na impressão/PDF, tudo aparece revelado.

## Estrutura (4 blocos)

1. **Contexto** — por que agora, linha do tempo até 2026, como a IA generativa funciona, a escada assistente → copiloto → agente
2. **Onde está o valor** — estado da adoção (dados 2026), manchetes da indústria, mapa de casos por área, casos práticos
3. **Maturidade & riscos** — níveis NV00–05, por que pilotos falham, riscos e governança
4. **Mão na massa** — prompts (Prompt × Comando, contexto, a fórmula, intenções, métodos, antes/depois), método ValoresAds, exercício, plano de 90 dias, encerramento

## Arquivos

```
index.html          markup dos 29 slides (<section> inline-styled dentro de <deck-stage>)
deck-stage.js        web component do palco: navegação, escala, notas do apresentador, impressão
deck-fragments.js    efeitos cinematográficos + revelações por clique (data-frag)
assets/
  valoresads-white.png   logo (branca, para o fundo escuro)
  fonts/                 Space Grotesk + IBM Plex Sans/Mono (woff2 self-hosted) + fonts.css
```

Para editar um slide, mexa direto no `<section>` correspondente em `index.html` — os estilos são inline. Para tornar um elemento "clicável" (revelação por clique), adicione `data-frag="N"` a ele.

## Pendência

O slide de encerramento usa o contato placeholder `contato@valoresads.com.br`. Substitua pelo contato real quando definido (busque `contato@valoresads.com.br` em `index.html`).
