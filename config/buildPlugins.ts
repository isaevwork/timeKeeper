import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildPlugins = (isDev: boolean): webpack.WebpackPluginInstance[] => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // Путь к HTML-шаблону
    }),
    // Генерация HTML-файла на основе шаблона
    new webpack.ProgressPlugin({
      // Базовые настройки для детализации прогресса
      activeModules: true, // Показывает активные модули
      entries: true, // Отслеживает точки входа
      modules: true, // Показывает общее количество модулей
      modulesCount: 3000, // Порог для показа количества модулей
      profile: false, // Сбор профилировочных данных
      dependencies: true, // Отслеживает зависимости
      dependenciesCount: 10000,
    }),
  ];

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }

  return plugins;
};
