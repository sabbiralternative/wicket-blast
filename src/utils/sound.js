import sound from "../assets/sound";

export const playBetSound = () => {
  return new Audio(sound.bet).play();
};

export const playCashOutBigSound = () => {
  return new Audio(sound.cashOutBig).play();
};

export const playCashOutSound = () => {
  return new Audio(sound.cashOut).play();
};

export const playWhoopSound = () => {
  return new Audio(sound.whoop).play();
};

export const playWicketSound = () => {
  return new Audio(sound.wicket).play();
};

export const playWinSound = () => {
  const winArray = [sound.win1, sound.win2, sound.win3, sound.win4, sound.win5];
  const randomSound = winArray[Math.floor(Math.random() * winArray.length)];
  return new Audio(randomSound).play();
};
