/* Meu intercâmbio — service worker
   Guarda a página inteira para ela abrir sem internet (metro, loja sem sinal,
   viagem). A cotação do euro e a leitura de notas pela API nunca são guardadas:
   sempre vão à rede, e o app se vira com o último valor salvo quando a rede falha.

   Ao publicar uma versão nova do index.html, troque o número em VERSAO. */

var VERSAO = "intercambio-v1";

var CASCA = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-mask.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSAO)
      .then(function (c) { return c.addAll(CASCA); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) {
        return n === VERSAO ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  /* cotação e qualquer outro domínio: rede direto, sem cache */
  if (url.origin !== self.location.origin) return;

  /* a página em si: rede primeiro, cache só se não houver rede.
     É o que garante que uma versão nova no GitHub apareça na hora. */
  if (req.mode === "navigate" || (req.destination === "document")) {
    e.respondWith(
      fetch(req).then(function (r) {
        var copia = r.clone();
        caches.open(VERSAO).then(function (c) { c.put(req, copia); });
        return r;
      }).catch(function () {
        return caches.match(req).then(function (g) { return g || caches.match("./index.html"); });
      })
    );
    return;
  }

  /* o resto: responde do cache na hora e atualiza por baixo */
  e.respondWith(
    caches.open(VERSAO).then(function (cache) {
      return cache.match(req).then(function (guardado) {
        var rede = fetch(req).then(function (r) {
          if (r && r.status === 200) cache.put(req, r.clone());
          return r;
        }).catch(function () { return guardado; });
        return guardado || rede;
      });
    })
  );
});
