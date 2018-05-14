$(document).ready(function(){
    $("#first").click(function(){
        $("#myVideo").addClass("blur");
        $('.sights').toggleClass(".move");
    });
});

$(document).ready(function(){
    $("#second").click(function(){
        $("#myVideo").addClass("blur");
        $('.smells').css("transform","translate(0%,0)");
    });
});

$(document).ready(function(){
    $("#third").click(function(){
        $("#myVideo").toggleClass("blur");
        $('.sounds').css("transform","translate(0%,0)");
    });
});

$(document).ready(function(){
    $("#fourth").click(function(){
        $("#myVideo").toggleClass("blur");
        $('.touches').css("transform","translate(0%,0)");
    });
});
