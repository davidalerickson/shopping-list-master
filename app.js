//single state object
var state = {
  items: [],

};
//state modification functions
var addItem = function(state, item){
  state.items.push(item);
  //alert(state.items);
};

var deleteItem = function(state, item){
  delete state.items[item];
  //alert(state.items);
};

//render functions
var renderList = function(state, element){
  var itemsHTML =  state.items.map(function(item, index){
    varItemHTMLString = `
    <li>
      <span class="shopping-item" data-list-index="${index}">${item}</span>
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
  //Initialize State;

  //Event Listeners
  $("#js-shopping-list-form").submit(function(event){
    event.preventDefault();
    //alert("was clicked");
    addListItem();
  })

  function addCheckEventToggle(){
    $(".shopping-item-toggle").on('click', function(event){
      //alert("Clicked the check button");
      $(this).parents().siblings(".shopping-item").toggleClass("shopping-item__checked");
    });
  }

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
