//single state object
var state = {
  items: [],
};
//state modification functions
var addItem = function(state, item){
  state.items.push({itemName: item, checkState: "checked"});
  //alert(state.items[0].checkState);
};

var deleteItem = function(state, item){
  delete state.items[item];
};

//render functions
var renderList = function(state, element){
  var itemsHTML =  state.items.map(function(item, index){
    var ItemClasses = "";
    if(item.checkState === 1){
      ItemClasses = "shopping-item shopping-item__checked";
    }else{
      ItemClasses = "shopping-item";
    }
    varItemHTMLString = `
    <li>
      <span class="${ItemClasses}" data-list-index="${index}">${item.itemName}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`

    return varItemHTMLString;
  });
  element.html(itemsHTML);
}


$(function(){

  //Event Listeners
  //Add Item Button
  $("#js-shopping-list-form").submit(function(event){
    event.preventDefault();
    //alert("was clicked");
    addListItem();
  })
  //Check-Uncheck List Item
  function addCheckEventToggle(){
    $(".shopping-item-toggle").on('click', function(event){
      var itemToToggle = $(this).parents().siblings(".shopping-item").attr("data-list-index");
      $(this).parents().siblings(".shopping-item").toggleClass("shopping-item__checked");
      updateListItem(itemToToggle);
    });
  }
  ///Delete Button
  function addDeleteEvents(){
    $(".shopping-item-delete").on('click', function(event){
      var listItemToDelete =
      $(this).parents().siblings(".shopping-item").attr("data-list-index");
      deleteListItem(listItemToDelete);
    });
  }

  function addListItem(){
    addItem(state, $("#shopping-list-entry").val());
    updateHTMLFromState();
  }

  function updateListItem(itemToToggle){
    if(state.items[itemToToggle].checkState === 1){
      state.items[itemToToggle].checkState = 0;
    }else{
      state.items[itemToToggle].checkState = 1;
    }
  }

  function deleteListItem(listItemToDelete){
    deleteItem(state, listItemToDelete);
    updateHTMLFromState();
  }

  function updateHTMLFromState(){
    renderList(state, $(".shopping-list"));
    addCheckEventToggle();
    addDeleteEvents();
    clearAndSetInputFocus();
  }

  function clearAndSetInputFocus(){
    $("#shopping-list-entry").val("");
    $("#shopping-list-entry").focus();
  }

})
