import $ from 'jquery';
import 'what-input';


// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

// LINE BARS
var dataDiv = jQuery('#data');

jQuery(window).on('scroll', function(){
	var winT = jQuery(window).scrollTop(),
  	winH = jQuery(window).height(),
  	dataT = dataDiv.offset().top;
  if(winT + winH  > dataT){
  	jQuery('.databar').each(function(){
      jQuery(this).find('.databar-bar').animate({
        width:jQuery(this).attr('data-percent')
      },2000);
    });
  }
});


//CIRCLE BARS
var ProgressBar = require('progressbar.js');
//Loop through my divs and create animated circle for each one
function makeCircles() {
    var divsValues = {
      'data-one': 0.35,
      'data-two': 0.44
    };
  
    for (var i in divsValues) {
      if (divsValues.hasOwnProperty(i)) {
        bgCircles(i, divsValues[i]);
      }
    }
  }
  makeCircles();
  
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();
  
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  
  // Checks whether an element is visible and updates it accordingly
  function checkVisibility(elem, bar, countvalue) {
    if (isScrolledIntoView(elem)) {
      bar.animate(countvalue);
    } else {
      bar.animate(0);
    }
  }
  
  //Circle design and animation
  function bgCircles(divid, countvalue) {
    // Select and store the element
    var elem = jQuery('#' + divid);
    
    // Design the circle using progressbar.js
    var bar = new ProgressBar.Circle(elem.get(0), {
      color: '#ddd',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 15,
      trailWidth: 15,
      trailColor: '#253C86',
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#FF5A00',
        width: 15
      },
      to: {
        color: '#FF5A00',
        width: 15
      },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
  
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }
      }
    });
    bar.text.style.fontFamily = '"FSElliot-Heavy", sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.trail.setAttribute('stroke-linecap', 'round');
    bar.path.setAttribute('stroke-linecap', 'round');
  
    // Check element visibility and update it, when needed
    checkVisibility(elem, bar, countvalue);
  
    // Animate the circle when scrolled into view
    $(window).scroll(function () {
      checkVisibility(elem, bar, countvalue);
    });
  }



// $(function() {
//     $('.data-one').circliful();
//     $('.data-two').circliful();
//    });

// (function ($) {

//    $.fn.circliful = function (options, callback) {

//        var settings = $.extend({
//            // These are the defaults.
//            startdegree: 0,
//            fgcolor: "#FF5A00",
//            bgcolor: "#253C86",
//            fill: false,
//            width: 15,
//            dimension: 200,
//            fontsize: 15,
//            percent: 50,
//            animationstep: 1.0,
//            iconsize: '20px',
//            iconcolor: '#253C86',
//            border: 'default',
//            complete: null,
//            bordersize: 10
//        }, options);

//        return this.each(function () {

//            var customSettings = ["fgcolor", "bgcolor", "fill", "width", "dimension", "fontsize", "animationstep", "endPercent", "icon", "iconcolor", "iconsize", "border", "startdegree", "bordersize"];

//            var customSettingsObj = {};
//            var icon = '';
//            var percent;
//            var endPercent = 0;
//            var obj = $(this);
//            var fill = false;
//            var text, info;

//            obj.addClass('circliful');

//            checkDataAttributes(obj);

//            if (obj.data('text') != undefined) {
//                text = obj.data('text');

//                if (obj.data('icon') != undefined) {
//                    icon = $('<i></i>')
//                        .addClass('fa ' + $(this).data('icon'))
//                        .css({
//                            'color': customSettingsObj.iconcolor,
//                            'font-size': customSettingsObj.iconsize
//                        });
//                }

//                if (obj.data('type') != undefined) {
//                    type = $(this).data('type');

//                    if (type == 'half') {
//                        addCircleText(obj, 'circle-text-half', (customSettingsObj.dimension / 1.45));
//                    } else {
//                        addCircleText(obj, 'circle-text', customSettingsObj.dimension);
//                    }
//                } else {
//                    addCircleText(obj, 'circle-text', customSettingsObj.dimension);
//                }
//            }

//            if ($(this).data("total") != undefined && $(this).data("part") != undefined) {
//                var total = $(this).data("total") / 100;

//                percent = (($(this).data("part") / total) / 100).toFixed(3);
//                endPercent = ($(this).data("part") / total).toFixed(3);
//            } else {
//                if ($(this).data("percent") != undefined) {
//                    percent = $(this).data("percent") / 100;
//                    endPercent = $(this).data("percent");
//                } else {
//                    percent = settings.percent / 100;
//                }
//            }

//            if ($(this).data('info') != undefined) {
//                info = $(this).data('info');

//                if ($(this).data('type') != undefined) {
//                    type = $(this).data('type');

//                    if (type == 'half') {
//                        addInfoText(obj, 0.9);
//                    } else {
//                        addInfoText(obj, 1.25);
//                    }
//                } else {
//                    addInfoText(obj, 1.25);
//                }
//            }

