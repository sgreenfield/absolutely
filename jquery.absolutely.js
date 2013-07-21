/*
*  ABSOLUTELY! - v0.0.1
*  jQeury plugin to convert fixed to absolute and and visa-versa, without losing position
*
*  Made by Scott Greenfield
*  Under MIT License
*/
;(function ( $, window, document, undefined ) {
  var name     = "absolutely",
      defaults = { };

  function Absolutely ( el, opt ) {
    this.el        = el;
    this.opt       = $.extend({}, defaults, opt);
    this._defaults = defaults;
    this._name     = name;
    this.init();
  }

  Absolutely.prototype = {
    init: function () {
      //don't need anything here yet
    },

    xY: function(position){
      var $el         = $(this.el),
          marginTop   = parseInt( $el.css('margin-top') ),
          marginLeft  = parseInt( $el.css('margin-left') ),
          xDifference = position === 'absolute' ? $(this.opt.relativeTo).offset().left : $(window).scrollLeft(),
          yDifference = position === 'absolute' ? $(this.opt.relativeTo).offset().top  : $(window).scrollTop();

      return { x: $el.offset().left - xDifference - marginLeft, y: $el.offset().top - yDifference - marginTop };
    },

    absolute: function(){
      var xY = this.xY('absolute');
      $(this.el).css({ left: xY.x, top: xY.y, 'position': 'absolute' });
    },

    fixed: function(){
      var xY = this.xY('fixed');
      $(this.el).css({ left: xY.x, top: xY.y, 'position': 'fixed' });
    }
  };

  //init or method call logic
  $.fn[ name ] = function ( opt ) {
    var args = arguments;

    return this.each(function () {
      var _plugin  = "plugin_" + name,
          instance = $.data(this, _plugin),
          method   = instance ? instance[opt] : '';

      if ( !instance ) {
        $.data(this, _plugin, (instance = new Absolutely(this, opt)));
      } else if (instance instanceof Absolutely && typeof method === 'function') {
        method.apply(instance, Array.prototype.slice.call(args, 1));
      } else if (!method || opt.charAt(0) === '_') { //throw error if the method does not exist or is private
        $.error('Method ' + opt + ' does not exist on jQuery.' + name);
      }
    });
  };

})( jQuery, window, document );
