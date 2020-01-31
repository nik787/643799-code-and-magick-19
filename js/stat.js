'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT = '16px PT Mono';
var FONT_COLOR = '#000';
var FONT_GAP = 24;
var BAR_X = 150;
var BAR_Y = 250;
var BAR_GAP = 90;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = -150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, font, color, text) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderColumn = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP, FONT, FONT_COLOR, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + FONT_GAP * 2, FONT, FONT_COLOR, 'Список результатов: ');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);
    var barHeight = (MAX_BAR_HEIGHT * time) / maxTime;
    if (names[i] === 'Вы') {
      var colorBar = 'rgba(255, 0, 0, 1)';
    } else {
      var saturationColor = (100 * barHeight) / MAX_BAR_HEIGHT;
      colorBar = 'hsl(240, ' + saturationColor + '%, 50%)';
    }

    renderText(ctx, BAR_X, BAR_Y + barHeight - GAP, FONT, FONT_COLOR, time);
    renderColumn(ctx, BAR_X, BAR_Y, barHeight, colorBar);
    renderText(ctx, BAR_X, BAR_Y + FONT_GAP, FONT, FONT_COLOR, names[i]);
    BAR_X += BAR_GAP;
  }

};
