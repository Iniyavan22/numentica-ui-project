const {Client,Databases}=Appwrite

function filter(filteredProducts) {
    filteredProducts.forEach((element) => {
        const colorPaletteHTML = element.color.map(colors => `<span class='color-pallete ${colors}' onclick="changeActive(event)"></span>`).join('');
        const variable = `<div class='product-card' check=${element.check}>
                            <img src=${element.imageUrl}>
                            <div>
                                <h3>${element.name}</h3>
                                <p>${element.price}</p>
                                <div class='colors'>
                                    ${colorPaletteHTML}
                                    <span>+3</span>
                                </div>
                            </div>
                          </div>`;
        const htmlStr = document.createRange().createContextualFragment(variable);
        $(".shop-cards").append(htmlStr);
    });
};



// filter(test);

// function renderProduct(productCategory, test) {
//     document.querySelector(".shop-cards").innerHTML = "";
//     const newtest = test.filter((element) => element.type === productCategory);
//     filter(newtest);
// };
function renderProduct(productCategory, test) {
    $(".shop-cards").html("");
    const newtest = test.filter((element) => element.type === productCategory);
    filter(newtest);
};


// document.querySelector("#category").addEventListener("click", (event) => {
//     renderProduct(event.target.id, test);
//     addToCart();
// });




var lowerSlider = document.querySelector('#lower'),
    upperSlider = document.querySelector('#upper'),
    lowerVal = parseInt(lowerSlider.value),
upperVal = parseInt(upperSlider.value);


$("#lowerValue").html(lowerVal);
$("#upperValue").html(upperVal);


upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    if (upperVal < lowerVal + 10) {
        lowerSlider.value = upperVal - 10;

        if (lowerVal == lowerSlider.min) {
            upperSlider.value = 10;
            upperVal=upperSlider.value
        }
    }
    $("#lowerValue").html(lowerVal);
    $("#upperValue").html(upperVal);
};


lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    if (lowerVal > upperVal - 10) {
        upperSlider.value = lowerVal + 10;

        if (upperVal == upperSlider.max) {
            lowerSlider.value = parseInt(upperSlider.max) - 10;
            lowerVal=lowerSlider.value
        }
    }
    $("#lowerValue").html(lowerVal);
    $("#upperValue").html(upperVal);
};




function addToCart() {
    const products = document.querySelectorAll(".product-card");
 
    products.forEach((element) => {
        element.addEventListener("click", function () {
            const tempdata = element.getAttribute("check")
            if (tempdata === "false") {
                let prevValue = parseFloat($('#cart-badge').html());
                prevValue += 1;
                $("#cart-badge").html(prevValue);
                element.setAttribute("check", "true");
            };
        });
    });
};



const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('6617679f5c0eb645569f') 
;


const promise = databases.listDocuments('661767c126a43868fb25', '661767e907e6c66b6f32');

promise.then(function (response) {
    filter(response.documents);
    addToCart();
    $("#category").on("click", (event) => {
        renderProduct(event.target.id, response.documents);
        addToCart();
    }) // Success
}, function (error) {
    console.log(error); // Failure
});




 

 
 
