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
      bar.stop();
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