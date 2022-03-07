var s=[null, null, null, null]
s[0] = document.getElementById('span1');
s[1] = document.getElementById('span2');
s[2] = document.getElementById('span3');
s[3] = document.getElementById('span4');
//  console.log(s)
var oneDay = 24 * 60 * 60 * 1000;
var firstDate = new Date("20 March 2022 17:00 UTC");var secondDate = new Date();
var days = (firstDate.getTime() - secondDate.getTime()) / (oneDay);
var hrs = (days - Math.floor(days)) * 24;
var min = (hrs - Math.floor(hrs)) * 60;
s[0].innerHTML = Math.floor(days);
s[1].innerHTML = Math.floor(hrs);
s[2].innerHTML = Math.floor(min);
s[3].innerHTML = Math.floor((min - Math.floor(min)) * 60);
var i = setInterval(function() {n()}, 1000)


function f(d, x) {
    s[d].innerHTML = x;
    s[d - 1].innerHTML = Number(s[d - 1].innerHTML) - 1;
}


function n() {
    s[3].innerHTML = Number(s[3].innerHTML) - 1;
if (s[3].innerHTML == -1) {f(3, 59)
if (s[2].innerHTML == -1) {f(2, 59)
if (s[1].innerHTML == -1) {f(1, 23)
}}}if(s[0].innerHTML <= -1) {
    clearInterval(i);
    document.getElementById("counter").classList.add("d-none")
    // document.getElementById('overEvent').innerHTML='<h2>The event is over.</h2>'
}}






// top 3 blog 

$(document).ready(function() {
  // alert("hi");
  load();
})
let blogs_data = [];
let blogs_data_length = 0;
let categories = [];
let tags = [];
let blogs_category = ``;
let blog_offset = 3;
let top3=3;

function load() {
  $.ajax({
    url: "blog.json",
    dataType: "json",
    success: function (data) {
      blogs_data = data;
      blogs_data_length = data.length;
      top3Blogs();
      let searchParams = new URLSearchParams(window.location.search);
      let id = searchParams.get("id");
      $(blogs_data).each(function (index, value) {
        //loop through your elements
        if (parseInt(value._id) == id) {
          // alert(_id);
          console.log(value);
          $("#lincode_og_title").attr("content", value.title);
          $("#lincode_og_description").attr("content", value.body);
          // $("#lincode_og_image").attr("content",blogs_data[parseInt(id)-1].bg_img_url);
          $("#lincode_og_image").attr("content", value.bg_img_url);
          $("#blog-post").append(value.body);
          $(".page-banner-area").css({
            "background-image": `url(${value.bg_img_url})`,
            "background-size": "contain",
            "background-repeat":"no-repeat",
            "width": "100%",
            "margin-top":"75px"

          });
        }
      });
    },
    statusCode: {
      404: function () {
        alert("There was a problem with the server.  Try again soon!");
      },
    },
  });

  $.ajax({
    url: "tags.json",
    dataType: "json",
    success: function (data) {
      tags = data;

      let items = "";

      $(tags).each(function (index, value) {
        items += `<a href="#" class="blogs-tag ml-2" data=${value} >${value}</a>`;
      });

      $(".blog-tags").empty();
      $(".blog-tags").append(items);
    },
    statusCode: {
      404: function () {
        alert("There was a problem with the server.  Try again soon!");
      },
    },
  });
}

var winWidth  = 0;

$(window).resize(function() {
  winWidth = $(window).width();
  if(winWidth <1025 && winWidth >768){
    // alert("yes")
     top3 = 2;
     top3Blogs()
  }else{
    top3 = 3;

    top3Blogs()
  }
});





$(document).on("click", ".readMore", function () {
  let key = $(this).attr("key");
});
function top3Blogs() {
  let items = "";

  // let top3 = 3;
  let currentPathLocation = window.location.pathname;
  let lastFileName = currentPathLocation.split("/").pop();
  // if (lastFileName == "blogs.php") {
  //   top3 = 2;
  // }
  // alert(lastFileName);

  if (blogs_data_length < 3) {
    top3 = blogs_data_length;
  }

  for (let index = 0; index < top3; index++) {
    items += `<figure class="lincode-cards-blog ">
            <img  src="${blogs_data[index].img_url}">
    <span class="Lincode-heading-blog">${blogs_data[index].title}</span>
                            <div class="post-info lincode-blog-date">
                                <i class="fa fa-calendar-check"></i>
                                <span class="">${blogs_data[index].date}</span>
                            </div>
    <span class="blog-sub-text">${blogs_data[index].para_extract.substr(
      0,
      100
    )}</span>
    <a class="txt-danger" href="blog.html?id=${
      blogs_data[index]._id
    }" target="_blank" class="float_right readMore txt-danger" key=${
blogs_data[index]._id
}><span class="rd-blog"> Read more ></span></a>
          </figure>`;

}

  $(".lincode-blogs-wrap").empty();
  $(".lincode-blogs-wrap").append(items);
}