# Crust Pizza Co. — landing page white-label

Landing page em HTML, CSS e JavaScript nativo para pizzarias. O projeto não
precisa de build ou dependências locais: abra `index.html` por um servidor
estático para que os módulos ES e o `localStorage` funcionem corretamente.

```bash
python3 -m http.server 8080
# acesse http://localhost:8080
```

## Personalização

O arquivo [`config.js`](./config.js) é a fonte única dos dados da pizzaria.
Nele ficam marca, cores, fontes, navegação, textos, produtos, tamanhos,
adicionais, horários, taxas, formas de pagamento, mensagens do WhatsApp e
flags das seções. Para uma nova instalação, altere esse arquivo e substitua
as imagens nos caminhos configurados.

Cada produto pode ter vários `sizes` e `extras`. O preço exibido no card é o
menor tamanho; o modal calcula o preço final com adicionais e quantidade.

## Pedido

A sacola persiste no navegador usando a chave `CONFIG.cart.storageKey`.
Os dados de nome, telefone e endereço do cliente são persistidos separadamente
em `CONFIG.cart.customerData.storageKey` quando
`CONFIG.cart.customerData.persistenceEnabled` está habilitado. Esses dados são
restaurados ao abrir o checkout e salvos após a validação de um pedido.
O checkout valida os dados, calcula entrega grátis conforme a configuração e
monta a mensagem definida em `CONFIG.whatsapp.orderMessageTemplate`. O pedido
é apenas aberto no WhatsApp usando `wa.me`; a sacola não é apagada
automaticamente.
Todos os links do WhatsApp usam exclusivamente `CONFIG.whatsapp.number`.
Informe esse número com DDI e DDD, somente com dígitos, para manter o destino
consistente em toda a aplicação.
O botão flutuante da página é controlado por `CONFIG.featureFlags.floatingCart`
e abre diretamente a sacola, exibindo a quantidade atual de itens.

As imagens de demonstração são caminhos preparados em `config.js`. Enquanto
os arquivos locais não forem substituídos, a interface usa um fallback visual
remoto para evitar imagens quebradas.

## PWA opcional

O modo aplicativo instalável é controlado por `CONFIG.pwa.enabled`. Quando
está habilitado, o navegador recebe um manifesto gerado a partir de
`CONFIG.pwa` e registra o service worker definido em `serviceWorkerPath`.

Para personalizar a instalação, altere somente `CONFIG.pwa`:

- `name` e `shortName`: nome exibido no instalador e na tela inicial.
- `startUrl`, `scope`, `display` e `orientation`: comportamento do aplicativo.
- `themeColor` e `backgroundColor`: cores da janela e da tela de abertura.
- `icons`: caminhos, tamanhos e formatos dos ícones do smartphone.
- `cacheName`: versão do cache para invalidar arquivos antigos.

Os ícones devem existir nos tamanhos declarados, preferencialmente PNG
quadrado de 192x192 e 512x512 pixels. O `manifest.json` na raiz é um
fallback estático; em runtime ele é substituído pelo manifesto derivado do
`CONFIG`, permitindo reutilizar o mesmo código em diferentes tenants.

O service worker exige HTTPS em produção (ou `localhost` durante o
desenvolvimento). Para desativar completamente o PWA, use
`pwa.enabled: false`.

## CEP e preenchimento de endereço

No checkout de entrega, o cliente informa o CEP e a aplicação consulta a
BrasilAPI em `CONFIG.cart.addressLookup.apiUrl`. Caso a versão primária
retorne 404, a URL `fallbackApiUrl` é utilizada. O retorno preenche rua,
bairro, cidade e UF automaticamente; número e complemento continuam sendo
informados pelo cliente.

O recurso e suas mensagens são configuráveis em `CONFIG.cart.addressLookup`.
A consulta acontece ao sair do campo CEP ou ao pressionar Enter, e erros de
CEP inválido, CEP não encontrado e indisponibilidade da API são apresentados
no próprio formulário.

## Pizza meio a meio

O recurso é configurado em `CONFIG.cart.halfPizza`. É possível ativar ou
desativar a opção, permitir o mesmo sabor nas duas metades e decidir se
categorias não relacionadas a pizza podem aparecer como complemento.

As três regras de preço disponíveis são:

- `highest`: cobra o sabor de maior valor.
- `average`: cobra a média dos dois sabores.
- `sum_halves`: soma metade do preço de cada sabor.

Quando ativado, o cliente marca “Meia pizza” no modal, escolhe o segundo
sabor e a combinação é salva como um único item na sacola. O tamanho
selecionado é aplicado aos dois sabores; se o segundo produto não possuir
esse tamanho, o sistema usa o primeiro tamanho disponível dele.
