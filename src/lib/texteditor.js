


class TextEditor{

  /**
   *
   */
  constructor( mDom){

    this._aDom = this._computeDom( mDom);

    this._addEventListener( this._aDom);
  }



  /**
   *
   */
  addTool( sName , fIsShow, fOnClick ){

  }

  /**
   *
   */
  launch(){

  }

  /******
  ____  ____  _____     ___  _____ _____
 |  _ \|  _ \|_ _\ \   / / \|_   _| ____|
 | |_) | |_) || | \ \ / / _ \ | | |  _|
 |  __/|  _ < | |  \ V / ___ \| | | |___
 |_|   |_| \_\___|  \_/_/   \_\_| |_____|
  *******/
  _getSelection(){
    var oSelection , sSelection;

  	if( window.getSelection) {
  		sSelection = window.getSelection();
  	}else if( document.getSelection){
  		sSelection =  document.getSelection();
  	}else{
  		oSelection = document.selection && document.selection.createRange();
  		if( oSelection.text) {
  			sSelection =  oSelection.text;
  		}
  	}
    return String( sSelection);
  }

  /**
   *
   */
  _computeDom( aDom){

    switch( true){
      case aDom instanceof NodeList:
        return  [].slice.call( aDom);
        break;

      case aDom instanceof Array:
        return  aDom;
        break;

      case aDom instanceof Element:
        return  [aDom];
        break;

      default:
        return  null;
        break;
    }
  }

  /**
   *
   */
  _showTool( e){
      console.log( this._getSelection());
  }

  /**
   *
   */
  _addEventListener( aDom){
    var iLen = aDom.length;
    for(;iLen--;) {
      if( aDom[ iLen ]){
        aDom[ iLen ].addEventListener('mouseup', this._showTool.bind( this));
      }
    }

  }

}


export default TextEditor;
