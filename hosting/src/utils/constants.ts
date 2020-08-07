// eslint-disable-next-line import/prefer-default-export
export const languages = [
  'javascript',
  'c_cpp',
  'java',
  'elixir',
  'golang',
  'typescript',
  'python',
  'haxe',
  'ruby',
  'rust',
  'php',
] as const;

export type Language = typeof languages[number];
