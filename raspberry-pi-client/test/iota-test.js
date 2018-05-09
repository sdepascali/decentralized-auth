const iota = require('../src/modules/iota');
const uuidv4 = require('uuid/v4');
const { expect } = require('../src/common/test-utils');

const seed = 'AYYUXKIAEOGGXPZIM9GGDLERZEBKVNEOGR9SPSF9ANHWSISVHKEQNTADSZFSMYFKGVVRAYFNTXEPWRLJK';
const addr = 'TYQFOPRBMRMFNX9DITYKIRGKZLFSQBGQSHARNPJJMWVMOGGPEXWZSBSIA9EZOFYLJFKGDLLXYZSLLMFIX';

describe('Iota', () => {
  const genMessage = () => ({ message: uuidv4() });
  const message = genMessage();

  const genLongMessage = () => ({ message: Array(2000).join('A') });
  const longMessage = genLongMessage(); // does not fit in one transaction

  let receiveAddress;

  before(() =>
    // in the test we send from first address of seed and receive on second
    // address of seed
    iota.getAddress(seed, 2)
      .then(([, secondAddress]) => {
        receiveAddress = secondAddress;
      }));

  describe('getAddress', () =>
    it('should return a new address', () => {
      const total = 1;
      iota.getAddress(seed, total)
        .then(([address]) =>

          expect(address).to.equal(addr));
    }));

  describe('send', () => {
    it('should send a transfer', () =>
      iota.send(seed, receiveAddress, message)
        .then(transactions =>

          expect(transactions).to.be.an('array')));

    it('should be able to retrieve the message', () =>
      iota.getLastMessage({ addresses: [receiveAddress] })
        .then(messageFromIota =>

          expect(messageFromIota).to.have.property('message').and.to.equal(message.message)));

    it('should be able to send a message that spans multiple transactions', () =>
      iota.send(seed, receiveAddress, longMessage)
        .then(transactions =>

          expect(transactions).to.be.an('array')));

    it('should be able to retrieve a long message that spans multiple transactions', () =>
      iota.getLastMessage({ addresses: [receiveAddress] })
        .then(messageFromIota =>

          expect(messageFromIota).to.have.property('message').and.to.equal(longMessage.message)));
  });
});
