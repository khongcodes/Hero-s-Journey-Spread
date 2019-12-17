const loadMenuOpens = function() {
  const loadMenuContainer = document.createElement('div');
  loadMenuContainer.className = 'load-menu menu-container';

  const loadCharacterContainer = document.createElement('div');
  loadCharacterContainer.className = 'load-menu character-container';

  const loadJourneyContainer = document.createElement('div');
  loadJourneyContainer.className = 'load-menu journey-container';

  document.getElementById('view-wrapper').prepend(loadMenuContainer);
  document.querySelector('div.load-menu.tab.inactive').className = 'load-menu tab active';
}

const loadMenuCloses = function() {
  document.getElementById('view-wrapper').removeChild(document.querySelector('.load-menu.menu-container'));
  document.querySelector('div.load-menu.tab.active').className = 'load-menu tab inactive';
}