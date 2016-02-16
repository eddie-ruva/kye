(function(root, doc) {
  var navigationOffsetTop;

  function hasClass(el, className) {
    // From: http://youmightnotneedjquery.com/
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  function addClass(el, className) {
    // From: http://youmightnotneedjquery.com/
    if (el.classList) {
      return el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' +
                                                     className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function onDocumentReady(fn) {
    if (doc.readyState != 'loading'){
      fn();
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  }

  function onScroll() {
    var documentTop = doc.body.scrollTop;

    if(navigationOffsetTop < documentTop && !hasClass(doc.body, 'has-docked-nav')) {
      addClass(doc.body, 'has-docked-nav');
    }

    if(navigationOffsetTop > documentTop && hasClass(doc.body, 'has-docked-nav')) {
      removeClass(doc.body, 'has-docked-nav');
    }
  }

  onDocumentReady(function() {
    var ticking = false;

    navigationOffsetTop = doc.getElementById('navbar').getBoundingClientRect().top +
      doc.body.scrollTop;

    root.addEventListener('scroll', function(e) {
      if (!ticking) {
        root.requestAnimationFrame(function() {
          onScroll();
          ticking = false;
        });
      }
      ticking = true;
    });
  });

})(window, document);
