'use strict';

(function () {

  /*
  window.backend = {
    exchangeData: function (type, onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения!');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
      });

      xhr.timeout = 10000;
      switch (type) {
        case 'load':
          xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
          xhr.send();
          break;
        case 'save':
          xhr.open('POST', 'https://js.dump.academy/code-and-magick');
          xhr.send(data);
        default:
          onError('Передана неизвестная команда');
      }
    },
    load: backend.exchangeData,
    save: backend.exchangeData
  };

  /* */

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/code-and-magick/data';

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения!');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/code-and-magick';

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения!');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
      });

      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
