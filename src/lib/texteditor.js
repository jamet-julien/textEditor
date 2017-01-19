


class TextEditor{

  /**
   *
   */
  constructor( mDom){

    this._aDom        = this._computeDom( mDom);
    this._bReady      = true;
    this._oLastSelect = {node : null, text : ''};

    this._aTool       = [];

    this._aWeakShow   = new WeakMap();

    this._oTool  = null;
  }



  /**
   *
   */
  addTool( sName , fIsShow, fOnClick ){
    this._aTool.push( {
        name    : sName,
        isShow  : fIsShow.bind( this),
        onClick : fOnClick.bind( this)
    });
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

  /**
   *
   */
  _buildTool(){
    var oUl  = document.createElement('ul'),
        oLi  = null,
        iLen = this._aTool.length;

    oUl.className = 'js-editor_tool';
    for(; iLen-- ;){
      oLi = document.createElement( 'li');
      oLi.className = 'js-editor_item '+this._aTool[ iLen ];

      oLi.addEventListener( 'mousedown', (e)=>{
        e.preventDefault();
        this._aTool[ iLen ].onClick();
      }, false);

      this._aWeakShow.set( oLi, this._aTool[ iLen ].isShow);

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


  _filterTool( sSelect, oTarget){
    var aChild = [].slice.call( this._oTool.childNodes),
        iLen   = aChild.length,
        fCall  = () => false ;

    for (;iLen--;){
      if( aChild[ iLen]){
          fCall = this._aWeakShow.get( aChild[ iLen]);
          if( !fCall.apply( this, [sSelect, oTarget])){
            aChild[ iLen].style.display= 'none';
          }else{
            aChild[ iLen].style.display= 'inline-block';
          }
      }
    }
  }

  /**
   *
   */
  _computeSelectZone( oSelect, oTarget){

    var oElementSelect = this._buildSelect( String( oSelect));

    this._oLastSelect.node  = oSelect.getRangeAt( 0);
    this._oLastSelect.text  = String( oSelect);

    this._oLastSelect.node.deleteContents();
  	this._oLastSelect.node.insertNode( oElementSelect);

    this._filterTool( this._oLastSelect.text, oTarget);

  }

  /**
   *
   */
  _showTool( e){
     var oSelect = this._getSelection();
     this._cleanSelectZone();
     if( String( oSelect).trim() != '' && this._bReady){

       this._computeSelectZone( oSelect, e.target);

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
