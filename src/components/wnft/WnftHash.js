import {keccak256} from "js-sha3"
import {Buffer} from 'buffer/'
import { StemmerEn, StopwordsEn } from '@nlpjs/lang-en-min';

const stemmer = new StemmerEn();
stemmer.stopwords = new StopwordsEn();

export const wnftKeyphraseNormalize = (inputKeyphrase, leaveStopWords = true) => {
    return stemmer.tokenizeAndStem(inputKeyphrase, leaveStopWords).join(' ')
}


const initHash = () =>{
    let node = ''
    for (var i = 0; i < 32; i++) {
      node += '00'
    }
    return node
}

export const  wnftKeyphraseHash = (inputKeyphrase) => {
    // Reject empty names:
    
    let node = initHash();
    const keyphrase = wnftKeyphraseNormalize(inputKeyphrase)
  
    if (keyphrase) {
      var labels = keyphrase.split(' ')
  
      for(var i = labels.length - 1; i >= 0; i--) {
        var labelSha = keccak256(labels[i])
        node = keccak256(new Buffer(node + labelSha, 'hex'))
      }
    }
  
    return '0x' + node
  }