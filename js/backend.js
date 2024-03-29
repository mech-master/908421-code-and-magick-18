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
    operationType: '',
    exchangeData: function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();

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
      switch (this.operationType) {
        case 'load':
          xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
          xhr.send();
          break;
        case 'save':
          xhr.open('POST', 'https://js.dump.academy/code-and-magick');
          xhr.send(data);
          break;
        default:
          onError('Передана неизвестная команда работы с сервером');
      }
    },
    load: function (onLoad, onError) {
      this.operationType = 'load';
      this.exchangeData(onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      this.operationType = 'save';
      this.exchangeData(onLoad, onError, data);
    }
  };
})();
