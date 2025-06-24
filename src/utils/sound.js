import sound from "../assets/sound";

export const playBetSound = () => {
  return new Audio(sound.sound_bet).play();
};
