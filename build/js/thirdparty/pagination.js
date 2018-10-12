function loadDoc(){

    var http = new XMLHttpRequest();
    var txt = "";
    http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
        txt += "<ul id='forul'>"
        for (var i=0;i<data.length ;i++) {
        txt += "<li class='content'>" 
        + "<label>" + " NAME : " + "<span>" + data[i].name + "</span>" + "</label>" 
        + "<label class='age_select'>" + " AGE : "  + "<span value ="+ data[i].age +">" + data[i].age  + "</span>" + "</label> " 
        + "<label class='city_select'>" + " CITY : " + "<span value ="+ data[i].city +">" + data[i].city + "</span>" +"</label>"   
        +"</li>"; 
    } 
        txt += "</ul>" 
        document.getElementById("demo").innerHTML = txt;
        // showPage(1);
        }
}

http.open("GET","js/thirdparty/demo.json",true);
http.send();

}

$(document).ready(function(){

$(".checkb").click(function(){

$(".content").find(".age_select").each(function () {
        var yy = ($(this).attr('value'));
        sections = $('.content');
        var checked = $(".options :checkbox:checked");
            if (checked.length) {
                sections.hide();
                checked.each(function () {
                    $(".content .age_select span[value='" +$(this).val()+"']" ).closest('.content').show();
                });
            } else {
                sections.show();
            }
        });
    });

    $(".checkb1").click(function(){
    $(".content").find(".city_select").each(function () {
        var yy = ($(this).attr('value'));
        sections = $('.content');
        var checked = $(".options1 :checkbox:checked");
        console.log(checked);
            if (checked.length) {
                sections.hide();
                checked.each(function () {
                    $(".content .city_select span[value='" +$(this).val()+"']").closest('.content').show("25");
                });
            } else {
                sections.show();
            }

        });
    });

});


$(function(){

// pagination for page and next/previos button

pageSize = 5;
showPage = function(page){
    $(".content").hide();
    $(".content").each(function(n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
        });        
    }

showPage(1);

$(".pagination a").click(function() {
    $(".pagination a").removeClass("active");
    $(this).addClass("active");
    showPage(parseInt($(this).text()));

    var abc = $(".pagination a:first").hasClass("active");
     
    if($(".pagination a:nth-last-child(2)").hasClass("active")){
        $('#next').css("visibility","hidden");
    }else{
        $('#next').css("visibility","visible");
    }

    if($(".pagination a:first").hasClass("active")){
        $('#prev').css("visibility","hidden");
    }else{
        $('#prev').css("visibility","visible");
    }
});

 $("#next").click(function () {
        var last = $("#forul").children('li:visible:last');
        last.nextAll(':lt(5)').show();
        last.next().prevAll().hide();
        var $pageNext = $('.pagination a.active').removeClass('active').next('a');
        if ($pageNext.length) {
            $pageNext.addClass('active'); 
        }
        if($(".pagination a:nth-last-child(2)").hasClass("active")){
            $('#next').css("visibility","hidden");
        }else{
            $('#next').css("visibility","visible");
        }


        if($(".pagination a:first").hasClass("active")){
            $('#prev').css("visibility","hidden");
        }else{
            $('#prev').css("visibility","visible");
        }
    
    });

    $("#prev").click(function () {
        var last = $("#forul").children('li:visible:first');
        last.prevAll(':lt(5)').show();
        last.prev().nextAll().hide();
        $('#next').show();
         var $pagePrev = $('.pagination a.active').removeClass('active').prev('a');
        if ($pagePrev.length) {
            $pagePrev.addClass('active'); 
        }


        if($(".pagination a:nth-last-child(2)").hasClass("active")){
            $('#next').css("visibility","hidden");
        }else{
            $('#next').css("visibility","visible");
        }

        if($(".pagination a:first").hasClass("active")){
            $('#prev').css("visibility","hidden");
        }else{
            $('#prev').css("visibility","visible");
        }
    
    });

//End Of pagination for page and next/previos button

// Dropdown select age and city
    $(".drop-down .selected a").click(function(){
    $(".drop-down .options").toggle();
    });

     $(document).on("click", function(event){
        var $trigger = $(".drop-down,.drop-down1");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $(".drop-down .options,.drop-down1 .options1").hide("slow");
        }            
    });
    $(".drop-down1 .selected a").click(function(){
    $(".drop-down1 .options1").toggle();
    });


//End of Dropdown select age and city

// Search box input value

$("#getSearchedText").click(function(){
    var textValue = $("#inputText").val();

        $("#checkboxValueCity").append('<li class="filtertag"><span value="'+ textValue +'" >'+textValue+' </span><i class="closetag fa fa-times icon-close" id="'+textValue+'" onClick="removeSearchText(this.id);"></i></li>');
    var textValue = $("#inputText").val("");
});


$('.example #inputText').keyup(function() {
  
var $rows = $('.content');
var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

$rows.show().filter(function() {
var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
return !~text.indexOf(val);
}).hide();
});


//End Of Search box input value

});

// javascript Code

function removeSearchText(id){ 
var searchTag = document.getElementById(id);
searchTag.parentNode.remove();



}


function forCheckbox(){
    var checkboxes = document.querySelectorAll('[name="age"], [name="city"]');
    var checkboxesChecked = [];
    for (var i=0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push('<li class="filtertag" ><span value="'+checkboxes[i].value+'" >'+checkboxes[i].value+' </span><i class="closetag fa fa-times icon-close" id="'+checkboxes[i].value+'" onclick="uncheckbox(this.id);"></i></li>');
        }
    }
        $("#checkboxValueAge").html(checkboxesChecked);
}


function uncheckbox(id){
    var checkboxes = document.querySelectorAll('[name="age"], [name="city"]');
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked) { 
        if(checkboxes[i].value == id){ 
            checkboxes[i].checked = false; 

            $(".content").find(".age_select").each(function () {
            var yy = ($(this).attr('value'));
            sections = $('.content');
            var checked = $(".options :checkbox:checked");
                if (checked.length ) {
                    sections.hide();
                    checked.each(function () {
                        $(".content .age_select span[value='" +$(this).val()+"']" ).closest('.content').show();
                    });
                } else {
                sections.show();
                }
            });
        }
    }
}
forCheckbox();

}




