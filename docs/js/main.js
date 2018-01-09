// fist do it.
// then do it right.
// then do it better.
// Now I'm at the first stage =)

// Initialize Blazy
(function() {
  let bLazy = new Blazy();
})();
document.getElementById('js-share__wrapper').onclick = function() {
  if (document.getElementById('js-share').className === 'share share--active') {
    document.getElementById('js-share').className = 'share';
  } else {
    document.getElementById('js-share').className += ' share--active';
  }
};

function showCategories() {
  let content = document.getElementById('js-categories__content');
  if (window.screen.width <= 1024) {
    if (content.className === 'categories__content') {
      content.className += ' categories__content--show';
    } else {
      content.className = 'categories__content';
    }
  }
}

function openBurger() {
  let a = document.getElementById('hamburger');
  if (a.className === 'hamburger') {
    a.className += ' hamburger--active';
  }
  else {
    a.className = 'hamburger';
  }
  let x = document.getElementById('navbar');
  if (x.className === 'nav__bar') {
      x.className += ' nav__bar--open';
  }
  else {
      x.className = 'nav__bar';
  }

  let y = document.getElementById('js-header');
  if (y.className === 'nav__logo') {
      y.className += ' nav__logo--hide';
  }
  else {
      y.className = 'nav__logo';
  }

  let z = document.getElementById('js-nav__info');
  if (z.className === 'nav__info') {
      z.className += ' nav__info--show';
  }
  else {
      z.className = 'nav__info';
  }
}

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E A R C H I N G   B Y   I N P U T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
document.getElementById('js-search').oninput = function() {
  if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
    let matcher = new RegExp(document.getElementById('js-search').value, 'i'); //  i = case-insensitive
    for (let i = 0; i < fodmapList.length; i++) {
      if ((matcher.test(fodmapList[i].name)) && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  } else if (document.getElementById('js-high').className === 'banned banned--checked') {
    let matcher2 = new RegExp(document.getElementById('js-search').value, 'i'); //  i = case-insensitive
    for (let a = 0; a < fodmapList.length; a++) {
      if ((matcher2.test(fodmapList[a].name)) && (fodmapList[a].fodmap === 'high')) {
        document.getElementsByClassName('food')[a].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[a].style.display = 'none';
      }
    }
  } else {
    let matcher3 = new RegExp(document.getElementById('js-search').value, 'i'); //  i = case-insensitive
    for (let b = 0; b < fodmapList.length; b++) {
      if (matcher3.test(fodmapList[b].name)) {
        document.getElementsByClassName('food')[b].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[b].style.display = 'none';
      }
    }
  }
  for (let c = 0; c < document.getElementsByClassName('categories__content-item').length; c++) {
    document.getElementsByClassName('categories__content-item')[c].style.color = '#8190a5';
  }
  if (document.getElementById('js-search').value.length >= 1) {
    document.getElementsByClassName('categories__name')[0].innerHTML = 'Categories';
  }
  (function() {
    let bLazy = new Blazy();
  })();
};

function inputWithOnlyLow() {
  let matcher = new RegExp(document.getElementById('js-search').value, 'i'); //  i = case-insensitive
  everything();
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Categories';
  for (let i = 0; i < fodmapList.length; i++) {
    if (matcher.test(fodmapList[i].name)) {
      document.getElementsByClassName('food')[i].style.display = 'block';
    } else {
      document.getElementsByClassName('food')[i].style.display = 'none';
    }
  }
}

function inputWithOnlyHigh() {
  let matcher = new RegExp(document.getElementById('js-search').value, 'i'); //  i = case-insensitive
  for (let i = 0; i < fodmapList.length; i++) {
    if (matcher.test(fodmapList[i].name)) {
      document.getElementsByClassName('food')[i].style.display = 'block';
    } else {
      document.getElementsByClassName('food')[i].style.display = 'none';
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
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Breads, Cereals, Grains and Pasta') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Breads, Cereals, Grains and Pasta') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Breads, Cereals, Grains and Pasta') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[1].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Breads, Cereals, Grains';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100); // LOL IT WORKS
  (function() {
    let bLazy = new Blazy();
  })();
}

function vegetables() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Vegetables and legumes') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Vegetables and legumes') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Vegetables and legumes') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[2].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Vegetables and legumes';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function fruits() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Fruit') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Fruit') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Fruit') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[3].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Fruits';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function drinks() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Drinks') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Drinks') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Drinks') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[4].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Drinks';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function meat() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Meat and Substitutes') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Meat and Substitutes') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Meat and Substitutes') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[5].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Meat and Substitutes';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function condiments() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Condiments') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Condiments') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Condiments') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[6].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Condiments';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function milk() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Milk') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Milk') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Milk') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[7].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Milk';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function sweeteners() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Sweeteners') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Sweeteners') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Sweeteners') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
    for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
      document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
    }
  }
  document.getElementsByClassName('categories__content-item')[8].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Sweeteners';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function dairy() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Dairy') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Dairy') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Dairy') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }

    for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
      document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
    }
  }
  document.getElementsByClassName('categories__content-item')[9].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Dairy';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function cheese() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Cheese') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Cheese') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Cheese') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[10].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Cheese';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function nuts() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if ((fodmapList[i].category === 'Nuts and Seeds') && (fodmapList[i].fodmap === 'low')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if ((fodmapList[i].category === 'Nuts and Seeds') && (fodmapList[i].fodmap === 'high')) {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      if (fodmapList[i].category === 'Nuts and Seeds') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[11].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'Nuts and Seeds';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 100);
  (function() {
    let bLazy = new Blazy();
  })();
}

