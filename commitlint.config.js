const path = require('path');
const fs = require('fs');

const extractDirectoryNames = (path, { ignoreHiddenFiles = true } = {}) => {
  return fs
    .readdirSync(path, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory)
    .filter((dirent) => !ignoreHiddenFiles || !dirent.name.startsWith('.'))
    .map((dirent) => dirent.name);
};

// Note: apps ディレクトリと packages ディレクトリの配下のディレクトリ名を取得
// Note: この処理により、スコープを指定する際に @condog-xxx/ の部分を省略できる
const targetDirectories = [
  path.resolve(__dirname, 'apps'),
  path.resolve(__dirname, 'packages'),
]
  .map((dir) => extractDirectoryNames(dir))
  .flat();

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    'scope-empty-exceptions', // scope が空の場合にエラーを出す
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['all', ...targetDirectories]], // scope が all の場合も許可する
  },
};
