// Cache name
const CACHE_NAME = 'pwa-sample-caches-v1';
// Cache targets
const urlsToCache = [
  './',
  './js/app.js',
  './js/questions.js',
  './index.html',
  './css/bootstrap.css',
  './css/inputform.css',
  './css/question.css',
  './css/result1.css',
  './css/title.css',
  './images/a-zs_logo_full.png',
  './images/a-zs_logo.png',
  './images/apex.jpg',
  './images/Fallguys.jpg',
  './images/fortnite.jfif',
  './images/mariokart8dx.jfif',
  './images/pokemon.png',
  './images/rocketleague.jpg',
  './images/splatoon3.png',
  './images/streetfighter6.png',
  './images/sumabura.jfif',
  './html/answersInformation.html',
  './html/checkPhoto.html',
  './html/informationConsent.html',
  './html/inputform.html',
  './html/question.html',
  './html/stats.html',
  './html/results/result1.html',
  './html/results/result2.html',
  './html/results/result3.html',
  './html/results/result4.html',
  './html/results/result5.html',
  './html/results/result6.html',
  './html/results/result7.html',
  './html/results/result8.html',
  './html/results/result9.html',
];

//swは正常に登録されるとinstallイベントが走る
//正常に登録されたら、キャッシュにurlsToCacheに入れたファイルを次々とキャッシュしていく（All-or-Nothing特性）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

//ページ遷移のときに、リクエストされたファイルがキャッシュの中にあれば該当キャッシュファイルを返す
//なかった場合はネットワークから取得しようとする
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});