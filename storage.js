function store(){ //stores items in the localStorage
    var brand = document.getElementById('items').value;
    var key = document.getElementById('key').value; //gets the key from the user

    const itemList = {
        item:item,
    }

    window.localStorage.setItem(key,JSON.stringify(itemList));  
}