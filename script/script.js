let cartArray = [];
// Common Functions
const change = (id) => {
    const all = document.querySelectorAll('.categoryCardStyle');
    all.forEach(a => a.classList.remove('categoryCardStyle'));
    document.getElementById(`category_btn_${id}`).classList.add('categoryCardStyle');
}
const loading = (status) => {
    if (status == true) {
        document.getElementById('category-wise-plants').classList.add('hidden');
        document.getElementById('loading').classList.remove('hidden');
    }
    else {
        document.getElementById('category-wise-plants').classList.remove('hidden');
        document.getElementById('loading').classList.add('hidden');
    }
}
//1 Load And Display Category
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(r => r.json())
        .then(d => displayCategory(d.categories))
}
const displayCategory = (categories) => {
    const parent = document.getElementById('catagory-container');
    parent.innerHTML = '';
    categories.forEach(c => {
        const child = document.createElement('div');
        child.innerHTML = `<button id="category_btn_${c.id}" class="w-full hover:bg-[#15803D] rounded-xl p-1 hover:text-white" onclick="showPlantCategoryWise(${c.id});change(${c.id})">${c.category_name}</button>`
        parent.appendChild(child);
    }
    )
}
loadCategory();

//2 Load Plants Category Wise and Display
const showPlantCategoryWise = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(r => r.json())
        .then(d => displayPlantCategoryWise(d.plants))
    loading(true);
}

const displayPlantCategoryWise = (plants) => {
    const parent = document.getElementById('category-wise-plants');
    parent.innerHTML = '';
    plants.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="space-y-4 bg-white shadow rounded-lg p-4">
                    <img class="w-full h-[220px] rounded-xl" src="${p.image}" alt="">
                    <h1 onclick="showDetails(${p.id})" class="font-bold">${p.name}</h1>
                    <p class="h-28 mb-2">${p.description}</p>
                    <div class="flex justify-between">
                        <button class="btn rounded-3xl bg-[#DCFCE7] text-[#15803D]">${p.category}</button>
                        <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${p.price}</p>
                    </div>
                    <button onclick="addToCartFun(${p.id})" id="addToCart${p.id}" class="btn btn-active btn-success w-full bg-[#15803D] rounded-3xl text-white">Add to Cart</button>
                </div>`
        parent.appendChild(div);

    }
    )
    loading(false);
}

//3 Load All Plants  Display
const showAllPlantCategoryWise = () => {
    const url = `https://openapi.programming-hero.com/api/plants`
    fetch(url)
        .then(r => r.json())
        .then(d => displayAllPlantCategoryWise(d.plants))
}

const displayAllPlantCategoryWise = (plants) => {
    const parent = document.getElementById('category-wise-plants');
    parent.innerHTML = '';
    plants.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="space-y-4 bg-white shadow rounded-lg p-4">
                    <img class="w-full h-[220px] rounded-xl" src="${p.image}" alt="">
                    <h1 onclick="showDetails(${p.id})" class="font-bold">${p.name}</h1>
                    <p class="h-28 mb-2">${p.description}</p>
                    <div class="flex justify-between">
                        <button class="btn rounded-3xl bg-[#DCFCE7] text-[#15803D]">${p.category}</button>
                        <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${p.price}</p>
                    </div>
                    <button onclick="addToCartFun(${p.id})" id="addToCart${p.id}" class="btn btn-active btn-success w-full bg-[#15803D] rounded-3xl text-white">Add to Cart</button>
                </div>`
        parent.appendChild(div);

    }
    )
}
showAllPlantCategoryWise();

// 4 ShowDetails Of Each Tree
const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(r => r.json())
        .then(d => displayPlantDetails(d.plants))
}

const displayPlantDetails = (p) => {
    const parent = document.getElementById('wordDetail');
    parent.innerHTML = ""
    const child = document.createElement('div');
    child.innerHTML = `
   <div class="space-y-2 bg-white  rounded-lg p-4">
                    <h1 class="font-bold">${p.name}</h1>
                    <img class="w-full h-[220px] rounded-xl" src="${p.image}" alt="">
                    <p ><span class="font-bold">Category</span> ${p.category}</p>
                    <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${p.price}</p>
                    <p class="h-28">${p.description}</p>
                </div>
   `
    parent.appendChild(child);
    document.getElementById('my_modal_1').showModal()
}
//05 Add to Cart Functionality
const addToCartFun = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then(r => r.json())
        .then(d => {
            cartArray.push(
                {
                    name: d.plants.name,
                    price: d.plants.price
                });
            displayAddToCart(cartArray);
        }
        )
}
const displayAddToCart = (array) => {
    const parent = document.getElementById('cartContainer');
    parent.innerHTML = "";
    let totalMoney = 0
        array.forEach(a => {
            const child = document.createElement('div');
            child.innerHTML = `
        <div class="flex justify-between items-center bg-[#F0FDF4] p-2 mb-2">
                        <div>
                            <h1 class="font-medium">${a.name}</h1>
                            <h1 class="text-gray-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${a.price}</h1>
                        </div>
                        <button class="text-gray-500 bg-[#F0FDF4] "><i class="fa-solid fa-xmark"></i></button>
                    </div>`
            totalMoney = totalMoney+a.price;
            parent.appendChild(child);
        }
        )
       const child2 = document.createElement('h1');
       child2.innerHTML=`<div class="flex justify-end">
       <h1 class="font-bold">Total:<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${totalMoney}</h1>
       </div>`
       parent.appendChild(child2);
}