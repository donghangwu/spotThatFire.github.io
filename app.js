 
class info
{
    constructor(lats,lngs,tem,hum)
    {
        this.pos={lat:lats,lng:lngs};
        this.temperature=tem;
        this.humidity=hum;
    }
}


class datas
{
    constructor(data)
    {
         this.info=[
        ]
        if(data!='')
            this.addData(data);
    }

     addData(data)
    {
        
        data.forEach(element => {
            console.log(element);
            this.info.push(new info(Number(element.lat),Number(element.lng),element.temp,element.humidity));
            
        });
    }

    getdata()
    {
        return this.info;
    }
}


var map ,infoWindow, inforWindow1;

function initMap() {
    var center = {lat: 34.094331, lng:  -117.836624};
    // The map, centered at LA
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 10, center: center});
    
        var info;
        axios({method:'get',url:"https://david-cors-anywhere.herokuapp.com/https://spotthatfire-api.herokuapp.com/data"})
        .then(res=>{
            info = new datas(res.data);
            var data=info.getdata();
            // add markers on google map
            data.forEach(element => {
                
            addMarker(element)
            });      
            console.log(res.data)
        })
        .catch(err=>(console.log(err)));
        
        infoWindow1 = new google.maps.InfoWindow;
        var directMaker;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

        //click on the marker to direct to the fire spot
        directMaker=new google.maps.Marker({
            position: {
                lat: position.coords.latitude-0.05,
                lng: position.coords.longitude},
            map: map,
            });
            directMaker.addListener('click',()=>{
                map.setCenter(center);
            })

            
          infoWindow1.setPosition(pos);
          var mes='you are not nearby any firing spot, click the red maker on the screen to direct to a firing spor near you';
        
              if((center.lat-pos.lat)<=1.5&&(center.lng-pos.lng<=1.5))
              {
               mes= ('You are near by a firing spot! please be carreful');
              }

          infoWindow1.setContent(mes);
          infoWindow1.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow1, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow1, map.getCenter());
      }
      
      
      function addMarker(element)
      {
          console.log(2,element);
        var marker = new google.maps.Marker({
              position: element.pos,
              map: map,
              label:element.temperature
              });
        var meesage = getMessage(element.temperature,element.humidity);
        infoWindow=new google.maps.InfoWindow(
              {
                  
                  content:`<h3 class=mes>Temperature:${element.temperature}
                  <br> humidity:${element.humidity}%
                  <br>${meesage}<h3>`
              });
          
          marker.addListener('click',function()
          {
            infoWindow.open(map,marker);
          });
      }
      function getMessage(tem,hum)
      {
          if(tem>80 &&hum>40)
            return 'potential firing! Leave the area!';
        else
        return 'not firing';
      }
 
   
    

    
}

       

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


