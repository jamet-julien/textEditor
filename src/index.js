import TextEditor from './lib/texteditor.js';

/**
 * [isShow description]
 * @return {Boolean} [description]
 */
function isShow(){
  return true;
}

/**
 * [isShow2 description]
 * @return {Boolean} [description]
 */
function isShow2(){
  return this.selection.length > 4;
}

/**
 * [onClick description]
 * @return {[type]} [description]
 */
function onClick(){
  var oDom         = document.createElement('strong');
  oDom.textContent = this.selection;
  this.replaceByNode( oDom);
  this.close();
}

/**
 * [onClick2 description]
 * @return {[type]} [description]
 */
function onClick2(){
  this.replaceByText( '[b]'+this.selection+'[/b]');
  this.close();
}

/**
 * [onClick2 description]
 * @return {[type]} [description]
 */
function onClickText(){
  setTimeout(()=>{
    this.close();
  }, 2000);
}


var oEditor = new TextEditor( [].slice.call(document.querySelectorAll('.edit')));

oEditor.addTool(
  'color',
  isShow,
  onClick
);


oEditor.addTool(
  'text',
  isShow,
  onClickText
);

oEditor.addTool(
  'color2',
  isShow2,
  onClick2
);

oEditor.launch();
