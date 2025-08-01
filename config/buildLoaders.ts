import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildLoaders = (isDev: boolean): webpack.RuleSetRule[] => {
  const typescriptLoader = {
    // Регулярное выражение для выбора файлов .ts и .tsx
    test: /\.(ts|tsx)$/,
    // Использовать ts-loader для компиляции TypeScript
    use: 'ts-loader',
    // Исключить папку node_modules
    exclude: /node_modules/,
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]', // имя файла сохраняется
          outputPath: 'images/', // папка в dist для картинок
          esModule: false, // важно для корректного импорта в JS/TS
        },
      },
    ],
  };

  const scssModuleLoader = {
    test: /\.module\.s[ac]ss$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
          esModule: true,
        },
      },
      'sass-loader',
    ],
  };

  const scssGlobalLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  };

  return [
    // Обработка TypeScript файлов
    svgLoader,
    fileLoader,
    typescriptLoader,
    scssModuleLoader,
    scssGlobalLoader,
    // Обработка source maps из node_modules
    {
      enforce: 'pre', // Применять это правило до других
      test: /\.js$/, // Для .js файлов
      loader: 'source-map-loader', // Загрузчик source maps
    },
  ];
};
