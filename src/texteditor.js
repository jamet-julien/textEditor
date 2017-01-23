class TextEditor{

  /**
   *
   */
  constructor( mDom){

    this._aDom                  = this._computeDom( mDom);
    this._bReady                = true;
    this._bOnAction             = false;
    this._oLastSelect           = {node : null, text : ''};

    this._aTool                 = [];

    this._aWeakShow             = new WeakMap();

    this._oTool                 = null;
    this._oDomTarget            = null;
    this._oCurrentElementSelect = null;

    this.selection              = '';
    this.target                 = null;

  }
  /**
   *
   */
  replaceByNode( oElement){
    this._replaceSelection( oElement);
  }

  /**
   *
   */
  replaceByText( sText){
    this._replaceSelection( document.createTextNode( sText));
  }

  /**
   *
   */
  close(){
    this._bReady      = true;
    this._bOnAction   = false;
    this._cleanSelectZone();
  }


  /**
   *
   */
  addTool( obj){

    if(obj){

      this._aTool.push( {
          class   : obj.classname || '',
          isShow  : (obj.show  || function(){ return true;}).bind( this),
          onClick : (obj.click || function(){ this.close();}).bind( this),
          content : obj.content || ''
      });

    }

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
  _replaceSelection( oDom){
    if( this._oCurrentElementSelect !== null){
      this.target.replaceChild( oDom, this._oCurrentElementSelect);
      this._oCurrentElementSelect = null;
      this._oLastSelect = { node : null, text : ''};
    }
  }

  /**
   *
   */
  _buildTool(){
    var oUl  = document.createElement('ul'),
        oLi  = null,
        sampleNode  = null,
        iLen = this._aTool.length;

    oUl.className = 'js-editor_tool';

    this._aTool.reverse();

    for(; iLen-- ;){

      oLi           = document.createElement( 'li');
      oLi.className = 'js-editor_item ' + this._aTool[ iLen ].classname;

      if( this._aTool[ iLen ].content != ''){

        sampleNode           = document.createElement('div');
        sampleNode.innerHTML = this._aTool[ iLen ].content;

        while( sampleNode.hasChildNodes()) {
            oLi.appendChild( sampleNode.firstChild);
        }

      }

      oLi.addEventListener( 'mousedown', (( oDom)=>{
        return ()=>{
          this._bOnAction  = true;
          oDom.onClick();
        }
      })(this._aTool[ iLen ]), false);

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

    this._oTool.classList.remove('open');

    if( this._oLastSelect.node !== null){

      this.selection   = '';
      this.target      = null;

      this._oCurrentElementSelect = null;


      this._oLastSelect.node.deleteContents();
      this._oLastSelect.node.insertNode(
        document.createTextNode( this._oLastSelect.text)
      );

      this._oLastSelect = {node : null, text : ''};
    }

  }


  _filterTool(){

    var aChild = [].slice.call( this._oTool.childNodes),
        iLen   = aChild.length,
        fCall  = () => false ;

    for (;iLen--;){
      if( aChild[ iLen]){
          if( !this._aWeakShow.get( aChild[ iLen])()){
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

    this._oCurrentElementSelect = this._buildSelect( String( oSelect));

    this._oLastSelect.node  = oSelect.getRangeAt( 0);
    this._oLastSelect.text  = String( oSelect);

    this._oLastSelect.node.deleteContents();
  	this._oLastSelect.node.insertNode( this._oCurrentElementSelect);

    this._filterTool();

  }

  /**
   *
   */
  _showTool( e){
     var oSelect = this._getSelection();

     if( !this._bReady && !this._bOnAction){
       this.close();
     }

     if( String( oSelect).trim() != '' && this._bReady){

       this.selection = String( oSelect);
       this.target    = e.target;
       this._bReady   = false;

       this._computeSelectZone( oSelect, e.target);

       setTimeout(()=>{
         this._oTool.classList.add('open');
       }, 50);

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
