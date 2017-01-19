import TextEditor from './lib/texteditor.js';

const isShow = ( text, target) => {
  return true;
}

const isShow2 = ( text, target) => {
  return text.length > 4;
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

oEditor.addTool(
  'color2',
  isShow2,
  onClick
);

oEditor.launch();
