
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class localStorage{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('localStorage', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'localStorage',
      name: 'Local Storage',
      color1: '#2f005a',
      color2: '#9013fe',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'LocalVar',
          blockType: BlockType.REPORTER,
          arguments: {
            LocalVar: {
              type: ArgumentType.STRING
            }
          },
          text: '[LocalVar]'
        },
        {
          opcode: 'Set LocalVar',
          blockType: BlockType.COMMAND,
          arguments: {
            LocalVar: {
              type: ArgumentType.STRING
            },
            Anything: {
              type: ArgumentType.STRING
            }
          },
          text: 'Set [LocalVar] to [Anything]'
        }
      ]
    }
  }

LocalVar (args, util){
  const LocalVar = args.LocalVar;
['r', '%s', 'readLocalStorage', 'highscore']
  return this.write(`M0 \n`);
}

Set LocalVar (args, util){
  const LocalVar = args.LocalVar;
  const Anything = args.Anything;
[' ', 'set %s to %s', 'setLocalStorage', 'highscore', '12']
  return this.write(`M0 \n`);
}

}

module.exports = localStorage;
