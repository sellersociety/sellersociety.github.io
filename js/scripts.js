//MAIN SELLER SOCIETY PAGE
//Gathers all of the content for the homepage sellers list

$(function() {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsZrHno8b9NbjYPLBG83BsvH39Z4LUfc3zGGOevLGDE_GCEUxDBlYIQTI9YjSekCvglRNe5VTP74uo/pub?output=csv",

    success: function(data) {
      // Convert CSV data to JS Object (JSON). This uses jquery.csv.min.js
      artist_data = $.csv.toObjects(data);

      x = 0;
      artist_data.forEach(function() {
        // Skip this user if the 'is_visible' field is empty or 0 (assuming you have an is_visible field to hide/show people)
        if (artist_data[x]["Visible"] == 0) return;

        // Extract seller image id
        seller_string = artist_data[x]["Seller Photo"];
        seller_id_pos = seller_string.indexOf("id=") + 3;
        seller_id = seller_string.substr(seller_id_pos);

        // Extract 1st product image id
        product1_string = artist_data[x]["Product Photo 1"];
        product1_id_pos = product1_string.indexOf("id=") + 3;
        product1_id = product1_string.substr(product1_id_pos);

        // Extract 2nd product image id
        product2_string = artist_data[x]["Product Photo 2"];
        product2_id_pos = product2_string.indexOf("id=") + 3;
        product2_id = product2_string.substr(product2_id_pos);

        // Extract 3rd product image id
        product3_string = artist_data[x]["Product Photo 3"];
        product3_id_pos = product3_string.indexOf("id=") + 3;
        product3_id = product3_string.substr(product3_id_pos);

        // Loop through all rows in spreadsheet and create a new div for each person
        $(".seller-roster-container").append(
          `
            <div class="seller-object">
                <div class="seller-object-top">
                    <div class="seller-photo">
                        <img src="https://drive.google.com/thumbnail?id=` +
            seller_id +
            `">
                    </div>
                    <div class="seller-carousel fotorama" data-loop="true" data-keyboard="true" data-arrows="always" data-fit="cover" data-width="360px" data-height="360px">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product1_id +
            `&sz=w360-h360">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product2_id +
            `&sz=w360-h360">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product3_id +
            `&sz=w360-h360">
                    </div>
                </div>
                <div class="seller-object-bottom">
                    <div class="seller-name">
                    <div class="seller-roster-alumni"></div><h2 class="blue">` +
            artist_data[x]["Seller Name"] +
            `</h2>
                    </div>
                    <div class="seller-tagline">
                        <p class="blue bold">` +
            artist_data[x]["Store Tagline"] +
            `</p>
                    </div>
                    <div class="seller-description">
                        <p>` +
            artist_data[x]["Store Description"] +
            `</p>
                    </div>
                    <div class="seller-buttons">
                        <a href="` +
            artist_data[x]["Seller Portfolio"] +
            `" target="_blank" class="no-underline">
                            <div class="seller-portfolio">
                                <p class="bold black">Seller Portfolio</p>
                            </div>
                        </a>
                        <a href=` +
            artist_data[x]["Store Link"] +
            ` target="_blank" class="no-underline">
                            <div class="seller-shop">
                                <p class="bold white">Go To Shop</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>`
        );

        //Add alumni badge if needed
        if (artist_data[x]["Alumni"] == 1) {
          $(".seller-roster-alumni").append(`<img src="img/alumni.png">`);
        }

        // Add 1 to x to move to next row of spreadsheet
        x = x + 1;
        $.getScript("../fotorama-4.6.4/fotorama.js", function() {});
      });
    }
  });
});

//
//
//FEATURED SELLER
//Used to pull content for the header and featured seller page
$(function() {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWT6zWWElaDJujhr7Mco4KQZ9jmTB9jkoY0i-gLfGcAi_lf7WFgxHbDEQX5qquv4M4ZEqc3nZgnf7f/pub?output=csv",

    success: function(data) {
      // Convert CSV data to JS Object (JSON). This uses jquery.csv.min.js
      featured_data = $.csv.toObjects(data);
      featured_data.forEach(function() {
        // Extract featured seller image
        featured_seller_string = featured_data[0]["Featured Seller Photo"];
        featured_seller_id_pos = featured_seller_string.indexOf("id=") + 3;
        featured_seller_id = featured_seller_string.substr(
          featured_seller_id_pos
        );

        // Extract featured the 1st featured image
        featured_img1_string = featured_data[0]["Featured Seller Image 1"];
        featured_img1_id_pos = featured_img1_string.indexOf("id=") + 3;
        featured_img1_id = featured_img1_string.substr(featured_img1_id_pos);

        // Extract featured the 2nd featured image
        featured_img2_string = featured_data[0]["Featured Seller Image 2"];
        featured_img2_id_pos = featured_img2_string.indexOf("id=") + 3;
        featured_img2_id = featured_img2_string.substr(featured_img2_id_pos);

        // Extract featured the 3rd featured image
        featured_img3_string = featured_data[0]["Featured Seller Image 3"];
        featured_img3_id_pos = featured_img3_string.indexOf("id=") + 3;
        featured_img3_id = featured_img3_string.substr(featured_img3_id_pos);

        //Append content to the homepage header
        //
        //This code also appends the photo to the featured page
        $(".header-photo-csv").append(
          `
        <img src="https://drive.google.com/thumbnail?id=` +
            featured_seller_id +
            `&sz=w300-h300">`
        );
        $(".header-name-csv").append(
          `
            <p class="bold blue">` +
            featured_data[0]["Featured Seller Name"] +
            `
        </p>`
        );
        $(".header-title-csv").append(
          `
        <p class="blue">` +
            featured_data[0]["Featured Seller Title"] +
            `
    </p>`
        );
        $(".featured-name-csv").append(
          `
            <h1 class="blue">` +
            featured_data[0]["Featured Seller Name"] +
            `</h1>`
        );
        $(".featured-title-csv").append(
          `
              <h3 class="blue">` +
            featured_data[0]["Featured Seller Title"] +
            `</h3>`
        );
        $(".featured-bio-csv").append(
          `
                <p>` +
            featured_data[0]["Featured Seller Bio"] +
            `</p>`
        );
        $(".featured-buttons").append(
          `<a href="` +
            featured_data[0]["Featured Seller Portfolio Link"] +
            `" class="no-underline">
                            <div class="seller-portfolio">
                                <p class="bold black">Seller Portfolio</p>
                            </div>
                        </a>
                        <a href=` +
            featured_data[0]["Featured Seller Store Link"] +
            ` class="no-underline">
                            <div class="seller-shop">
                                <p class="bold white">Go To Shop</p>
                            </div>
                        </a>`
        );
      });
    }
  });
});

//
//
//MOBILE NAV
//Used for styling and functionality on the mobile nav
function mobileNav() {
  var x = document.getElementById("navLinks");
  if (x.className === "nav-links") {
    x.className += " responsive";
  } else {
    x.className = "nav-links";
  }
}
