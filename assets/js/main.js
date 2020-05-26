/**
* Template Name: OnePage - v2.0.0
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

var SHOE_ID=null;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateRandomNumbers(min,max){
  var array = Array.from({length: max-min}, () => Math.floor(Math.random() * (max - min + 1) + min));
 
 return array.filter((a, b) => array. indexOf(a) === b)
}

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

function alert(type,message){
  var alert = $(`<div class="alert alert-${type} alert-dismissible fade show" role="alert"><strong></strong>${message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
  return alert;
}

class shoeComponent  {

  constructor (shoe,name,price,brand,categorie,colors,images){
      this.name = name;
      this.categorie = categorie;
      this.price = price;
      this.brand = brand;
      this.colors = colors;
      this.images = images;
      this.shoe = shoe;
  }

  get(){
    var imgs = this.images.filter(function(v,i){
      return v.match("1")
    });

    var imgPreview = "<ul class='img-preview'>";

    imgs.forEach((v,i) => {
        imgPreview += "<li><img src='assets/img/shoes/"+this.brand.toLocaleLowerCase()+"/"+v+"'></li>";
    });
    imgPreview += "</ul>";    
    return $('<a href="#" data-item="'+this.shoe+'" data-toggle="modal" data-target="#shoe-data" class="col-lg-4 col-md-6 d-flex align-items-stretch shoe mb-5" data-aos="zoom-in" data-aos-delay="100"> <div div class="card icon-box iconbox-blue p-0" style="border-color: transparent;"> <img class="card-img-top img-holder fit-card" src="assets/img/shoes/'+this.brand.toLocaleLowerCase()+'/'+this.images[0]+'" alt="'+this.name+'"><img src="assets/img/brands/'+this.brand.toLocaleLowerCase()+'.png" alt="'+this.brand+'" title="'+this.brand+'" style="width: 30px;height: 30px;object-fit: cover;position: absolute;right: 5px;top: 215px;"><div class="card-body pt-1">'+imgPreview+'<div class="d-flex justify-content-between text-left"> <h5 class="card-title">'+this.name+'</h5> <p class="card-title">'+this.price+' DH</p> </div> <p class="card-text text-left">'+this.categorie+'</p> <p class="card-text text-left"><small class="text-muted">'+this.colors+' Colors</small></p> </div> </div> </a>');
  }
}


class Brand {
  constructor(name) {
    this.id = Brand.incrementId()
    this.name = name;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }

  static findById(id){
    return this.list.find(e => e.id == id);
  }

  static findByName(name){
    return this.list.find(e => e.name.toLocaleLowerCase() == name.toLocaleLowerCase());
  }

}



class Shoe {
  constructor(name,brand,categorie,price,colors,images) {
    this.id = Shoe.incrementId()
    this.name = name;
    this.brand = brand;
    this.categorie = categorie;
    this.price = price;
    this.colors = colors;
    this.images = images;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }

  static findById(id){
    return this.list.find(e => e.id == id);
  }

  static findImagesByColor(shoe,color){
    return shoe.images.filter(function(v,i){
      return v.includes(color.replace(' & ','-'));
    });
  }

}

class Cart {
  static list = [];
  constructor(shoe,size,color,price){
    this.id = Cart.incrementId();
    this.shoe = shoe;
    this.size = size;
    this.color = color;
    this.price = price;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }

  static findById(id){
    return this.list.find(e => e.id == id);
  }

  static findByIdAndShoe(id,shoe){
    return this.list.find(e => e.id == id && e.shoe == shoe);
  }

  static refresh(){
    if(this.list != null && this.list.length > 0)
      $('.cart_count').removeClass('hide');
    else
      $('.cart_count').addClass('hide');
  }

  static removeAll(){
    Cart.list = [];
    localStorage.setItem('cart',JSON.stringify(this.list));
    Cart.showItems($('.shoe-items'));
  }

  static showItems(itemsContainer){
    itemsContainer.html('');
    this.getFilteredShoes().forEach(function(v,i){
      var vv = v;
      v = v[0];
      console.log(v);
      var item = '<div class="card shoe-item mb-2" data-id="'+v.id+'"data-shoe="'+v.shoe+'"><div class="card-body row p-0">';
          item += '<div class="col-sm-4">';
          item += '    <img class="img-fluid" style="object-fit: cover;max-height: 160px;width: 100%;" src="assets/img/shoes/'+Brand.findById(Shoe.findById(v.shoe).brand).name.toLocaleLowerCase()+'/'+Shoe.findImagesByColor(Shoe.findById(v.shoe),v.color)[0]+'" alt="" srcset="">';
          item += ' </div>';
          item += '<div class="col-sm-8 p-3">';
          item += '  <button type="button" class="close delete-shoe-item" style="position: absolute;right: 30px;top: 12px;" aria-label="Delete">';
          item += '      <span aria-hidden="true">&times;</span>';
          item += '    </button>';
          item += '  <h4 class="item-title">'+Shoe.findById(v.shoe).name+'</h4>';
          item += '  <h5 class="text-muted item-color">'+v.color+'</h5>';
          item += '  <h6>Size : <span class="item-size">'+v.size+'</span></h6>';
          if (vv.length > 1)
            item += '  <h6><span class="items-count">'+vv.length+' Items</span></h6>';
          item += '  <h5 style="position: absolute;right: 30px;bottom: 12px;"><span class="item-price">'+v.price+'</span> DH</h5>';
          item += '</div>';
          item += '</div>';
          item += '</div>'
      itemsContainer.append(item);
    });
    Cart.refresh();
    if(Cart.list == null || Cart.list.length == 0)
    {
      $('#checkout .row:eq(0)').html('<div class="col-12"><h1>Your bag is empty</h1><a href="index.html#shop" class="btn  btn-primary mt-4">Shop now</a></div>').addClass('empty text-center img-fluid');
    }else{
      $('.item-count').text(Cart.list.length);
      $('.total-price').text(Cart.getTotalPrice() + ' DH')
      $('.delete-shoe-item').click(function(){
        var id = parseInt($(this).closest('.shoe-item').attr('data-id'));
        var shoe = parseInt($(this).closest('.shoe-item').attr('data-shoe'));
  
        Stock.revertFromCart(Cart.findByIdAndShoe(id,shoe));
        Cart.showItems(itemsContainer);
      });

      $('#checkoutBtn').click(function(){
        Checkout.configure({
          publicKey: 'pk_test_063879aa-a118-436f-a706-39775448afbb',
          customerEmail: 'user@email.com',
          value: Cart.getTotalPrice(),
          currency: 'MAD',
          payButtonSelector: '.customButton' || '#customButton',
          paymentMode: 'cards',
          cardFormMode: 'cardTokenisation',
          cardTokenised: function (event) {
            console.log(event.data.cardToken);
            Cart.removeAll();
          }
        });
        Checkout.open();
      });
    }
  }

  static getFilteredShoes(){
    var s = [null,null,null];
    var _l = []
    var list = [];
    Cart.list.forEach(function(v,i){
        _l.push([v.shoe,v.color,v.size]);
    })
    _l.sort().forEach(function(v,i){
        if(!arraysMatch(s,v)){
          list.push(Cart.findShoeByColorSize(v[0],v[1],v[2]));
          s = v;     
        }
    })

    return list;
  }

  static findShoeByColorSize(shoe,color,size){
    return this.list.filter(e => e.shoe == shoe && e.color == color && e.size == size);
  }

  static create(cart){
    var r = null;
    if(cart instanceof Cart)
    {
      this.list.push(cart);
      localStorage.setItem('cart',JSON.stringify(this.list));
      r = true; 
    }
    this.refresh();
    return r;
  }

  static getTotalPrice(){
    var total = 0;
    Cart.list.forEach(function(v,i){
     total += v.price;
    });

    return total;
  }

  static remove(id,shoe){
    var old = this.list;
    var _new = this.list.filter(e => e.id !== id || e.shoe !== shoe);
    if(old.length == _new.length)
      return null;
    else
      {
        this.list = this.list.filter(e => e.id !== id || e.shoe !== shoe);
        localStorage.setItem('cart',JSON.stringify(this.list));

        this.refresh();
        return true;
      }
  }
}

class Stock {
  constructor(shoe,color,size,quantity){
    this.shoe = shoe;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
  }

  static findByShoe(shoe){
    return this.list.filter(e => e.shoe == shoe);
  }

  static findShoeByColorSize(shoe,color,size){
    return this.list.find(e => e.shoe == shoe && e.color == color && e.size == size);
  }

  static getTotalQuantiteOfShoe(shoe){
    var shoes = Stock.findByShoe(shoe);
    var total = 0;
    shoes.forEach(function(v,i){
     total += v.quantity;
    });

    return total;
  }

  static getQuantiteOfShoeByColorSize(shoe,color,size){
    var shoes = Stock.findByShoe(shoe);
    var total = 0;
    shoes.forEach(function(v,i){
     if(v.color == color && v.size == size)
      total += v.quantity;
    });

    return total;
  }

  static getTotalQuantite(){
    var total = 0;
    Stock.list.forEach(function(v,i){
     total += v.quantity;
    });

    return total;
  }

  static getColorsByShoe(shoe){
    var color = "";
    var colors = [];
    var array = this.findByShoe(shoe);
    array.forEach(function(v,i){
      if(v.color != color){
        colors.push(v.color);
        color = v.color;
      }
    });
    return colors;
  }

  static getSizesByShoe(shoe,color){
    var size = "";
    var sizes = [];
    var array = this.findByShoe(shoe);
    array.forEach(function(v,i){
      if(v.size != size && v.color == color && v.quantity>0){
        sizes.push(v.size);
        size = v.size;
      }
    });
    return sizes;
  }

  static addToCart(shoe){ 
    console.log(shoe);
    if(shoe.quantity>0)
    {
      shoe.quantity-=1;
      return Cart.create(new Cart(shoe.shoe,shoe.size,shoe.color,Shoe.findById(shoe.shoe).price));
    }else
      return null;
  }

  static revertFromCart(cart){ 
    if(Cart.remove(cart.id,cart.shoe))
    {
      var _shoe = Stock.findShoeByColorSize(cart.shoe,cart.color,cart.size);
      _shoe.quantity+=1;
      localStorage.setItem('stock',JSON.stringify(Stock.list));
      return true;
    }else
      return null;
  }

}


!(function($) {
  "use strict";
 
  Brand.list = [new Brand("Nike"),new Brand('Adidas'),new Brand('Vans'),new Brand('Converse')];  
  Shoe.list = [
    new Shoe("React Vision",Brand.findByName("Nike").id,"Men's shoe",1579,["black","black & white","white"],[
      "react-vision/black-1.jpg",
      "react-vision/black-2.jpg",
      "react-vision/white-1.jpg",
      "react-vision/white-2.jpg",
      "react-vision/black-white-1.jpg",
      "react-vision/black-white-2.jpg"
      ]),
    new Shoe("SB Shane",Brand.findByName("Nike").id,"Skate Shoe",899,["white","midnight","gumlight","black & white"],[
      "sb-shane-skate/white-1.jpg",
      "sb-shane-skate/white-2.jpg",
      "sb-shane-skate/black-white-1.jpg",
      "sb-shane-skate/black-white-2.jpg",
      "sb-shane-skate/gumlight-1.jpg",
      "sb-shane-skate/gumlight-2.jpg",
      "sb-shane-skate/midnight-1.jpg",
      "sb-shane-skate/midnight-2.jpg",
    ]),
    new Shoe("SOLARBOOST 19",Brand.findByName("Adidas").id,"Men's shoe",1600,["black","blue","red"],[
      "solarboost/blue-1.jpg",
      "solarboost/blue-2.jpg",
      "solarboost/black-1.jpg",
      "solarboost/black-2.jpg",
      "solarboost/red-1.jpg",
      "solarboost/red-2.jpg",
    ]),
    new Shoe("Stans Smith",Brand.findByName("Adidas").id,"Women's shoe",900,["white","pink","silver"],[
      "stans-smith/pink-1.jpg",
      "stans-smith/pink-2.jpg",
      "stans-smith/silver-1.jpg",
      "stans-smith/silver-2.jpg",
      "stans-smith/white-1.jpg",
      "stans-smith/white-2.jpg",
    ]),
    new Shoe("Carhartt WIP Chuck 70",Brand.findByName("Converse").id,"Men's shoe",1100,["green","brown",],
    [
      "carhartt/green-1.jpg",
      "carhartt/green-2.jpg",
      "carhartt/brown-1.jpg",
      "carhartt/brown-2.jpg",
    ]),
    new Shoe("Seasonal Color Chuck",Brand.findByName("Converse").id,"Women's shoe",500,["pink","blue","grey"],
    [
      "chuck-taylor/pink-1.jpg",
      "chuck-taylor/pink-2.jpg",
      "chuck-taylor/blue-1.jpg",
      "chuck-taylor/blue-2.jpg",
      "chuck-taylor/grey-1.jpg",
    ]),
    new Shoe("Old School",Brand.findByName("Vans").id,"Men's shoe",600,["black & white","blue","grey","yellow","red"],
    [
      "old-school/black-white-1.png",
      "old-school/blue-1.png",
      "old-school/yellow-1.png",
      "old-school/red-1.png",
      "old-school/grey-1.png",
    ]),
    new Shoe("Slip on",Brand.findByName("Vans").id,"Men's shoe",500,["black","white","grey","pink"],
    [
      "slip-on/black-1.png",
      "slip-on/black-2.png",
      "slip-on/white-1.png",
      "slip-on/white-2.png",
      "slip-on/pink-1.png",
      "slip-on/grey-1.png",
    ]),
    new Shoe("Yakht Club",Brand.findByName("Vans").id,"Men's shoe",500,["Colorful"],
    [
      "yakht-club/colorful-1.png",
      "yakht-club/colorful-2.png",
    ])
  ];

  Stock.list = [];
  Cart.list = [];

  if(localStorage.getItem('stock') == null) {
    Shoe.list.forEach(function(v,i){
      v.colors.forEach(function(color,j){
        var sizes = generateRandomNumbers(33,46);
        sizes.forEach(function(size,k){
          Stock.list.push(new Stock(v.id,color,size,parseInt((Math.random()*20)+1)));
        })
      })
    });
    
    localStorage.setItem('stock',JSON.stringify(Stock.list));
    console.info('Cookie Added');
  }else
    {
      Stock.list = JSON.parse(localStorage.getItem('stock'));
    }

  if(localStorage.getItem('cart') != null) {
      Cart.list = JSON.parse(localStorage.getItem('cart'));
      Cart.refresh();
    }
  

  $('#shoesCount').text(Stock.getTotalQuantite())
  
  console.log(Stock.findByShoe(Shoe.list[0].id));

  console.log('Total Of 1:' + Stock.getTotalQuantiteOfShoe(Shoe.list[0]) + ' /// Total : ' + Stock.getTotalQuantite());


  shuffle(Shoe.list).forEach(function(v,i){
    $('.shoes').append(new shoeComponent(v.id,v.name,v.price,Brand.findById(v.brand).name,v.categorie,v.colors.length,v.images).get());
  })
  
  console.log(Shoe.list)
  
  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  $(".img-preview img").mouseover(function(){
    $(this).closest(".card, .modal-body").find('.img-holder').attr('src',$(this).attr('src'));
  })

  $('#shoe-data').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var title = $("#modal-title");
    var imgPreview = $('.modal-img-preview div');
    var imgholder = $('.modal-img-holder');
    var shoe = Shoe.findById(button.data('item'));
    var imgs = "<ul class='img-preview'>";
    var brand_name = Brand.findById(shoe.brand).name.toLocaleLowerCase();
    
    SHOE_ID = shoe.id;

    $('.alert-holder').text('');
    imgholder.attr('src',`assets/img/shoes/${brand_name}/`+shoe.images[0]);
    
    shoe.images.forEach((v,i) => {
        imgs += `<li><img style="width:90px;height:90px;" src="assets/img/shoes/${brand_name}/${v}"></li>`;
    });
    imgs += "</ul>"; 
    imgPreview.text("");
    imgPreview.append(imgs);

    title.text( brand_name.charAt(0).toUpperCase() + brand_name.slice(1) +" "+ shoe.name);

    $('#select-color').text('');
    Stock.getColorsByShoe(SHOE_ID).forEach(function(v,i){
      $('#select-color').append(`<option value="${v}">${capitalize_Words(v)}</option>`);
    })

    imgholder.attr('src',`assets/img/shoes/${brand_name}/`+Shoe.findImagesByColor(shoe,$('#select-color').val())[0]);


    $('#select-size').text('');
    var _sizes = Stock.getSizesByShoe(SHOE_ID,$('#select-color option:selected').val());
    _sizes.sort().forEach(function(v,i){
      $('#select-size').append(`<option value="${v}">${v}</option>`);
    });

    $('#select-color').change(function(){
      var imgs = Shoe.findImagesByColor(shoe,$(this).val())
      imgholder.attr('src',`assets/img/shoes/${brand_name}/`+imgs[0]);
      //console.log({shoe : shoe,color:$('#select-color').val(),size : $('#select-size').val(),totalQuantite : Stock.getQuantiteOfShoeByColorSize(shoe.id,$('#select-color').val(),$('#select-size').val())});
      $('#select-size').text('');
      var _sizes = Stock.getSizesByShoe(SHOE_ID,$('#select-color option:selected').val());
      _sizes.sort().forEach(function(v,i){
      $('#select-size').append(`<option value="${v}">${v}</option>`);
      });
    });
 
    console.info({Shoe: SHOE_ID});

    var modal = $(this);
    $(".img-preview img").mouseover(function(){
      $(this).closest(".card, .modal-body").find('.modal-img-holder').attr('src',$(this).attr('src'));
    })
    $('#addToCartBtn').prop('disabled',true);

    if( $('#select-color option').is(':selected') && $('#select-size option').is(':selected'))
    $('#addToCartBtn').prop('disabled',false);
  })

  $('#addToCartBtn').click(function(){
    if($('#select-color').val() != "" && $('#select-size').val() != "" && $('#select-color').val() != null  && $('#select-size').val() != null)
    {
      if(Stock.addToCart(Stock.findShoeByColorSize(SHOE_ID,$('#select-color').val(),parseInt($('#select-size').val())))){
        localStorage.setItem('stock',JSON.stringify(Stock.list));
        $('#select-size').text('');
        var _sizes = Stock.getSizesByShoe(SHOE_ID,$('#select-color option:selected').val());
        _sizes.sort().forEach(function(v,i){
          $('#select-size').append(`<option value="${v}">${v}</option>`);
        });
        $('.alert-holder').html(alert('success','Added to bag successfully. <a href="checkout.html#checkout">view bag</a>'));
      }else
        $('.alert-holder').html(alert('danger','This product is out of stock.'));
    }else if ($('#select-color').val() == null  || $('#select-size').val() == null)
      $('.alert-holder').html(alert('danger','This product in this color is out of stock. Try another color'));
    else
      $('.alert-holder').html(alert('danger','Please select your color and size.'));
  });

    if(Cart.list == null || Cart.list.length == 0)
    {
      $('#checkout .row:eq(0)').html('<div class="col-12"><h1>Your bag is empty</h1><a href="index.html#shop" class="btn  btn-primary mt-4">Shop now</a></div>').addClass('empty text-center img-fluid');
    }else
      {
        Cart.showItems($('.shoe-items'));

      }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  aos_init();

})(jQuery);