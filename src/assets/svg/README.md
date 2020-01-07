# svg

> Директория для инлайновых svg спрайтов. Подключаются скриптом в начале body.
> Svg файлы проходят обработку [svgo](https://github.com/svg/svgo) плагином

Использование:
1. Поместить файл `some-svg.svg` в директорию `svg`;
2. Подключить в `html` через `use/xlink`:
``` html
<svg class="some-svg-class">
  <use xlink:href="#some-svg"></use>
</svg>
```
