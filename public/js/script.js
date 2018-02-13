const fetchItems = async(event) => {
  event.preventDefault()

  const initialFetch = await fetch('/api/v1/stuff')
  const fetchResponse = await initialFetch.json()
  const cleanlinessArray=['Sparkling', 'Dusty', 'Rancid']


  fetchResponse.stuff.forEach(item => {
    const nonselectedCleanliness = cleanlinessArray.filter(cleanType => cleanType !== item.cleanliness)
    $('.list-of-stuff').append(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <select name="text" class='cleanliness-selector'>
          <option value=${item.cleanliness}>${item.cleanliness}</option>
          <option value=${nonselectedCleanliness[0]}>${nonselectedCleanliness[0]}</option>
          <option value=${nonselectedCleanliness[1]}>${nonselectedCleanliness[1]}</option>
        </select>
  
      </div>
    </div>`)
  })
  countItems(fetchResponse.stuff)
}

const countItems = (itemsArray) => {
  $('.item-count').children().remove()
  $('.item-count').append(`<h4>${itemsArray.length}</h4>`)

  const rancidFilter= itemsArray.filter(item => item.cleanliness ==='Rancid')
  $('.rancid-count').children().remove()
  $('.rancid-count').append(`<h4>${rancidFilter.length}</h4>`)

  const dustyFilter= itemsArray.filter(item => item.cleanliness ==='Dusty')
  $('.dusty-count').children().remove()
  $('.dusty-count').append(`<h4>${dustyFilter.length}</h4>`)

  const sparklingFilter= itemsArray.filter(item => item.cleanliness ==='Sparkling')
  $('.sparkling-count').children().remove()
  $('.sparkling-count').append(`<h4>${sparklingFilter.length}</h4>`)
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
  const cleanlinessArray=['Sparkling', 'Dusty', 'Rancid']
  const nonselectedCleanliness = cleanlinessArray.filter(cleanType => cleanType !== itemCleanliness)

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
        <select>
          <option value=${itemCleanliness}>${itemCleanliness}</option>
          <option value=${nonselectedCleanliness[0]}>${nonselectedCleanliness[0]}</option>
          <option value=${nonselectedCleanliness[1]}>${nonselectedCleanliness[1]}</option>
        </select>
  
      </div>
    </div>`)
    const itemsArray = []
    $('.name').each((index, item) => {
      $($(item).next().children()[1]).text()
      const itemObject = 
      {name: $(item).text(),
      cleanliness: $($(item).next().children()[1]).text()}
      itemsArray.push(itemObject)
    })
    $('.reason-input').val('')
    $('.name-input').val('')
    countItems(itemsArray)
}

const sortItemsAlphabetically = async() => {
  const initialFetch = await fetch('/api/v1/stuff')
  const stuffResponse = await initialFetch.json()
  const sortedItems= await stuffResponse.stuff.sort((a, b) => {
    if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if(a.name.toUpperCase()> b.name.toUpperCase()) return 1;
    return 0;
  })
  $('.list-of-stuff').children().remove()

  sortedItems.forEach(item => {
    const cleanlinessArray=['Sparkling', 'Dusty', 'Rancid']
    const nonselectedCleanliness = cleanlinessArray.filter(cleanType => cleanType !== item.cleanliness)

    $('.list-of-stuff').append(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <select name="text" class='cleanliness-selector'>
          <option value=${item.cleanliness}>${item.cleanliness}</option>
          <option value=${nonselectedCleanliness[0]}>${nonselectedCleanliness[0]}</option>
          <option value=${nonselectedCleanliness[1]}>${nonselectedCleanliness[1]}</option>
        </select>
  
      </div>
    </div>`)
  })
}

const sortItemsBackwards = async() => {
  const initialFetch = await fetch('/api/v1/stuff')
  const stuffResponse = await initialFetch.json()
  const sortedItems= await stuffResponse.stuff.sort((a, b) => {
    if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if(a.name.toUpperCase()> b.name.toUpperCase()) return 1;
    return 0;
  })
  $('.list-of-stuff').children().remove()

  sortedItems.forEach(item => {
    const cleanlinessArray=['Sparkling', 'Dusty', 'Rancid']
    const nonselectedCleanliness = cleanlinessArray.filter(cleanType => cleanType !== item.cleanliness)
    $('.list-of-stuff').prepend(`
    <div id=${item.id}>
      <h2 class='name'>${item.name}</h2>
      <div class='item-info hidden'>
        <h3>${item.reason_for_linger}</h3>
        <select name="text" class='cleanliness-selector'>
          <option value=${item.cleanliness}>${item.cleanliness}</option>
          <option value=${nonselectedCleanliness[0]}>${nonselectedCleanliness[0]}</option>
          <option value=${nonselectedCleanliness[1]}>${nonselectedCleanliness[1]}</option>
        </select>
  
      </div>
    </div>`)
  })
}

const openGarage = async() => {
  $('.garage-door').toggleClass('open')
}

const patchItem = async() => {
  if($(event.target).hasClass('cleanliness-selector')){
    const newCleanlinessRating = $(event.target).val()
    const itemId = $(event.target).parent().parent().attr('id')
    console.log(newCleanlinessRating)
    console.log(itemId)

    const postChange = await fetch(`/api/v1/stuff/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cleanliness: newCleanlinessRating 
      })
    })
  }

}





$('.list-of-stuff').on('click', toggelItemInfo)
$(window).on('load', fetchItems)
$('.post-btn').on('click', postNewItem)
$('.sort-alph').on('click', sortItemsAlphabetically)
$('.sort-back').on('click', sortItemsBackwards)
$('.open-btn').on('click', openGarage)
$('.list-of-stuff').on('change', patchItem)


