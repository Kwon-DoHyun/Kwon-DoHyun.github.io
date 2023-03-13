
let page = 1;
let pagesize = 50;

const query = document.querySelector(".query");
//

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("submit", e => {
    e.preventDefault();
    if (query !== "") {
        page = 1;
        searchRequest(query.value, page);
    }
    query.value = "";
})

function searchRequest(query, page) {
    console.log("query : ", query);
    // url : client가 요청을 보낼 SERVER URL 주소
    // .done : 요청 성공시 받아온 요청 데이터가 done() 메소드로 전달
    $.ajax({
        "url": `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=${pagesize}&target=title`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "KakaoAK f38b9fe2c66283c909a3b11ba777576c"
        }
    }).done(function (response) {


        // 검색창 부분
        $(".container").empty();
        let contents = '';
        for (let i = 0; i < response.documents.length; i++) {
            let object = response.documents[i];
            if (object.thumbnail !== "") {
                contents += '<div class="result-card">';
                contents += '<a href="' + object.url + '">';
                contents += '<div class="img"><img class="book-img" src="' + object.thumbnail + '" alt=""></div>';
                contents += '<h4 class="book-title">' + object.title + '</h4>';
                contents += '</a>';
                contents += '<span class="price">정가 : ' + object.price + '원</span>';
                contents += '<p class="book-info">';
                contents += '<span class="author">' + object.authors + '</span>';
                contents += ' | <span class="publisher">' + object.publisher + '</span></p></div>';
            }
        }
        $(".container").append(contents);


        // 페이징 부분
        
        $(".paging").empty();
        let pageContent = '';
        let count = response.meta.pageable_count; // 검색한 결과 수 
        // 검색한 결과 수에 따른 최대 검색페이지 수
        // Math.ceil = 올림 (1.007) => 2
        let pageCount = Math.ceil(count / pagesize); 

        pageContent += '<img ';
        if (page > 1) {
            pageContent += 'class = "before"';
            pageContent += 'src="resources/left_arrow.png"';
        }
        pageContent += '>';
        pageContent += '<span>' + page + ' / ' + pageCount + '</span>';
        pageContent += '<img ';
        if(response.meta.is_end === false){
            pageContent += 'class = "after"'; 
            pageContent += 'src="resources/right_arrow.png"';
        }
        pageContent += '>';
        $(".paging").append(pageContent);

        // 페이지 이동 이벤트리스너
        if( page > 1){
            const before = document.querySelector(".before");
            before.addEventListener("click", e => {
                page--;
                searchRequest(query, page);
            })
        }
        if( response.meta.is_end === false){
            const after = document.querySelector(".after");
            after.addEventListener("click", e => {
                page++;
                searchRequest(query, page);
            })
        }
        console.log(response);
    });
}



