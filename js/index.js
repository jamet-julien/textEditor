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
  setTimeout(function(){
    oEditor.close();
  }, 2000);
}


var oEditor = new TextEditor( [].slice.call(document.querySelectorAll('.edit')));

oEditor.addTool();

oEditor.addTool({
  classname : 'bold',
  click : onClick
});

oEditor.addTool({
  classname : 'text',
  click : onClickText
});

oEditor.addTool({
  classname : 'color2',
  show  : isShow2,
  click : onClick2,
  content : 'B'
});

oEditor.launch();
