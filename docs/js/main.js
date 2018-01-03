//fist do it.
//then do it right.
//then do it better.
// Now I'm at the first stage =)

(function () {
  // Initialize
  var bLazy = new Blazy();
})();
document.getElementById("js-share__wrapper").onclick = function () {
  if (document.getElementById("js-share").className === "share share--active") {
    document.getElementById("js-share").className = "share";
  } else {
    document.getElementById("js-share").className += " share--active";
  }
};


//
// ────────────────────────────────────────────────────────── I ──────────
//   :::::: JS  F O R   P H O T O S : :  :   :    :     :
// ────────────────────────────────────────────────────────────────────
//
var initPhotoSwipeFromDOM = function (gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements 
  // (children of gallerySelector)
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes 
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };



      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }



    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };


  const share = document.querySelector('.share');

  setTimeout(() => {
    share.classList.add("hover");
  }, 1000);

  setTimeout(() => {
    share.classList.remove("hover");
  }, 3000);



  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function (index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      }

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used 
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');



//
// ────────────────────────────────────────────────────────── I ──────────
//   :::::: J S O N   L I S T  O F  P R O D U C T S : :  :   :    :     :
// ────────────────────────────────────────────────────────────────────
// Just roll it up



//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E A R C H I N G   B Y   I N P U T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
document.getElementById("js-search").oninput = function () {
  if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
    var matcher = new RegExp(document.getElementById("js-search").value, "i"); //  i = case-insensitive
    for (var i = 0; i < fodmapList.length; i++) {
      if ((matcher.test(fodmapList[i].name)) && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
    var matcher2 = new RegExp(document.getElementById("js-search").value, "i"); //  i = case-insensitive
    for (var a = 0; a < fodmapList.length; a++) {
      if ((matcher2.test(fodmapList[a].name)) && (fodmapList[a].fodmap === "high")) {
        document.getElementsByClassName("food")[a].style.display = "block";
      } else {
        document.getElementsByClassName("food")[a].style.display = "none";
      }
    }
  } else {
    var matcher3 = new RegExp(document.getElementById("js-search").value, "i"); //  i = case-insensitive
    for (var b = 0; b < fodmapList.length; b++) {
      if (matcher3.test(fodmapList[b].name)) {
        document.getElementsByClassName("food")[b].style.display = "block";
      } else {
        document.getElementsByClassName("food")[b].style.display = "none";
      }
    }
  }
  for (var c = 0; c < document.getElementsByClassName("categories__content-item").length; c++) {
    document.getElementsByClassName("categories__content-item")[c].style.color = "#8190a5";
  }
  if(document.getElementById("js-search").value.length >= 1) {
    document.getElementsByClassName("categories__name")[0].innerHTML = "Categories";
  }
  (function () {
    var bLazy = new Blazy();
  })();
};

function inputWithOnlyLow() {
  var matcher = new RegExp(document.getElementById("js-search").value, "i"); //  i = case-insensitive
  everything();
  document.getElementsByClassName("categories__name")[0].innerHTML = "Categories";
  for (var i = 0; i < fodmapList.length; i++) {
    if (matcher.test(fodmapList[i].name)) {
      document.getElementsByClassName("food")[i].style.display = "block";
    } else {
      document.getElementsByClassName("food")[i].style.display = "none";
    }
  }
}

function inputWithOnlyHigh() {
  var matcher = new RegExp(document.getElementById("js-search").value, "i"); //  i = case-insensitive
  for (var i = 0; i < fodmapList.length; i++) {
    if (matcher.test(fodmapList[i].name)) {
      document.getElementsByClassName("food")[i].style.display = "block";
    } else {
      document.getElementsByClassName("food")[i].style.display = "none";
    }
  }
}

//
// ────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: F I L T E R I N G   B Y   C A T E G O R Y : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
// 1) if category === clicked category show items from this category
// 2) all categories change their colors to "unpicked"
// 3) category wich was clicked ("categories__content-item")[number writed by hand] change color to "picked"
// 4) categories name changed to name of clicked categories 
// 5) categories dropdown hide when clicked by display none and after 100ms display = ""

function breads() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Breads, Cereals, Grains and Pasta") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Breads, Cereals, Grains and Pasta") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Breads, Cereals, Grains and Pasta") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[1].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Breads, Cereals, Grains";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100); //LOL IT WORKS
  (function () {
    var bLazy = new Blazy();
  })();
}

function vegetables() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Vegetables and legumes") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Vegetables and legumes") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Vegetables and legumes") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[2].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Vegetables and legumes";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function fruits() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Fruit") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Fruit") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Fruit") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[3].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Fruits";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function drinks() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Drinks") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Drinks") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Drinks") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[4].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Drinks";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function meat() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Meat and Substitutes") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Meat and Substitutes") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Meat and Substitutes") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[5].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Meat and Substitutes";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function condiments() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Condiments") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Condiments") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Condiments") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[6].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Condiments";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function milk() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Milk") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Milk") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Milk") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[7].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Milk";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function sweeteners() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Sweeteners") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Sweeteners") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Sweeteners") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
    for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
      document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
    }
  }
  document.getElementsByClassName("categories__content-item")[8].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Sweeteners";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function dairy() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Dairy") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Dairy") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Dairy") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }

    for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
      document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
    }
  }
  document.getElementsByClassName("categories__content-item")[9].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Dairy";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function cheese() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Cheese") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Cheese") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Cheese") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[10].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Cheese";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function nuts() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if ((fodmapList[i].category === "Nuts and Seeds") && (fodmapList[i].fodmap === "low")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if ((fodmapList[i].category === "Nuts and Seeds") && (fodmapList[i].fodmap === "high")) {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      if (fodmapList[i].category === "Nuts and Seeds") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[11].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "Nuts and Seeds";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 100);
  (function () {
    var bLazy = new Blazy();
  })();
}

