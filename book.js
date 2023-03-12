

 
//  ajax
// 비동기 방ㅇ식으로 페이지의 일부 정보를 갱신하는 기술
//jQuery.ajax() 메소드
 
 
 

const query =document.querySelector(".query");
const searchbox = document.querySelector(".searchbox");

searchbox.addEventListener("submit" , e => {
    e.preventDefault();

    if(query !==""){
        searchRequest(query);
    }


});


 
 function searchRequest(query){

 
    $.ajax(

        {
           "url": "https://dapi.kakao.com/v3/search/book?query=변신&page=1&target=title&size=10",
           "method": "GET",
           "timeout": 0,
           "headers": {
             "Authorization": "KakaoAK e7c4bf92e505b53b5d9d555e1d3e5e42"
           },
         }
         
    )
         
         
         .done( (response) => {
           
       console.log(response);
     
   
   });
 }








