(function(window, document, undefined){

	var UIE = (function(){

		var settings = {
			events: {
				mouseLeftPage: {
					enabled: true,
					callback: null
				},
				mouseOverExitingLink: {
					enabled: true,
					callback: null
				},
				mouseClickExitingLink: {
					enabled: true,
					preventDefault: false,
					callback: null
				}
			}
		};

		var listenerEvents = {
			click: function(event){
				event = event || window.event;
				var el = event.target || event.srcElement;

				if(settings.events.mouseClickExitingLink.enabled){
					if(el instanceof HTMLAnchorElement){
						if(el.host && el.host != document.location.host){
							try{
								document.dispatchEvent(new CustomEvent("mouseClickExitingLink", {
									detail: {
										opensInNewTab: utilities.anchor.opensInNewTab(el),
										MouseEvent: event
									},
									bubbles: true
								}));
							}catch(ex){} 

							if(settings.events.mouseClickExitingLink.preventDefault)
								event.preventDefault();

							if(settings.events.mouseClickExitingLink.callback && typeof(settings.events.mouseClickExitingLink.callback) == "function")
								settings.events.mouseClickExitingLink.callback(event, utilities.anchor.opensInNewTab(el));

						}
					}
				}

				return false;

			},

			mouseover: function(event){
				event = event || window.event;
				var el = event.target || event.srcElement;

				if(settings.events.mouseOverExitingLink.enabled){
					if(el instanceof HTMLAnchorElement){
						if(el.host && el.host != document.location.host){

							try{
								el.dispatchEvent(new CustomEvent("mouseOverExitingLink", {
									detail: {
										opensInNewTab: utilities.anchor.opensInNewTab(el),
										MouseEvent: event
									},
									bubbles: true
								}));
							}catch(ex){} 

							if(settings.events.mouseOverExitingLink.callback && typeof(settings.events.mouseOverExitingLink.callback) == "function")
								settings.events.mouseOverExitingLink.callback(event, utilities.anchor.opensInNewTab(el));
						}
					}
				}
			},

			mouseout: function(event){
				event = event || window.event;
				var el = event.relatedTarget || event.toElement;

				if(settings.events.mouseLeftPage.enabled){
					if(!el || el.nodeName == "HTML"){
						var exitSide;
						if(exitSide = utilities.mouse.getExitSide(event)){

							try{
								document.dispatchEvent(new CustomEvent("mouseLeftPage", {
									detail: {
										exitSide: exitSide,
										MouseEvent: event
									}
								}));
							}catch(ex){} 

							if(settings.events.mouseLeftPage.callback && typeof(settings.events.mouseLeftPage.callback) == "function")
								settings.events.mouseLeftPage.callback(event, utilities.mouse.getExitSide(event));
						}
					}
				}

			}
		};

		var attachListeners = function(){
			for(var listenerEvent in listenerEvents){
				document.addEventListener && document.addEventListener(listenerEvent, listenerEvents[listenerEvent], false) ||
				document.attachEvent && document.attachEvent("on" + listenerEvent, listenerEvents[listenerEvent], false);
			}
		};

		var applySettings = function(defaults, options) {

			for (var p in options) {
				try {
					if (options[p].constructor === Object)
						defaults[p] = applyOptions(defaults[p], options[p]);
					else
						defaults[p] = options[p];
				} catch (e) {
					defaults[p] = options[p];
				}
			}

			return defaults;

		};

		var utilities = {
			getWindowWidth: function(){
				return Math.max( document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth );
			},
			getWindowHeight: function(){
				return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
			},
			mouse: {
				getExitSide: function(event){
					if(event.clientY <= 0)
						return "top";
					else if(event.clientX <= 0)
						return "left";
					else if(event.clientY >= utilities.getWindowHeight())
						return "bottom";
					else if(event.clientX >= utilities.getWindowWidth())
						return "right";
					else
						return false;
				}
			},
			anchor: {
				opensInNewTab: function(el){
					return (el.getAttribute('target') == "_blank") ? true : false;
				}
			}
		};

		// StackOverflow
		// http://stackoverflow.com/users/633183/naomik
		var documentReady = function(fn, context){
			function onReady(event) {
				document.removeEventListener("DOMContentLoaded", onReady);
				fn.call(context || window, event);
			}

			function onReadyIe(event) {
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange", onReadyIe);
					fn.call(context || window, event);
				}
			}

			document.addEventListener && document.addEventListener("DOMContentLoaded", onReady) ||
			document.attachEvent && document.attachEvent("onreadystatechange", onReadyIe);
		};

		// CustomEvent Polyfill
		// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
		(function () {

			if ( typeof window.CustomEvent === "function" ) return false;

			function CustomEvent ( event, params ) {
				params = params || { bubbles: false, cancelable: false, detail: undefined };
				var evt = document.createEvent( 'CustomEvent' );
				evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
				return evt;
			}

			CustomEvent.prototype = window.Event.prototype;

			window.CustomEvent = CustomEvent;
		})();

		documentReady(attachListeners);

		return {
			settings: function(options){
				var tempSettings = settings;
				settings = (options) ? applySettings(tempSettings, options) : tempSettings;
				return settings;
			}
		}

	});

window.UIE = UIE();

}(window, document));

