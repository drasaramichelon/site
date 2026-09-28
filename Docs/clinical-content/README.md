# Clinical Content — Dra. Sara Michelon

Esta pasta transforma `site novo 2026.docx` em uma estrutura legível por Copilot/Cursor/Claude Code e outros agentes da IDE.

## Objetivo

Usar o documento enviado pela Dra. Sara como **fonte clínica** durante a implementação do site, sem exigir que o agente interprete diretamente um DOCX longo e sem estrutura por rota.

O pacote contém:

- `routes/`: 26 arquivos Markdown, um por rota de tratamento existente.
- `content-map.json`: mapa de cobertura, status e estratégia de merge.
- `source/site-novo-2026-full.md`: conversão completa e rastreável do DOCX.
- este `README.md`: regras de uso.

## Hierarquia de fontes

Ao editar conteúdo clínico:

1. **DOCX original da Dra. Sara** e os Markdown derivados nesta pasta: fonte clínica primária para o que eles efetivamente afirmam.
2. **Matriz Mestra V4**: fonte de arquitetura, slug, SEO, intenção de busca, geo e estratégia de indexação.
3. **Conteúdo atual do site/Sanity**: pode conter material adicional já validado, principalmente nas rotas que o DOCX não cobre completamente.
4. Não inventar informações clínicas para preencher lacunas.

A Matriz Mestra não deve sobrescrever afirmações clínicas da Dra. Sara, e o DOCX não deve alterar automaticamente URLs/SEO definidos pela Matriz.

## Regra principal: MERGE, não replace

Mesmo arquivos marcados `ready_for_merge` **não devem substituir cegamente** a página atual.

Fluxo correto:

1. ler `content-map.json`;
2. abrir o Markdown da rota;
3. comparar com o conteúdo atual no repository/Sanity/fallback;
4. incorporar o conteúdo novo ou mais preciso;
5. preservar informações atuais que não contradigam o documento e já tenham fonte/autorização;
6. sinalizar conflitos em vez de resolvê-los por suposição.

## Significado dos status

- `ready_for_merge`: o DOCX contém uma seção clínica robusta para a rota.
- `partial_needs_existing_content`: existe uma subseção direta, mas ela não é suficiente para substituir toda a página.
- `reference_only_do_not_replace`: o tratamento é apenas citado em outros contextos.
- `no_source_do_not_change`: não foi encontrado conteúdo clínico utilizável para a rota.

Resumo deste pacote:

- ready_for_merge: 12
- partial_needs_existing_content: 7
- reference_only_do_not_replace: 6
- no_source_do_not_change: 1

## Marcadores do documento

Trechos como:

- `[BOTÃO: ...]`
- `[IMAGEM: ...]`
- `📷 FOTO SUGERIDA: ...`
- `→ LINK: ...`
- `[ANTES E DEPOIS ...]`

são **instruções de implementação**, não texto para exibir literalmente no frontend.

Casos clínicos, antes/depois e fotografias de pacientes só podem ser publicados quando houver ativo adequado e autorização.

## Hubs e páginas filhas

O DOCX agrupa alguns assuntos que o site separa em URLs próprias:

- Implantes + Prótese Protocolo
- Periodontia + Cirurgia Gengival
- Ortodontia + Alinhadores/Invisalign
- Harmonização Facial + procedimentos filhos

Os arquivos de rota já fazem esse mapeamento, mas podem repetir trechos para manter rastreabilidade.

**Não publicar a mesma copy integralmente no hub e na página filha.**

Use:
- hub = contexto, diagnóstico, visão geral e links;
- página filha = profundidade específica.

## SEO

Os textos podem receber adaptação leve para:

- títulos e subtítulos;
- escaneabilidade;
- links internos;
- termos definidos na Matriz V4;
- SEO local.

Mas a adaptação não pode:

- alterar sentido clínico;
- tornar uma possibilidade em promessa;
- transformar indicação condicional em indicação universal;
- inventar tempo de duração;
- inventar preço;
- inventar número de sessões;
- inventar resultados;
- inventar credenciais;
- inventar casos clínicos.

## Imagens

Priorizar as orientações de imagem contidas nos próprios Markdown e cruzá-las com a auditoria do acervo real já existente no projeto.

Regra:
- foto real da clínica/equipe/Sara quando ela representa de fato o contexto;
- banner procedural já aprovado quando ele explica melhor o tratamento;
- não atribuir um procedimento específico a uma foto real ambígua.

## Sanity / fallback

A implementação deve manter a arquitetura atual:

`Sanity -> repository central -> fallback local`

Não criar uma segunda fonte de conteúdo em runtime lendo Markdown no frontend, a menos que isso seja uma decisão arquitetural explícita.

Estes arquivos são **documentação-fonte para o agente**, não necessariamente a camada de conteúdo de produção.

## Antes de implementar

O agente deve ler:

1. `README.md`
2. `content-map.json`
3. apenas os arquivos em `routes/` correspondentes às páginas que irá alterar
4. a Matriz Mestra V4
5. o conteúdo atual dessas páginas

## Depois de implementar

Validar:

- nenhuma URL alterada sem motivo;
- titles/canonicals/indexação preservados;
- conteúdo clínico não inventado;
- links internos funcionando;
- CTA correto;
- imagens autorizadas;
- FAQs semanticamente corretas;
- lint;
- typecheck;
- build;
- QA visual mobile/desktop.
