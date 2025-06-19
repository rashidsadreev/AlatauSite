const districtMap = {
  'green': {
    pathId: 'green-map',
    accordionId: 'green-accordion',
    color: '#2E6955',
    pointId: 'green'
  },
  'growing': {
    pathId: 'growing-map',
    accordionId: 'growing-accordion',
    color: '#F36F36',
    pointId: 'growing'
  },
  'golden': {
    pathId: 'golden-map',
    accordionId: 'golden-accordion',
    color: '#F6D333',
    pointId: 'golden'
  },
  'gate': {
    pathId: 'gate-map',
    accordionId: 'gate-accordion',
    color: '#2F62AD',
    pointId: 'gate'
  }
};

const allPaths = document.querySelectorAll('.map path');
const allPoints = document.querySelectorAll('.map__point');
const accordionInstance = new ItcAccordion('#accordion-1', {
  alwaysOpen: false
});

let currentActiveKey = null;

// Установить transition на все path
allPaths.forEach(path => {
  path.style.transition = 'fill 0.3s ease';
});

// Серый фон для неактивных path
function greyOutPaths(exceptId) {
  allPaths.forEach(path => {
    if (path.id !== exceptId) {
      path.style.fill = '#cccccc';
    }
  });
}

// Сброс цветов path (SVG по умолчанию)
function clearAllPathColors() {
  allPaths.forEach(path => {
    path.style.fill = '';
  });
}

// Обновить прозрачность map__point
function updatePointsVisibility(activePointId = null) {
  allPoints.forEach(point => {
    point.style.transition = 'opacity 0.3s ease';
    point.style.opacity = (point.id === activePointId || !activePointId) ? '1' : '0';
  });
}

// Основная логика переключения
function toggleDistrict(key) {
  const { pathId, accordionId, color, pointId } = districtMap[key];
  const path = document.getElementById(pathId);
  const accordionItem = document.getElementById(accordionId);
  const point = document.getElementById(pointId);

  if (!path || !accordionItem) return;

  const isAlreadyActive = currentActiveKey === key;

  if (isAlreadyActive) {
    // Снять выделение
    clearAllPathColors();
    updatePointsVisibility(null);
    accordionInstance.hide(accordionItem);
    currentActiveKey = null;
  } else {
    // Закрыть предыдущий, если есть
    if (currentActiveKey) {
      const prev = districtMap[currentActiveKey];
      const prevAccordion = document.getElementById(prev.accordionId);
      if (prevAccordion) accordionInstance.hide(prevAccordion);
    }

    greyOutPaths(pathId);
    path.style.fill = color;
    updatePointsVisibility(pointId);
    accordionInstance.show(accordionItem);
    accordionItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    currentActiveKey = key;
  }
}

// Навесить события на path
Object.entries(districtMap).forEach(([key, { pathId }]) => {
  const path = document.getElementById(pathId);
  if (path) {
    path.addEventListener('click', () => toggleDistrict(key));
  }
});

// Навесить события на заголовки аккордеонов
Object.entries(districtMap).forEach(([key, { accordionId }]) => {
  const accordionItem = document.getElementById(accordionId);
  if (accordionItem) {
    const header = accordionItem.querySelector('.itc-accordion-header');
    if (header) {
      header.addEventListener('click', () => toggleDistrict(key));
    }
  }
});

// Навесить события на map__point
Object.entries(districtMap).forEach(([key, { pointId }]) => {
  const point = document.getElementById(pointId);
  if (point) {
    point.addEventListener('click', () => toggleDistrict(key));
  }
});

// При загрузке: сбросить прозрачность у всех точек
updatePointsVisibility(null);