function everything() {
  document.getElementById('js-search').value = '';
  for (let i = 0; i < fodmapList.length; i++) {
    if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
      if (fodmapList[i].fodmap === 'low') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else if (document.getElementById('js-high').className === 'banned banned--checked') {
      if (fodmapList[i].fodmap === 'high') {
        document.getElementsByClassName('food')[i].style.display = 'block';
      } else {
        document.getElementsByClassName('food')[i].style.display = 'none';
      }
    } else {
      document.getElementsByClassName('food')[i].style.display = 'block';
    }
  }
  for (let a = 0; a < document.getElementsByClassName('categories__content-item').length; a++) {
    document.getElementsByClassName('categories__content-item')[a].style.color = '#8190a5';
  }
  document.getElementsByClassName('categories__content-item')[0].style.color = '#2B2D42';
  document.getElementsByClassName('categories__name')[0].innerHTML = 'All';
  document.getElementsByClassName('categories__content')[0].style.display = 'none';
  setTimeout(function() {
    document.getElementsByClassName('categories__content')[0].style.display = '';
  }, 200);
  (function() {
    let bLazy = new Blazy();
  })();
}


function findLow() {
  for (var i = 0; i < fodmapList.length; i++) {
    if ((fodmapList[i].fodmap === 'low') && (document.getElementsByClassName('food')[i].style.display === 'block')) {
      document.getElementsByClassName('food')[i].style.display = 'block';
    } else {
      document.getElementsByClassName('food')[i].style.display = 'none';
    }
  }
  if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
    document.getElementById('js-allowed').className = 'allowed';
    if (document.getElementById('js-search').value.length >= 1) {
      inputWithOnlyHigh();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Categories') {
      everything();
      document.getElementsByClassName('categories__name')[0].innerHTML = 'Categories';
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Breads, Cereals, Grains') {
      breads();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Vegetables and legumes') {
      vegetables();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Fruits') {
      fruits();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Drinks') {
      drinks();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Meat and Substitutes') {
      meat();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Condiments') {
      condiments();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Milk') {
      milk();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Sweeteners') {
      sweeteners();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Dairy') {
      dairy();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Cheese') {
      cheese();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Nuts and Seeds') {
      nuts();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'All') {
      everything();
    } else if ((document.getElementsByClassName('food').style.display === 'block') && (fodmapList[i].fodmap === 'low')) {
      document.getElementsByClassName('food').style.display = 'block';
    }
  } else {
    document.getElementById('js-allowed').className += ' allowed--checked';
  }
  (function() {
    let bLazy = new Blazy();
  })();
}

function findHigh() {
  for (var i = 0; i < fodmapList.length; i++) {
    if ((fodmapList[i].fodmap === 'high') && (document.getElementsByClassName('food')[i].style.display === 'block')) {
      document.getElementsByClassName('food')[i].style.display = 'block';
    } else {
      document.getElementsByClassName('food')[i].style.display = 'none';
    }
  }
  if (document.getElementById('js-high').className === 'banned banned--checked') {
    document.getElementById('js-high').className = 'banned';
    if (document.getElementById('js-search').value.length >= 1) {
      inputWithOnlyHigh();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Categories') {
      everything();
      document.getElementsByClassName('categories__name')[0].innerHTML = 'Categories';
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Breads, Cereals, Grains') {
      breads();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Vegetables and legumes') {
      vegetables();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Fruits') {
      fruits();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Drinks') {
      drinks();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Meat and Substitutes') {
      meat();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Condiments') {
      condiments();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Milk') {
      milk();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Sweeteners') {
      sweeteners();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Dairy') {
      dairy();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Cheese') {
      cheese();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'Nuts and Seeds') {
      nuts();
    } else if (document.getElementsByClassName('categories__name')[0].innerHTML === 'All') {
      everything();
    } else if ((document.getElementsByClassName('food').style.display === 'block') && (fodmapList[i].fodmap === 'high')) {
      document.getElementsByClassName('food').style.display = 'block';
    }
  } else {
    document.getElementById('js-high').className += ' banned--checked';
  }
  (function() {
    let bLazy = new Blazy();
  })();
}

document.getElementById('js-allowed').onclick = function() {
  if (document.getElementById('js-high').className === 'banned banned--checked') {
    document.getElementById('js-high').click();
    findLow();
  } else {
    findLow();
  }
};

document.getElementById('js-high').onclick = function() {
  if (document.getElementById('js-allowed').className === 'allowed allowed--checked') {
    document.getElementById('js-allowed').click();
    findHigh();
  } else {
    findHigh();
  }
};
