# Banners de Tratamentos — Dra. Sara Michelon

Pacote preparado para integração no projeto Next.js.

## Conteúdo

- `public/images/treatments/`: 26 serviços, cada um com:
  - `hero-desktop.webp`
  - `hero-mobile.webp`
- `_extras/`: 14 alternativas não selecionadas, convertidas para WebP e mantidas fora de `public`.
- `lib/treatment-banners.ts`: mapa pronto de slug → imagens.
- `manifest.csv` e `manifest.json`: rastreabilidade da imagem original para o arquivo final.

## Formato

As fotografias foram convertidas de PNG para **WebP** com qualidade 88, preservando as dimensões originais.

Não foi criada versão SVG porque SVG é apropriado para vetores (logo, ícones e ilustrações), não para fotografia. Converter uma fotografia raster para `.svg` apenas encapsularia pixels, sem ganho real de qualidade ou performance.

## Integração

Copie a pasta `public/images/treatments` para o projeto.

Exemplo com `<picture>`:

```tsx
<picture>
  <source
    media="(max-width: 767px)"
    srcSet={treatmentBanners[slug].mobile}
  />
  <img
    src={treatmentBanners[slug].desktop}
    alt=""
    fetchPriority="high"
  />
</picture>
```

Se estiver usando `next/image`, também é válido selecionar `src` com media query/CSS ou um componente responsivo já existente no projeto.

## Curadoria

Nos clusters 2B e 4A houve múltiplas alternativas desktop. Foi escolhida uma imagem principal por serviço e as restantes foram preservadas em `_extras`.

## Otimização

Tamanho total dos 52 PNGs selecionados: 75.0 MB  
Tamanho total dos 52 WebPs: 3.2 MB  
Redução aproximada: 95.7%


## Atualização v2

Foram substituídos os banners de 8 serviços por versões regeneradas com foco mais claro no próprio procedimento:

- periodontia
- cirurgia-gengival
- implantes-dentarios
- protese-protocolo
- inlays-onlays
- reabilitacao-oral
- clareamento-dental
- fechamento-de-diastemas
