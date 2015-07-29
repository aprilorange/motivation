$ = document.getElementById.bind(document);
$$ = document.querySelector.bind(document);
$$$ = document.querySelectorAll.bind(document);

var picker = new Pikaday({ 
  field: document.getElementById('datepicker'),
  format: 'D MMM YYYY',
  yearRange: [1980, 2005]
});

!(function(W, D, L) {
  
  
  
  var _ = function() {
    
  }
  _.clickDown = function() {
    var el = $('click_down')
    var toggled = el.getAttribute('toggled')
    if(!toggled || toggled == 'false') {
      el.setAttribute('toggled', true)
      D.body.classList.add('toggled')
    } else {
      //el.setAttribute('toggled', false)
      el.removeAttribute('toggled')
      D.body.classList.remove('toggled')
    }
  }
  _.makeDay = function() {
    var birth = $$('.choose_birthday')
    var lifetime = $$('.choose_lifetime')
    var age = birth.value
    var death = lifetime.value
    if(!age) {
      return
    }
    L.setItem('age', age)
    if(death && age) {
      L.setItem('death', death)
      _.makeDeath(death)
    }
    _.updateAge()
    _.removeToggle()
  }
  _.makeAge = function(age) {
    var now = new Date
    var age = age || L.getItem('age') 
    age = new Date(age).getTime()
    var years = (now-age) / 31556900000
    years = years.toFixed(9).toString().split('.')
    var html = $('years-tpl').innerHTML
    html = html.replace(/__YEAR__/g, years[0]).replace(/__EXTRA__/g, years[1])
    $('years').innerHTML = html
    
  }
  _.makeDeath = function(death) {
    death = death || L.getItem('death')
    death = death * 365 * 24 * 3600 // you can live $death s
    var birth = L.getItem('age')
    birth = new Date(birth).getTime()
    death = birth/1000 + death
    var now = (new Date().getTime()) / 1000
    var days = (death-now) / 3600 / 24
    var html = $('death-tpl').innerHTML
    html = html.replace(/__DAYS__/g, parseInt(days))
    $('death').innerHTML = html
  }
  _.updateAge = function() {
    setInterval(function() {
      _.makeAge()
    }, 100)
  }
  _.updateDeath = function() {
    setInterval(function() {
      _.makeDeath()
    }, 60000)
  }
  _.removeToggle = function() {
    D.body.classList.remove('toggled')
    $('click_down').removeAttribute('toggled')
  }
  
  W._ = _
})(window, document, localStorage);

(function(W, D, L) {
  l_age = L.getItem('age')
  l_death = L.getItem('death')
  if(l_age) {
    _.updateAge()
    $$('.choose_birthday').value = l_age
  }
  if(l_death) {
    _.makeDeath()
    _.updateDeath()
    $$('.choose_lifetime').value = l_death
  }
})(window, document, localStorage);
