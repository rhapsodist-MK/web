    $(function () {
    
    categories();
    go_to_buy();
    cart_container();
    cart_count();
    brand();
    product();
/*    product_cate();*/



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////brand item list////////////////////////////////////////////////////////


    $("body").on('click', '.brand', function(event){
        event.preventDefault();        
        var brand_name = $(this).attr('name');
        ajax1('action.php', {get_selected_Brand:1, category_title:getParameter('category_title'), brand_name:brand_name}, "#get_product_list");
        page();
    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////brand list////////////////////////////////////////////////////////


    function brand(){
        ajax1('action.php', {brand:1, category_title:getParameter('category_title')}, "#get_brand");
    }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////keyword searching////////////////////////////////////////////////////////////////////////

    $("#search").on('keyup', function(){
        var keyword = $("#search").val();
        if(keyword != ""){
            ajax1('action.php', {search:1, keyword:keyword, category_title:getParameter('category_title')}, '#get_product');
            ajax1('action.php', {search:1, keyword:keyword, category_title:getParameter('category_title')}, '#get_product_list');
        }
    });



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////pageing////////////////////////////////////////////////////////////////////////



    $("body").on('click', '.page', function(){
        var pageno = $(this).attr('name');
        ajax1('action.php', {setPage:1, pageno:pageno}, "#get_product");
        ajax1('action.php', {setPage:1, pageno:pageno, category_title:getParameter('category_title')}, "#get_product_list");
    });

    function page(){
        ajax1('action.php', {page:1, category_title:getParameter('category_title')}, '#pageno');
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////update quantity////////////////////////////////////////////////////////////////////////


    $("body").on('click', '.update', function(event){
        event.preventDefault();
        var no = $(this).attr('id');
        var product_name = $(this).attr('name');
        var product_quantity = $('#quantity-' + no).val();
        var product_price = $('#price-' + no).val();
        var total = $('#total-' + no).val();

        ajax2('action.php', {updateProduct:1, product_name:product_name, product_quantity:product_quantity, product_price:product_price}, function(data){
            $('#cart_msg').html(data);
            go_to_buy();
            cart_container();
            cart_count();
        });
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////total quantity////////////////////////////////////////////////////////////////////////


    $("body").on('keyup', '.quantity', function(event){
        event.preventDefault();
        var no = $(this).attr("name");
        var product_quantity = $(this).val();
        var product_price = $("#price-" + no).val();
        var total = product_quantity * product_price;
        $("#total-" + no).val(total);
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////remove things////////////////////////////////////////////////////////////////////////////////
    $("body").on('click', '.remove', function(event){
        event.preventDefault();
        var product_name = $(this).attr('name');

        ajax2('action.php', {removeFromCart:1, product_name:product_name}, function(data){
            $('#cart_msg').html(data);
            go_to_buy();
            cart_container();
            cart_count();
        });
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////how many things in the cart//////////////////////////////////////////////////////////////

    function cart_count(){
        ajax1('action.php', {cart_count:1}, '.badge');
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////go to buy section/////////////////////////////////////////////////////////////



    function go_to_buy(){
        ajax1('action.php', {go_to_buy:1}, "#cart_list");
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////addtocart button add product/////////////////////////////////////////

    $("body").on('click','.addtocart', function(event){
        event.preventDefault();
        var product_name = $(this).attr('id');
        ajax2('action.php', {addProduct:1, product_name:product_name}, function(data){
            $('#product_msg').html(data);
            $("#badge").animate({'fontSize':'3em'});
            $("#badge").animate({'fontSize':'1em'});
            cart_container();
            cart_count();
        });
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////카트 품목 토글/////////////////////////////////////////////////////////


    function cart_container(){
        ajax1('action.php', {get_cart_product:1}, "#cart_product");
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////login/////////////////////////////////////////////////////////////

    $("#login").on('click', function(event){
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();

        ajax2('login.php', {userLogin:1, userEmail:email, userPassword:password},function(data){
                $('#choose_signin_or_user').html(data);
                categories();
                cart_container();
                cart_count();

            ///////////////////////////////////////////////// registration.php 에서 로그인시 index.php로 이동
                var tmpStr = $(location).attr('href');
    
                var cnt = 0;
                while(true){
                    cnt = tmpStr.indexOf("/");
                    if(cnt == -1) break;
                    tmpStr = tmpStr.substring(cnt+1);
                }

                while(true){
                    cnt = tmpStr.indexOf("\\");
                    if(cnt == -1) break;
                    tmpStr = tmpStr.substring(cnt+1);
                }

                if(tmpStr == 'registration.php'){
                    location.replace('index.php');
                }
             /////////////////////////////////////////////////   
            });
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
 //////////////////////////////////////sign up, Validation check//////////////////////////////////////////////////

    $('.signupbtn').on('click', function(event){
        event.preventDefault();
        ajax1('register.php', $('form').serialize(), "#successcheck");
        alert('signed up sccessfuly');
        location.href = 'index.php';
    });

    $('.updatebtn').on('click', function(event){
        event.preventDefault();
        ajax1('update_info.php', $('form').serialize(), "#successcheck");
        alert('your information is updated');
        location.href = 'index.php';
    });
    
    $('form').find('#email').on('blur', function(event){
        event.preventDefault();
        ajax1('./check/emailcheck.php', $('form').serialize(), "#emailcheck");
        $('#emailcheck').show();
    });
    
    $('form').find('#password').on('blur', function(event){
        event.preventDefault();
        ajax1('./check/passwordcheck.php', $('form').serialize(), "#passwordcheck");
        $('#passwordcheck').show();
        
    });

    $('form').find('#repassword').on('blur', function(event){
        event.preventDefault();
        ajax1('./check/repasswordcheck.php', $('form').serialize(), "#repasswordcheck");
        $('#repasswordcheck').show();
    });

    $('form').find('#mobile').on('blur', function(event){
        event.preventDefault();
        ajax1('./check/mobilecheck.php', $('form').serialize(), "#mobilecheck");
        $('#mobilecheck').show();
    });    
////////////////////////////////////////////////////////////////////////////////////// 

 ////////////////////////////////////get product///////////////////////////////////  
    function product(){

        ajax1("action.php", {getProduct:1, category_title:getParameter('category_title')}, "#get_product");
        ajax1("action.php", {getProduct:1, category_title:getParameter('category_title')}, "#get_product_list");
        page();
    }

////////////////////////////////////////////////////////////////////////////////////// 
    
//////////////////////////////get category////////////////////////////////////////
    function categories(){
        ajax1("action.php", { categories:1 }, "#get_categories");
    }

//////////////////////////////////////////////////////////////////////////////////////  
    function ajax1(url, data, success){
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: function(data){
                $(success).html(data);
            }
        });
    }

    function ajax2(url, data, success){
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: success
        });
    }

    function getParameter(param) { 
        var returnValue; 
        var url = location.href; 
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); 
        for (var i = 0; i < parameters.length; i++){ 
            var varName = parameters[i].split('=')[0]; 
            if (varName.toUpperCase() == param.toUpperCase()){ 
                returnValue = parameters[i].split('=')[1]; 
                return decodeURIComponent(returnValue); 
            } 
        } 
    } //get 형식 파라미터 구하기
});
