# common.blocks

Здесь хранятся файлы БЭМ блоков, в соответствии со структурой:

```
common.blocks
|-block
|  |-block.sass
|  |-block.js
|  |-block__image.jpg
|-other-block
...
```

Все `sass` файлы объединяются и компилируются c автопрефиксами в файл `dist/css/common.css`.
`js` файлы - в файл `dist/js/common.js` c `babel` обработкой (нужно использовать ES6).
.jpg, .png, .svg - копируются в папку `dist/img`
