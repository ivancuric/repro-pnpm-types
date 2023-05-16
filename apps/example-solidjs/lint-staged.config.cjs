module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings=0"],
  "*.{ts,tsx}": [
    () => "tsc --skipLibCheck --emitDeclarationOnly false --noEmit",
  ],
  "*.{js,jsx,ts,tsx,css,md}": ["prettier --write"],
};
