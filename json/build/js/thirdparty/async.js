function loadDoc(){

    var http = new XMLHttpRequest();
    var txt = "";
    http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
        txt += "<ul id='forul'>"
        for (var i=0;i<data.length ;i++) {
        txt += "<li class='hidden'>" + "<label>" + " NAME : " + "</label>" + "<label>" + " AGE : " + "</label>" + "<label>" + " CITY : " + "</label>" + "<br>" 
            + "<span>" + data[i].name + "</span>" + "<span>" + data[i].age + "</span>" + "<span>" + data[i].city + "</span>" + "</li>" + "<br>";   
        } 
        
        document.getElementById("demo").innerHTML = txt;
        $("#demo #forul .hidden").slice(0,5).removeClass("hidden");

    }
}

http.open("GET","js/thirdparty/demo.json",true);
http.send();

}

$(function(){

    $("#loadmore").click(function(e){
        e.preventDefault();
        $("#demo #forul .hidden").removeClass("hidden");
        $("#loadmore").css("display","none");



    });

});