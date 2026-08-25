# Mala pra Portugal — como publicar

## Subir

1. Crie um repositório (pode ser público; nada aqui é sensível — o que você marcar fica só no seu celular).
2. Jogue os sete arquivos na **raiz** do repositório, sem pasta:
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-mask.png`, `apple-touch-icon.png`.
3. Settings → Pages → Source: **Deploy from a branch** → branch `main`, pasta `/ (root)`.
4. Espere um ou dois minutos e abra `https://SEUUSUARIO.github.io/NOMEDOREPO/`.

## Instalar no celular

- **iPhone:** abra no Safari (não no Chrome) → Compartilhar → Adicionar à Tela de Início.
- **Android:** o Chrome oferece "Instalar aplicativo" sozinho; se não oferecer, menu → Adicionar à tela inicial.

Depois de instalado ele abre em tela cheia, sem barra de navegador, e funciona sem internet.

## Cotação do euro

É automática. Ao abrir, o app tenta três fontes em sequência: AwesomeAPI, Banco Central Europeu
(Frankfurter) e ER-API. A primeira que responder vale. Se todas falharem, ele tenta de novo sozinho
em intervalos crescentes e continua usando o último valor salvo, mostrando há quantos dias ele é.
Um toque no valor força uma busca nova. O euro só é buscado de novo depois de cinco horas ou quando
o dia vira — não gasta rede à toa.

Os três serviços liberam CORS, então funcionam a partir do GitHub Pages. Não funcionam abrindo o
arquivo direto do disco (`file://`), porque aí a página não tem origem.

## Trocar o app depois

Suba o `index.html` novo por cima. A página é servida com **rede primeiro**, então a versão nova
aparece assim que você abrir com internet. Só se mexer nos ícones ou no manifest vale a pena
trocar o número em `VERSAO`, na primeira linha útil do `sw.js`, para limpar o cache antigo.

## Backup

Engrenagem → Backup → Exportar salva um `.json` com tudo: marcações, compras, preços, gastos com
data, anotações, decisões do modo de volta, itens que você adicionou e as cores. Guarde uma cópia
antes de trocar de celular. Importar aceita também backups da versão anterior do app.
