
class AudioService {
  private static synthesisVoice: SpeechSynthesisVoice | null = null;
  private static isInitialized = false;

  static initialize() {
    if (!this.isInitialized && 'speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        this.synthesisVoice = voices.find(voice => voice.lang === 'en-US') || voices[0];
      };
      this.isInitialized = true;
    }
  }

  static speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.synthesisVoice) {
        utterance.voice = this.synthesisVoice;
      }
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }
}

export default AudioService;

