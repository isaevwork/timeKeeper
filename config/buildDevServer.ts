import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import path from 'path';

export const buildDevServer = (port: number): DevServerConfig => ({
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  hot: true,
  port: port,
  open: true,
  historyApiFallback: true,
});
