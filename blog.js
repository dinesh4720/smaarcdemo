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

$(window).scroll(function () {
  if (
    $(window).scrollTop() >=
    $(document).height() - $(window).height() - 300
  ) {
    //Add something at the end of the page

    getMoreBlogs();
  }
});

$(window).scroll(function () {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    //AddMoreContent();
  }
});

function AddMoreContent() {
  $.post("index.php", function (data) {
    //Assuming the returned data is pure HTML
    $(data).insertBefore($("#placeHolder"));
  });
}

$(document).on("click", ".readMore", function () {
  let key = $(this).attr("key");
});

function getMoreBlogs() {
  if (blog_offset < blogs_data_length) {
    $(".infinite-scroll-data").append(`

    <figure class="lincode-cards-blog ">
      <img  src="${blogs_data[blog_offset].img_url}">
            <span class="Lincode-heading-blog">${blogs_data[blog_offset].title}</span>
                    <div class="post-info lincode-blog-date">
                        <i class="fa fa-calendar-check"></i>
                        <span class="">${blogs_data[blog_offset].date}</span>
                    </div>
<span class="blog-sub-text">${blogs_data[blog_offset].para_extract.substr(
0,
100
)}</span>
<a class="txt-danger" href="blog.html?id=${
blogs_data[blog_offset]._id
}" target="_blank" class="float_right readMore txt-danger" key=${
blogs_data[blog_offset]._id
}><span class="rd-blog"> Read more ></span></a>
  </figure>

                 `);

    blog_offset += 1;
  }

  if (blog_offset < blogs_data_length) {
    $(".infinite-scroll-data").append(`

    <figure class="lincode-cards-blog ">
    <img  src="${blogs_data[blog_offset].img_url}">
<span class="Lincode-heading-blog">${blogs_data[blog_offset].title}</span>
                    <div class="post-info lincode-blog-date">
                        <i class="fa fa-calendar-check"></i>
                        <span class="">${blogs_data[blog_offset].date}</span>
                    </div>
<span class="blog-sub-text">${blogs_data[blog_offset].para_extract.substr(
0,
100
)}</span>
<a class="txt-danger" href="blog.html?id=${
blogs_data[blog_offset]._id
}" target="_blank" class="float_right readMore txt-danger" key=${
blogs_data[blog_offset]._id
}><span class="rd-blog"> Read more ></span></a>
  </figure>

                 `);
    blog_offset += 1;
  }
  if (blog_offset < blogs_data_length) {
    $(".infinite-scroll-data").append(`
            
    <figure class="lincode-cards-blog ">
    <img  src="${blogs_data[blog_offset].img_url}">
<span class="Lincode-heading-blog">${blogs_data[blog_offset].title}</span>
                    <div class="post-info lincode-blog-date">
                        <i class="fa fa-calendar-check"></i>
                        <span class="">${blogs_data[blog_offset].date}</span>
                    </div>
<span class="blog-sub-text">${blogs_data[blog_offset].para_extract.substr(
0,
100
)}</span>
<a class="txt-danger" href="blog.html?id=${
blogs_data[blog_offset]._id
}" target="_blank" class="float_right readMore txt-danger" key=${
blogs_data[blog_offset]._id
}><span class="rd-blog"> Read more ></span></a>
  </figure>
            
            
                             `);
    blog_offset += 1;
  }
}

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
