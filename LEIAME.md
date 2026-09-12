# Meu intercâmbio — controle de gastos

Substitui o app da mala. O visual, os temas, a cotação automática e a aba de volta continuam
iguais; o que era checklist de mala virou controle de despesas.

## Subir

Jogue estes arquivos na **raiz** do repositório, por cima dos antigos:

`index.html`, `manifest.webmanifest`, `sw.js`

Os quatro ícones que já estão lá (`icon-192.png`, `icon-512.png`, `icon-512-mask.png`,
`apple-touch-icon.png`) continuam valendo, não precisa trocar.

A página é servida com **rede primeiro**, então a versão nova aparece assim que você abrir com
internet. Se mexer nos ícones ou no manifest, troque o número em `VERSAO`, na primeira linha útil
do `sw.js`, para limpar o cache antigo.

## Chave da IA para ler notas

O app precisa estar publicado no GitHub Pages. A API não aceita chamada de arquivo aberto direto
do disco, porque aí a página não tem origem.

1. Entre em `platform.claude.com` (é o console da API, conta separada da assinatura do Claude).
2. Em **Billing**, adicione crédito. Confira o limite de gasto da sua organização na mesma página.
3. Em **Settings → API keys**, crie uma chave. Ela aparece uma vez só: copie na hora.
4. Abra o app, toque na engrenagem, cole em **Leitura de notas por IA** e toque em **Guardar**.

A chave fica só neste aparelho, não entra no backup e não é guardada em cache pelo service worker.
Pode ser apagada a qualquer momento (limpe o campo e toque em Guardar) e revogada no console.

Custo estimado: entre US$ 0,01 e US$ 0,02 por nota no Sonnet 5, ou cerca da metade no Haiku 4.5.
O Sonnet é o padrão porque erra menos em nota impressa com abreviação.

Sem chave, o app funciona inteiro; só o botão de fotografar a nota some e o lançamento é manual.

## Como se usa

O botão **+**, no canto inferior direito, está em todas as telas e abre quatro caminhos:

**Gasto rápido** para o café, o metro, o pão. Valor, categoria, pronto. Vira uma compra de um
item só. Estabelecimento, data e forma de pagamento ficam escondidos atrás de "onde, quando e
como paguei", com valores padrão.

**Fotografar nota** lê a foto e, quando tudo fecha (soma dos itens bate com o total impresso,
nenhum item ilegível, categorias reconhecidas, cotação disponível, sem suspeita de duplicata),
**registra sozinha** e mostra o resultado com um botão de ajustar. Quando alguma coisa não fecha,
ela para e abre a revisão dizendo o que precisa de conferência, com os itens problemáticos já
marcados e abertos. Se preferir revisar toda nota antes de salvar, tem um interruptor nos ajustes.

**Print ou foto da galeria** faz o mesmo caminho, para comprovante de app, e-mail ou nota longa
(até três fotos da mesma nota).

**Lançar à mão** abre a nota inteira em branco, item por item.

E ainda **comparar euro e dólar**, que só compara e não registra nada.

## As três abas

**Painel** — um número grande com o período que você escolher na barra de filtros, a tendência do
período, média por dia, economizado e número de compras. Se houver orçamento para aquele período,
uma barra mostra quanto já foi. Abaixo, uma frase que interpreta o ritmo (se o orçamento fecha, de
quanto é o teto diário, se você está acima do ritmo do mês), as três maiores categorias e as
últimas compras.

**Compras** — o histórico. Toque num cartão para abrir os itens. Ali dá para **corrigir** a compra
inteira, informar o **valor real cobrado** pelo cartão (a estimativa e a cotação ficam guardadas, a
diferença aparece em cada item) e **cancelar ou estornar** sem apagar nada.

**Relatórios** — dia, semana, mês e intercâmbio inteiro, com navegação entre períodos, comparação
com o período anterior, três maiores compras, percentual por categoria, acumulado, evolução mensal
e o resumo do orçamento com a projeção até o retorno.

**Volta** aparece como quarta aba em 1º de fevereiro de 2027, ou antes se você ligar nos ajustes.
Cada coisa que veio na mala ou foi comprada aqui recebe um destino: volta, fica ou dar. O cartão
soma o peso do que volta contra os 23 kg, e a arrumação em tela cheia lista um item por linha no
dia de fechar a mala. As decisões e os pesos que você já tinha salvo no app antigo são herdados na
primeira abertura.

Na engrenagem, no topo: chave e modelo da IA, orçamento (total, mensal, semanal, diário e
reserva), datas do intercâmbio, temas e cores, aba da volta, backup e uma seção "como o app
funciona".

O cabeçalho encolhe quando você rola, deixando visíveis só o nome, a cotação e o orçamento.

## Regras do controle

1. A cotação é buscada no momento do registro e **congelada** na compra. Compra antiga nunca é
   recalculada com euro novo.
2. Cada item é convertido e arredondado individualmente. Por isso a soma dos itens em reais pode
   diferir em centavos de "total × cotação".
3. Taxas, spread e IOF só entram quando você os informa. Nada é inventado.
4. Item ilegível fica como "não legível". Divergência entre itens e total é registrada, nunca
   ajustada em silêncio.
5. Compra cancelada ou estornada sai dos totais e continua no histórico.

## Backup e planilha

Ajustes → Backup: **Exportar backup** salva um `.json` com tudo (compras, itens, orçamento,
decisões da volta e as cores). **Exportar CSV** salva os lançamentos nas mesmas 33 colunas da
planilha, separador `;`, pronto para abrir no Excel.

O `.json` é a fonte para gerar a planilha completa com dashboard, relatórios e gráficos: basta
mandá-lo no chat e pedir a planilha.

Guarde uma cópia do backup fora do celular de vez em quando. Os dados moram no armazenamento do
navegador: limpar os dados do site apaga tudo.
