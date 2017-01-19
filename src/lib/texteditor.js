


class TextEditor{

  /**
   *
   */
  constructor( mDom){

    this._aDom        = this._computeDom( mDom);
    this._bReady      = true;
    this._oLastSelect = {node : null, text : ''};

    this._oTool  = null;
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
    this._oTool  = this._buildTool();
    this._addEvent( this._aDom);
  }

  /******
  ____  ____  _____     ___  _____ _____
 |  _ \|  _ \|_ _\ \   / / \|_   _| ____|
 | |_) | |_) || | \ \ / / _ \ | | |  _|
 |  __/|  _ < | |  \ V / ___ \| | | |___
 |_|   |_| \_\___|  \_/_/   \_\_| |_____|
  *******/
  _getSelection(){
    var oSelection , oSelectionReturn;

  	if( window.getSelection) {
  		oSelectionReturn = window.getSelection();
  	}else if( document.getSelection){
  		oSelectionReturn = document.getSelection();
  	}else{
  		oSelection = document.selection && document.selection.createRange();
  		if( oSelection.text) {
  			oSelectionReturn =  oSelection.text;
  		}
  	}
    return oSelectionReturn;
  }

  _buildTool(){
    var oUl  = document.createElement('ul'),
        oLi  = null,
        iLen = 4;

    oUl.className = 'js-editor_tool';
    for(; iLen-- ;){
      oLi = document.createElement( 'li');
      oLi.className = 'js-editor_item';
      oUl.appendChild( oLi);
    }

    return oUl;
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
  _buildSelect( sText){

    var oDomSelect = document.createElement('span'),
        oDomCursor = document.createElement('span');

    oDomSelect.className   = 'js-editor_select';
    oDomSelect.textContent = sText;
    oDomSelect.appendChild( this._oTool);

    return oDomSelect;

  }

  /**
   *
   */
  _cleanSelectZone( ){

    if( this._oLastSelect.node){

      this._oTool.classList.remove('open');
      this._oLastSelect.node.deleteContents();
      this._oLastSelect.node.insertNode(
        document.createTextNode( this._oLastSelect.text)
      );
    }

  }

  /**
   *
   */
  _computeSelectZone( oSelect){

    var oElementSelect = this._buildSelect( String( oSelect));

    this._oLastSelect.node  = oSelect.getRangeAt( 0);
    this._oLastSelect.text  = String( oSelect);

    this._oLastSelect.node.deleteContents();
  	this._oLastSelect.node.insertNode( oElementSelect);

  }

  /**
   *
   */
  _showTool( e){
     var oSelect = this._getSelection();
     this._cleanSelectZone();
     if( String( oSelect).trim() != '' && this._bReady){
       this._computeSelectZone( oSelect);

       setTimeout(()=>{
         this._oTool.classList.add('open');
       }, 10);

     }
  }

  /**
   *
   */
  _addEvent( aDom){
    var iLen = aDom.length;
    for(;iLen--;) {

      if( aDom[ iLen ]){
        aDom[ iLen ].addEventListener( 'mouseup', this._showTool.bind( this));
      }
    }

  }

}


export default TextEditor;
