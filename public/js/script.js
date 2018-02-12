const fetchItems = async(event) => {
  event.preventDefault()

  const initialFetch = await fetch('/api/v1/stuff')
  const fetchResponse = await initialFetch.json()

  fetchResponse.stuff.forEach(item => {
    $('.list-of-stuff').append(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <h3>${item.cleanliness}</h3>
      </div>
    </div>`)
  })
  countItems(fetchResponse.stuff)
}

const countItems = (itemsArray) => {
  
}

const toggelItemInfo = () => {
  if($(event.target).hasClass('name')){
    $(event.target).next().toggleClass('hidden')
  }
}

const postNewItem = async() => {
  event.preventDefault()
  let itemName = $('.name-input').val()
  let itemCleanliness = $('.cleanliness-selector').val()
  let itemReason = $('.reason-input').val()
  const postItem = await fetch('/api/v1/stuff', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: itemName,
      reason_for_linger: itemReason,
      cleanliness: itemCleanliness
    })
  })
  const postResponse = await postItem.json()
  $('.list-of-stuff').append(`
    <div id=${postResponse.id}>
      <h2 class='name'>${itemName}</h2>
      <div class='item-info hidden'>
        <h3>${itemReason}</h3>
        <h3>${itemCleanliness}</h3>
      </div>
    </div>`)
}

const sortItemsAlphabetically = async() => {
  const initialFetch = await fetch('/api/v1/stuff')
  const stuffResponse = await initialFetch.json()
  const sortedItems= await stuffResponse.stuff.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name> b.name) return 1;
    return 0;
  })
  $('.list-of-stuff').children().remove()

  sortedItems.forEach(item => {
    $('.list-of-stuff').append(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <h3>${item.cleanliness}</h3>
      </div>
    </div>`)
  })
}

const sortItemsBackwards = async() => {
  const initialFetch = await fetch('/api/v1/stuff')
  const stuffResponse = await initialFetch.json()
  const sortedItems= await stuffResponse.stuff.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name> b.name) return 1;
    return 0;
  })
  $('.list-of-stuff').children().remove()

  sortedItems.forEach(item => {
    $('.list-of-stuff').prepend(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <h3>${item.cleanliness}</h3>
      </div>
    </div>`)
  })
}





$('.list-of-stuff').on('click', toggelItemInfo)
$(window).on('load', fetchItems)
$('.post-btn').on('click', postNewItem)
$('.sort-alph').on('click', sortItemsAlphabetically)
$('.sort-back').on('click', sortItemsBackwards)


