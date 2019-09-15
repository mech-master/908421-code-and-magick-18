'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_GAP_X = 10;
var SHADOW_GAP_Y = 10;
var FONT_SIZE = 16;

var TITLE_MARGIN_TOP = 25;
var TITLE_MARGIN_LEFT = 20;
var TITLE_VERTICAL_GAP = 4;

var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN_GAP = 50;
var HISTOGRAM_COLUMN_WIDTH = 40;

var HISTOGRAM_MARGIN_LEFT = 40;
var HISTOGRAM_TOP = CLOUD_Y + TITLE_MARGIN_TOP + FONT_SIZE * 2 + TITLE_VERTICAL_GAP * 2;/**/

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaximumValue = function (list) {
  var maxValue = list[0];
  for (var i = 1; i < list.length; i++) {
    if (list[i] > maxValue) {
      maxValue = list[i];
    }
  }
  return maxValue;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP_X, CLOUD_Y + SHADOW_GAP_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');

  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_MARGIN_LEFT, CLOUD_Y + TITLE_MARGIN_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_MARGIN_LEFT, CLOUD_Y + TITLE_MARGIN_TOP + FONT_SIZE + TITLE_VERTICAL_GAP);

  var maxTime = getMaximumValue(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(
        names[j],
        CLOUD_X + HISTOGRAM_MARGIN_LEFT + HISTOGRAM_COLUMN_WIDTH * j + HISTOGRAM_COLUMN_GAP * j,
        HISTOGRAM_TOP + HISTOGRAM_HEIGHT + FONT_SIZE + TITLE_VERTICAL_GAP
    );
    ctx.fillText(
        Math.round(times[j]),
        CLOUD_X + HISTOGRAM_MARGIN_LEFT + HISTOGRAM_COLUMN_WIDTH * j + HISTOGRAM_COLUMN_GAP * j,
        HISTOGRAM_TOP + HISTOGRAM_HEIGHT - times[j] / maxTime * (HISTOGRAM_HEIGHT - FONT_SIZE - TITLE_VERTICAL_GAP) - FONT_SIZE
    );
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%, ' + Math.round(Math.random() * 100) + '%)';
    }
    ctx.fillRect(
        CLOUD_X + HISTOGRAM_MARGIN_LEFT + HISTOGRAM_COLUMN_WIDTH * j + HISTOGRAM_COLUMN_GAP * j,
        HISTOGRAM_TOP + HISTOGRAM_HEIGHT - times[j] / maxTime * (HISTOGRAM_HEIGHT - FONT_SIZE - TITLE_VERTICAL_GAP),
        HISTOGRAM_COLUMN_WIDTH,
        times[j] / maxTime * (HISTOGRAM_HEIGHT - FONT_SIZE - TITLE_VERTICAL_GAP)
    );
  }
};