//            $(this).width(customSettingsObj.dimension + 'px');

//            var size = customSettingsObj.dimension,
//                canvas = $('<canvas></canvas>').attr({
//                    width: size,
//                    height: size
//                }).appendTo($(this)).get(0);

//            var context = canvas.getContext('2d');

//            var dpr = window.devicePixelRatio;
//            if ( dpr ) {
//                var $canvas = $(canvas);
//                $canvas.css('width', size);
//                $canvas.css('height', size);
//                $canvas.attr('width', size * dpr);
//                $canvas.attr('height', size * dpr);

//                context.scale(dpr, dpr);
//            }

//            var container = $(canvas).parent();
//            var x = size / 2;
//            var y = size / 2;
//            var degrees = customSettingsObj.percent * 360.0;
//            var radians = degrees * (Math.PI / 180);
//            var radius = size / 2.5;
//            var startAngle = 2.3 * Math.PI;
//            var endAngle = 0;
//            var counterClockwise = false;
//            var curPerc = customSettingsObj.animationstep === 0.0 ? endPercent : 0.0;
//            var curStep = Math.max(customSettingsObj.animationstep, 0.0);
//            var circ = Math.PI * 2;
//            var quart = Math.PI / 2;
//            var type = '';
//            var fireCallback = true;
//            var additionalAngelPI = (customSettingsObj.startdegree / 180) * Math.PI;

//            if ($(this).data('type') != undefined) {
//                type = $(this).data('type');

//                if (type == 'half') {
//                    startAngle = 2.0 * Math.PI;
//                    endAngle = 3.13;
//                    circ = Math.PI;
//                    quart = Math.PI / 0.996;
//                }
//            }
           
//            if ($(this).data('type') != undefined) {
//                type = $(this).data('type');

//                if (type == 'angle') {
//                    startAngle = 2.25 * Math.PI;
//                    endAngle = 2.4;
//                    circ = 1.53 + Math.PI;
//                    quart = 0.73 + Math.PI / 0.996;
//                }
//            }

//            /**
//             * adds text to circle
//             *
//             * @param obj
//             * @param cssClass
//             * @param lineHeight
//             */
//            function addCircleText(obj, cssClass, lineHeight) {
//                $("<span></span>")
//                    .appendTo(obj)
//                    .addClass(cssClass)
//                    .html(text)
//                    .prepend(icon)
//                    .css({
//                        'line-height': lineHeight + 'px',
//                        'font-size': customSettingsObj.fontsize + 'px'
//                    });
//            }

//            /**
//             * adds info text to circle
//             *
//             * @param obj
//             * @param factor
//             */
//            function addInfoText(obj, factor) {
//                $('<span></span>')
//                    .appendTo(obj)
//                    .addClass('circle-info-half')
//                    .css(
//                        'line-height', (customSettingsObj.dimension * factor) + 'px'
//                    )
//                    .text(info);
//            }

//            /**
//             * checks which data attributes are defined
//             * @param obj
//             */
//            function checkDataAttributes(obj) {
//                $.each(customSettings, function (index, attribute) {
//                    if (obj.data(attribute) != undefined) {
//                        customSettingsObj[attribute] = obj.data(attribute);
//                    } else {
//                        customSettingsObj[attribute] = $(settings).attr(attribute);
//                    }

//                    if (attribute == 'fill' && obj.data('fill') != undefined) {
//                        fill = true;
//                    }
//                });
//            }

//            /**
//             * animate foreground circle
//             * @param current
//             */
//            function animate(current) {

//                context.clearRect(0, 0, canvas.width, canvas.height);

//                context.beginPath();
//                context.arc(x, y, radius, endAngle, startAngle, false);

//                context.lineWidth = customSettingsObj.width + 1;

//                context.strokeStyle = customSettingsObj.bgcolor;
//                context.stroke();

//                if (fill) {
//                    context.fillStyle = customSettingsObj.fill;
//                    context.fill();
//                }

//                context.beginPath();
//                context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);

//                if (customSettingsObj.border == 'outline') {
//                    context.lineWidth = customSettingsObj.width + 13;
//                } else if (customSettingsObj.border == 'inline') {
//                    context.lineWidth = customSettingsObj.width - 13;
//                }

//                context.strokeStyle = customSettingsObj.fgcolor;
//                context.stroke();

//                if (curPerc < endPercent) {
//                    curPerc += curStep;
//                    requestAnimationFrame(function () {
//                        animate(Math.min(curPerc, endPercent) / 100);
//                    }, obj);
//                }

//                if (curPerc == endPercent && fireCallback && typeof(options) != "undefined") {
//                    if ($.isFunction(options.complete)) {
//                        options.complete();

//                        fireCallback = false;
//                    }
//                }
//            }

//            animate(curPerc / 100);

//        });
//    };
// }($));