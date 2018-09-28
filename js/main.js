function initMap() {
	
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -37.866058, lng: 145.053326},
    zoom: 20,
    
  zoomControl: false,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  
  styles: styles
    
  });

	var styles = [
		
		{
			stylers: [
				
				{hue: '#00ffe6'},
				{saturation: -20}
				
			]
			
		}
		
	];
	
	var marker = new google.maps.Marker ({
		
		position: {lat: -37.866058, lng: 145.053326},
		map: map
		
	});
	



}
