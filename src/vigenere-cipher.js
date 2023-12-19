const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {

  constructor(direct = true){
    this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.direct = direct;
  }

  encrypt(message, key) {
    if(!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    message = message.toUpperCase();
    key = key.repeat(Math.ceil(message.length/key.length)).toUpperCase();
    let encrypted ='';
    for(let i = 0, j = 0; i < message.length; i++){
      if(this.alphabet.includes(message[i])){
        const shift =(this.alphabet.indexOf(message[i])+this.alphabet.indexOf(key[j])) % this.alphabet.length;
        encrypted += this.alphabet[shift];
        j++;
      } else {
        encrypted += message[i];
      }

    }
    return this.direct ? encrypted : encrypted.split('').reverse().join('');
  }
  decrypt(decryptmessage, key) {
    if(!decryptmessage || !key){
      throw new Error("Incorrect arguments!");
    }
    decryptmessage = decryptmessage.toUpperCase();
    key = key.repeat(Math.ceil(decryptmessage.length/key.length)).toUpperCase();
    let encrypted ='';
    for(let i = 0, j = 0; i < decryptmessage.length; i++){
      if(this.alphabet.includes(decryptmessage[i])){
        const shift =(this.alphabet.indexOf(decryptmessage[i])-this.alphabet.indexOf(key[j])+this.alphabet.length) % this.alphabet.length;
        encrypted += this.alphabet[shift];
        j++
      } else {
        encrypted += decryptmessage[i];
      }
    }
    return this.direct ? encrypted : encrypted.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
