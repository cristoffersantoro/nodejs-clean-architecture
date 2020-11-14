# nodejs-clean-architecture
my own cleancode nodejs boilerplate 

configure husky

npm install husky@next --save-dev
npx husky install
npx husky add pre-commit "npx eslint 'src/**/*.ts' && npm test"
