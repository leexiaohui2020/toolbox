var maxMessageSize = 1000;
var getBit = function (number, location) {
  return ((number >> location) & 1)
};
var setBit = function (number, location, bit) {
  return (number & ~(1 << location)) | (bit << location)
};
var getBitsFromNumber = function (number) {
  var bits = [];
  for (var i = 0; i < 16; i++) {
    bits.push(getBit(number, i))
  }
  return bits
};
var getNumberFromBits = function (bytes, history, hash) {
  var number = 0,
    pos = 0;
  while (pos < 16) {
    var loc = getNextLocation(history, hash, bytes.length);
    var bit = getBit(bytes[loc], 0);
    number = setBit(number, pos, bit);
    pos++
  }
  return number
};
var getMessageBits = function (message) {
  var messageBits = [];
  for (var i = 0; i < message.length; i++) {
    var code = message.charCodeAt(i);
    messageBits = messageBits.concat(getBitsFromNumber(code))
  }
  return messageBits
};
var getNextLocation = function (history, hash, total) {
  var pos = history.length;
  var loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
  // console.info(`Math.abs(hash[${pos} % ${hash.length}] * (${pos} + 1)) % ${total} = ${loc}`)
  while (true) {
    if (loc >= total) {
      loc = 0
    } else {
      if (history.indexOf(loc) >= 0) {
        loc++
      } else {
        if ((loc + 1) % 4 === 0) {
          loc++
        } else {
          history.push(loc);
          return loc
        }
      }
    }
  }
};

export function encodeMessage(colors, hash, message) {
  var messageBits = getBitsFromNumber(message.length);
  messageBits = messageBits.concat(getMessageBits(message));
  var history = [];
  var pos = 0;
  while (pos < messageBits.length) {
    var loc = getNextLocation(history, hash, colors.length);
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
    while ((loc + 1) % 4 !== 0) {
      loc++
    }
    colors[loc] = 255;
    pos++
  }
  return colors;
}

export function decodeMessage(colors, hash) {
  var history = [];
  var messageSize = getNumberFromBits(colors, history, hash);
  if ((messageSize + 1) * 16 > colors.length * 0.75) {
    return ""
  }
  if (messageSize === 0 || messageSize > maxMessageSize) {
    return ""
  }
  var message = [];
  for (var i = 0; i < messageSize; i++) {
    var code = getNumberFromBits(colors, history, hash);
    message.push(String.fromCharCode(code))
  }
  return message.join("")
};
