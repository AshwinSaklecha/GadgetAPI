const gadgetPrefixes = ['The', 'Project', 'Operation', 'Agent'];
const gadgetNouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Dragon', 'Cobra', 'Eagle', 'Ghost'];

const generateCodename = () => {
    const prefix = gadgetPrefixes[Math.floor(Math.random() * gadgetPrefixes.length)];
    const noun = gadgetNouns[Math.floor(Math.random() * gadgetNouns.length)];
    return `${prefix} ${noun}`;
  };

const generateSuccessProbability = () => {
    return Math.floor(Math.random() * (99-50) + (50));
};

const generateConfirmationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

module.exports = {
    generateCodename,
    generateSuccessProbability,
    generateConfirmationCode
};