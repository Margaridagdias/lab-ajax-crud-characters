const charactersAPI = new APIHandler('http://localhost:8000');
console.log(charactersAPI.BASE_URL)

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((response) => {
      console.log('response from api', response);
      
      const data = response.data;
      let fullCharactersList = '';
      data.forEach(character => {
        console.log(character)
        fullCharactersList += `
        <div class="character-info">
          <div class="name"> ${character.name} </div>
          <div class="occupation"> ${character.occupation} </div>
          <div class="cartoon"> ${character.cartoon} </div>
          <div class="weapon"> ${character.weapon} </div>
      </div> `
     
      })
      document.querySelector('.characters-container').innerHTML = fullCharactersList;

    });
  });


//-------------------------------------------------------------------------------


  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.getElementById('getone').value; 
    charactersAPI.getOneRegister(characterId) 
    .then((response) => {
      
      const character = response.data;
      let oneCharacter = '';

        oneCharacter += `
        <div class="character-id">
          <div class="name"> ${character.name} </div>
          <div class="occupation"> ${character.occupation} </div>
          <div class="cartoon"> ${character.cartoon} </div>
          <div class="weapon"> ${character.weapon} </div>
      </div> `
      document.querySelector('.characters-container').innerHTML = oneCharacter;
  });
});

//-------------------------------------------------------------------------

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.getElementById('deleteone').value; 
    charactersAPI.deleteOneRegister(characterId)
   
    });
  

   //----------------------------------------------------------------------------
   document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    
        let id = document.getElementById('edit-id').value 
        let name = document.getElementById('edit-name').value 
        let occupation= document.getElementById('edit-occupation').value 
        let weapon = document.getElementById('edit-weapon').value
        let cartoon = document.getElementById('edit-cartoon').checked
        
        const editCharacter = {
          id,
          name,
          occupation,
          weapon,
          cartoon
        }

        charactersAPI.updateOneRegister(id, editCharacter)
        .then(response => {
          console.log(response.data)
        });
      });
        
        


  //--------------------------------------------------------------------------------


  document.getElementById('new-character-form').addEventListener('submit', function (event) {
   
    event.preventDefault();
    
    let name = document.getElementById('new-name').value;
    let occupation = document.getElementById('new-occupation').value;
    let weapon = document.getElementById('new-weapon').value;
    let cartoon = document.getElementById('new-cartoon').checked;

    const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon
    }
    console.log(newCharacter)
        charactersAPI.createOneRegister(newCharacter)
      .then(response => {
        console.log(response.data)
      })
      
    });
  })
