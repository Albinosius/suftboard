let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752004, 37.576133],
    zoom: 13,
    controls: []
  });
  
  // Создание геообъекта с типом точка (метка).
  var myPlacemark = new ymaps.Placemark([55.752004, 37.576133], {}, {
    // draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/map/marker.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-29, -73]
  });

  myMap.geoObjects.add(myPlacemark);

  myMap.behaviors.disable('scrollZoom');
}


ymaps.ready(init);
