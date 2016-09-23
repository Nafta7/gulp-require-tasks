import prism from 'prismjs'

const App = function(){
  const menu = document.getElementById('toggle-menu')
  const nav = document.getElementById('navbar')
  const menuIcon = document.getElementById('menu-icon')
  const closeCode = '&#x2715;'
  const hamCode = '&#9776;'

  function init(){
    menu.addEventListener('click', toggleNavbar)
  }

  function toggleNavbar(e){
    if (e.target.checked){
      nav.className = nav.className.trim() + ' active'
      menuIcon.innerHTML = closeCode
    } else {
      nav.className = nav.className.replace('active', '').trim()
      menuIcon.innerHTML = hamCode
    }
  }

  return {
    init
  }
}()

App.init()
