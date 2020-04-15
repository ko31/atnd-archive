#!/bin/bash

cd `dirname $0`

npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index.html -o ../docs/index.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index2.html -o ../docs/index2.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index3.html -o ../docs/index3.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index4.html -o ../docs/index4.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index5.html -o ../docs/index5.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index6.html -o ../docs/index6.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index7.html -o ../docs/index7.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index8.html -o ../docs/index8.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index9.html -o ../docs/index9.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index10.html -o ../docs/index10.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index11.html -o ../docs/index11.html
npx html-minifier --collapse-whitespace --preserve-line-breaks --remove-comments ../docs/index12.html -o ../docs/index12.html

echo "Done"
