/* function acessarDadosPorURl(urlIn, htmlSelector){

    fetch(urlIn).then(recursosPegos => recursosPegos.json()).then(arrayDeObjetos => {
        for(const objeto of arrayDeObjetos){
            htmlSelector.innerHTML+=`<option value="${objeto.id}">${objeto.nome}</option>`
        }
    })

} */

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  /*  const urlParaUFs = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
   */
  //acessarDadosPorURl(urlParaUFs, ufSelect)

  // O professor fez isso aqui, mas conforme o mesmo, é bom aplicar
  // o aproveitamento do código criei uma função para isso está logo acima...
  // Decidir ficar com o que o professor fez...
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  //console.log(event.target.value)

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      if (stateInput.value === "Selecione o Estado") {
        citySelect.disabled = true;
        citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
      } else {
        citySelect.disabled = false;
      }
    });

  /* acessarDadosPorURl(url, citySelect)
    citySelect.disabled = false*/
}

populateUFs();

/* Com isso agente pode debugar no console do navegador */
/* document
    .querySelector("select[name=uf]")
    .addEventListener("change", () => {
        console.log("mudei")
    }) */

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de coletas
//.itens-grid li
const itensToCollect = document.querySelectorAll("div[class=itens-grid] li");

for (let item of itensToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

//array dos itens selecionados
let selectedItens = [];

//[name=itens]
const collectedItems = document.querySelector("input[name=itens]");

function handleSelectedItem(event) {
  /* Função para manuzear os itens, esta função vamos verificar se o item está selecionado ou não 
  e adicionar em uma array para então fazer o envio do formulário com os dados selecionados... */

  //Adicionar ou remover uma classificação no elemento(tag) com javascript
  const itemTagLi = event.target;
  itemTagLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  //Debug para ver o data-id dos elementos(tags)
  //console.log(event.target.dataset.id);

  //Verificar se existem itens selecionados sim ou não
  //Dentro desse metodo "findIndex" ele têm um loop que vai ver cada elemento da array
  //Conforme a lógica abaixo:
  //Se ele for true vai retornar o index(posição) do elemento encontrado
  //Nessa lógica estamos fazendo uma verificação se temos na array "selectedItens" em cada index(posição)
  //algum valor igual ao itemId, se não tivermos o retorno será -1 se tivermos
  //o retorno será igual ao index(posição) da array "selectedItens"
  const alreadySelected = selectedItens.findIndex((item) => {
    return item === itemId;
  });

  //para debugar a variavel alreadySelected e ver a posição do array do item selecionado
  //console.log(alreadySelected);

  //Se já estiver selecionado tire da array
  //Se o elemento encontrado for maior que 0 ou igual
  if (alreadySelected != -1) {
    //console.log("eu existo");

    console.log("Entrei na condição sendo true");
    //Esse metodo "filter" criar sempre uma nova array, ele
    //faz uma filtragem onde se o retorno for false,
    //ele vai tirar dá nova array o elemento false na codinção que foi false...
    //Dentro desse metodo ele tem um loop para cada elemento da array
    const filteredItems = selectedItens.filter((item) => {
      console.log(item);
      console.log(itemId);

      return item != itemId;

      //se retornar false então o metodo filter tirar este elemento na nova array
    });

    selectedItens = filteredItems;
    //console.log(selectedItens);
    //console.log("filtrados" + filteredItems);
  } else {
    //Se não estiver selecionado, vamos colocar ele no array novamente.
    console.log("Entrei na condição sendo false");
    selectedItens.push(itemId);
  }

  console.log(selectedItens);
  collectedItems.value = selectedItens;
}
