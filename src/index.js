import TextEditor from './lib/texteditor.js';

function isShow(){
  return true;
}

function isShow2(){
  return this.selection.length > 4;
}

function onClick(){
  var oDom         = document.createElement('strong');
  oDom.textContent = String( this.selection);
  this.replaceByNode( oDom);
  console.log( 'click');
}

function onClick2(){
  this.replaceByText( 'coucou');
  console.log( 'click');
}


var oEditor = new TextEditor( [].slice.call(document.querySelectorAll('.edit')));

oEditor.addTool(
  'color',
  isShow,
  onClick
);

oEditor.addTool(
  'color2',
  isShow2,
  onClick2
);

oEditor.launch();
