import { THEME } from '#constants/theme';

export function getRandomTheme() {
  const classes = [
    THEME.BLUE,
    THEME.GREEN,
    THEME.BROWN,
    THEME.ORANGE,
  ];

  function getRandomInt(max: number): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  const randomIndex = getRandomInt(classes.length);
  return classes[randomIndex];
}