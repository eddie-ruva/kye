(function(root, doc) {
  var navigationHeight;

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

  function toggleClass(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
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

    if(navigationHeight < documentTop) {
      addClass(doc.body, 'has-docked-nav');
    } else {
      removeClass(doc.body, 'has-docked-nav');
    }
  }

  onDocumentReady(function() {
    var ticking = false;
    var menuButton = doc.getElementById('navbar-trigger');
    var navbarMenu = doc.getElementById('navbar-menu');

    navigationHeight = doc.getElementById('navbar').offsetHeight;

    root.addEventListener('scroll', function(e) {
      if (!ticking) {
        root.requestAnimationFrame(function() {
          onScroll();
          ticking = false;
        });
      }
      ticking = true;
    });

    menuButton.addEventListener('click', function() {
      toggleClass(navbarMenu, 'is-open');
    });

    if (root.smoothScroll) {
      smoothScroll.init({
        selector: '.nav-link',
        selectorHeader: '#navbar',
        speed: 500,
        easing: 'easeInOutCubic',
        offset: 40
      });
    }

  });

})(window, document);
