var form=document.getElementById('addForm');
var itemList=document.getElementById('items');
var filter=document.getElementById('filter');
//form submit event
form.addEventListener('submit',addItem);

//remove event
itemList.addEventListener('click',removeItem);
//filter events
filter.addEventListener('keyup',filterItems);
//add item
function addItem(e)
{
    e.preventDefault();       
    //add input value
    var newItem=document.getElementById('item').value;
    //create new li element
    var li=document.createElement('li');
    //add class
    li.className='list-group-item';
    //add text node with input value
    li.appendChild(document.createTextNode(newItem));
    //create del btn element
    var deleteBtn=document.createElement('button');
    //add classes to del btn
    deleteBtn.className='btn btn-danger btn-sm float-right delete';
    //append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    //append  btn to li
    li.appendChild(deleteBtn);
    //append li to list
    itemList.appendChild(li);
}


//remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('are you sure?')){
            var li=e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

function filterItems(e){
    var text=e.target.value.toLowerCase();
    var items=itemList.getElementsByTagName('li');
     Array.from(items).forEach(function(item){
        var itemName=item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text)!=-1){
            item.style.display='block';

        }
        else{
            item.style.display='none'; 
        }
    }); 
     
 }