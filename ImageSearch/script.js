window.addEventListener('load', () => {
    let loader = document.querySelector('.loader');
    loader.classList.add('loaderHidden');
    loader.addEventListener('transitionend', () =>{
        document.body.removeChild('.loader');
    })
})

$("#submit").click(() => {
    $('#reveal').html("");
    searchImage();    
})

let page = 1;

async function searchImage(){
    let search = $("#search").val();
    if (search == "") {
        swal({
            title: "ERROR!",
            text: "This field cannot be empty !",
            icon: "error",
            button: "Okay",
          });
          return false;
    }
    url = "https://api.unsplash.com/search/photos?page="+page+"&query="+search+"&client_id=_E-KO2ZG31i8zoGOji3qcd_IyQFJ4VSQw2LFDq9GdAs";
    try {
        let response = await fetch(url);
        // convert to JSON
        let data = await response.json();
        let result = data.results;

        result.map((resp) => {
        final = "<div class='col-sm-6 col-lg-4 mb-4 some'><div class='card'><img src='"+ resp.urls.regular +"' class='card-img-top' alt='"+ resp.alt_description +"'><div class='card-body'><h6 class='card-title'>Produced by: "+resp.user.name +"</h6><p class='card-text text-muted'>Location: "+ resp.user.location+"</p><p class='card-text'>"+ resp.likes +" Likes</p><a href='"+resp.user.portfolio_url +"' target='_blank' id='go' class='btn'>See Portfolio</a><a href='"+ resp.links.download +"' target='_blank'><i class='fa-sharp fa-solid fa-download float-end' title='Download' download='download'></i></a></div></div></div>";
        $('#reveal').append(final);
        $("#showMore").css("display", "block");
       })


    

       final++;
       page++;

    }catch{
        swal({
            title: "ERROR!",
            text: "INVALID INPUT",
            icon: "error",
            button: "Okay",
          });
    }
}

$("#showMore").click(() => {
    searchImage();

})


// the social media button 
function button () {
    var options = {
        instagram: "md_angelwhite", // Instagram username
        whatsapp: "+2348102678284", // WhatsApp number
        call_to_action: "Message me", // Call to action
        button_color: "grey", // Color of button
        position: "right", // Position may be 'right' or 'left'
        order: "instagram,whatsapp", // Order of buttons
        pre_filled_message: "Hello, I want to make an enquiry, my name is ...", // WhatsApp pre-filled message
    };
    var proto = 'https:', host = "getbutton.io", url = proto + '//static.' + host;
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
    s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
}
button();



