import TextEditor from './lib/texteditor.js';

const isShow = () => {
  return true;
}

const onClick = () => {
  return 'new texte';
}


var oEditor = new TextEditor( [].slice.call(document.querySelectorAll('.edit')));

oEditor.addTool(
  'color',
  isShow,
  onClick
);

oEditor.launch();
