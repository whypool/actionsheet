/**
 * 移动端操作表
 * 2016年12月20日
 */
(function(window,undefined){
	var actionSheet = function(){};
	actionSheet.prototype = {
		show:function(params){
			var self = this;
			var buttons = params.buttons;
			var cancelText = params.cancelText;
			var body = document.body;
			var btnHTML = '';
			for(var i = 0; i < buttons.length; i++){
				btnHTML += '<button class="button" id="'+i+'">'+buttons[i].text+'</button>';
			}
			var htmlStr = '<div class="action-sheet-backdrop">'+
						'<div class="action-sheet-close"></div>'+
						'<div class="action-sheet-wrapper">'+
							'<div class="action-sheet">'+
								'<div class="action-sheet-group action-sheet-options">'+
								btnHTML+
								'</div>'+
								'<div class="action-sheet-group action-sheet-cancel">'+
									'<button class="button">'+cancelText+'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
			body.innerHTML += htmlStr;
			var TIMEOUT = setTimeout(function(){
				addClass(document.querySelector('.action-sheet-wrapper'),'action-sheet-up');
				addClass(document.querySelector('.action-sheet-backdrop'),'active');
				window.clearTimeout(TIMEOUT);
			},20);
			var btnClick = document.querySelectorAll('.action-sheet-options button');
			var cancelBtn = document.querySelector('.action-sheet-cancel button');
			var closeBg = document.querySelector('.action-sheet-close');
			closeBg.addEventListener('click',function(){
				self.closeAction();
			});
			cancelBtn.addEventListener('click',function(){
				params.cancel();
				self.closeAction();
			});
			for(var j = 0; j < btnClick.length; j++){
				btnClick[j].addEventListener('click',function(){
					params.buttonClick(this.id);
					self.closeAction();
				});
			}
		},
		closeAction:function(){
			var actionDom = document.querySelector('.action-sheet-backdrop');
			removeClass(document.querySelector('.action-sheet-wrapper'),'action-sheet-up');
			removeClass(actionDom,'active');
			var TIMEOUT = setTimeout(function(){
				if(actionDom.parentNode){
					actionDom.parentNode.removeChild(actionDom);
				}
				window.clearTimeout(TIMEOUT);
			},300);
		}
	};
	function hasClass( elements,cName ){
		return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );
	}
	function addClass( elements,cName ){
		if( !hasClass( elements,cName ) ){
			elements.className += " " + cName;
		}
	}
	function removeClass( elements,cName ) {
		if (hasClass(elements, cName)) {
			elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
		}
	}
	window.actionSheet = new actionSheet();
})(this);