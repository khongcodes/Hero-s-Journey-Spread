const loadMenuOpens = function() {
  const loadMenuContainer = document.createElement('div');
  loadMenuContainer.className = 'load-menu menu-container';

  const activeContainer = document.createElement('div');
  activeContainer.className = 'load-menu active-container';

  const inactiveContainer = document.createElement('div');
  inactiveContainer.className = 'load-menu inactive-container';
  
  const inactiveLabel = document.createElement('span');
  inactiveLabel.className = 'load-menu inactive-label';
  inactiveLabel.innerText = `Load ${(activeLoadMenuType === 'character' ? 'Journey' : 'Character')}`
  inactiveLabel.addEventListener('click', switchActiveMenu);
  
  inactiveContainer.appendChild(inactiveLabel);
  loadMenuContainer.append(activeContainer, inactiveContainer);
  document.getElementById('view-wrapper').prepend(loadMenuContainer);
  document.querySelector('div.load-menu.tab.inactive').className = 'load-menu tab active';
}

const loadMenuCloses = function() {
  document.getElementById('view-wrapper').removeChild(document.querySelector('.load-menu.menu-container'));
  document.querySelector('div.load-menu.tab.active').className = 'load-menu tab inactive';
}

const switchActiveMenu = function() {
  document.querySelector('.load-menu.inactive-label').innerText = `Load ${activeLoadMenuType[0].toUpperCase() + activeLoadMenuType.slice(1)}`;
  activeLoadMenuType = (activeLoadMenuType === 'character' ? 'journey' : 'character');
}