function everything() {
  document.getElementById('js-search').value = "";
  for (var i = 0; i < fodmapList.length; i++) {
    if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
      if (fodmapList[i].fodmap === "low") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
      if (fodmapList[i].fodmap === "high") {
        document.getElementsByClassName("food")[i].style.display = "block";
      } else {
        document.getElementsByClassName("food")[i].style.display = "none";
      }
    } else {
      document.getElementsByClassName("food")[i].style.display = "block";
    }
  }
  for (var a = 0; a < document.getElementsByClassName("categories__content-item").length; a++) {
    document.getElementsByClassName("categories__content-item")[a].style.color = "#8190a5";
  }
  document.getElementsByClassName("categories__content-item")[0].style.color = "#2B2D42";
  document.getElementsByClassName("categories__name")[0].innerHTML = "All";
  document.getElementsByClassName("categories__content")[0].style.display = "none";
  setTimeout(function () {
    document.getElementsByClassName("categories__content")[0].style.display = "";
  }, 200);
  (function () {
    var bLazy = new Blazy();
  })();
}



function findLow() {
  for (var i = 0; i < fodmapList.length; i++) {
    if ((fodmapList[i].fodmap === "low") && (document.getElementsByClassName("food")[i].style.display === "block")) {
      document.getElementsByClassName("food")[i].style.display = "block";
    } else {
      document.getElementsByClassName("food")[i].style.display = "none";
    }
  }
  if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked") {
    document.getElementById("js-allowed").className = "categories__allowed";
    if (document.getElementById("js-search").value.length >= 1) {
      inputWithOnlyHigh();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Categories") {
      everything();
      document.getElementsByClassName("categories__name")[0].innerHTML = "Categories";
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Breads, Cereals, Grains") {
      breads();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Vegetables and legumes") {
      vegetables();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Fruits") {
      fruits();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Drinks") {
      drinks();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Meat and Substitutes") {
      meat();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Condiments") {
      condiments();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Milk") {
      milk();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Sweeteners") {
      sweeteners();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Dairy") {
      dairy();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Cheese") {
      cheese();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Nuts and Seeds") {
      nuts();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "All") {
      everything();
    } else if ((document.getElementsByClassName("food").style.display === "block") && (fodmapList[i].fodmap === "low")) {
      document.getElementsByClassName("food").style.display = "block";
    }
  } else {
    document.getElementById("js-allowed").className += " categories__allowed--checked";
  }
  (function () {
    var bLazy = new Blazy();
  })();
}

function findHigh() {
  for (var i = 0; i < fodmapList.length; i++) {
    if ((fodmapList[i].fodmap === "high") && (document.getElementsByClassName("food")[i].style.display === "block")) {
      document.getElementsByClassName("food")[i].style.display = "block";
    } else {
      document.getElementsByClassName("food")[i].style.display = "none";
    }
  }
  if (document.getElementById("js-high").className === "categories__high categories__high--checked") {
    document.getElementById("js-high").className = "categories__high";
    if (document.getElementById("js-search").value.length >= 1) {
      inputWithOnlyHigh();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Categories") {
      everything();
      document.getElementsByClassName("categories__name")[0].innerHTML = "Categories";
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Breads, Cereals, Grains") {
      breads();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Vegetables and legumes") {
      vegetables();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Fruits") {
      fruits();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Drinks") {
      drinks();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Meat and Substitutes") {
      meat();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Condiments") {
      condiments();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Milk") {
      milk();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Sweeteners") {
      sweeteners();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Dairy") {
      dairy();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Cheese") {
      cheese();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "Nuts and Seeds") {
      nuts();
    } else if (document.getElementsByClassName("categories__name")[0].innerHTML === "All") {
      everything();
    } else if ((document.getElementsByClassName("food").style.display === "block") && (fodmapList[i].fodmap === "high")) {
      document.getElementsByClassName("food").style.display = "block";
    }
  } else {
    document.getElementById("js-high").className += " categories__high--checked";
  }
  (function () {
    var bLazy = new Blazy();
  })();
}

document.getElementById("js-allowed").onclick = function () {
  if (document.getElementById("js-high").className === "categories__high categories__high--checked"){
    document.getElementById("js-high").click();
    findLow();
  }
  else {
    findLow();
}
};

document.getElementById("js-high").onclick = function() {
  if (document.getElementById("js-allowed").className === "categories__allowed categories__allowed--checked"){
    document.getElementById("js-allowed").click();
    findHigh();
  }
  else {
    findHigh();
}};

