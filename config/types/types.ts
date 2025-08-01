type BuildMode = 'development' | 'production';

export interface Env {
  mode: BuildMode;
  port: number;
}
