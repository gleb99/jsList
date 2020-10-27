  const data = {
  elem1: ['elem1.1','elem1.2','elem1.3', 'elem1.4'],
  elem2: ['elem2.1','elem2.2','elem2.3', 'elem2.4'],
  elem3: ['elem3.1','elem3.2','elem3.3'],
  elem4: ['elem4.1','elem4.2','elem4.3', 'elem4.4'],
  elem5: ['elem5.1','elem5.2','elem5.3', 'elem5.4', 'elem5.5'],
  elem6: ['elem6.1','elem6.2','elem6.3', 'elem6.4'],
  elem1_1: ['elem1.1.1','elem1.1.2','elem1.1.3', 'elem1.1.4'],
  elem2_2: ['elem2.2.1','elem2.2.2','elem2.2.3', 'elem2.2.4'],
  elem6_4: ['elem6.4.1','elem6.4.2','elem6.4.3', 'elem6.4.4']
};

const header = document.querySelector('.headerWrap');
const main = document.querySelector('.mainWrap');
const mainWrap = document.querySelector('.mainWrap');
const mainTag = document.getElementsByTagName('main');
const mobMenu = document.querySelector('.menuImg');
const closeMenuImg = document.querySelector('.closeMenuImg');

let keysArr = Object.keys(data);
let newArr = keysArr.map((item) => {
  if (item.indexOf('_') === -1) {
  const nav = document.createElement('nav');
  nav.className = 'nav desktop';
  nav.innerHTML = item;
  header.append(nav);
  }
});
/*////////////////////////////////////////////////////////desktop*/
header.onmouseover = function(event) {
      const nav = event.target;
      if (nav.className === 'nav desktop') {
        if (document.querySelector('.listItem')){
          while (mainWrap.firstChild) {
            mainWrap.removeChild(mainWrap.firstChild);
          }
        };
        const value = nav.innerHTML;  
        keyList = data[value].map(item => {
          const listItem = document.createElement('div');
          listItem.className = 'listItem';
          listItem.innerHTML = item;
          main.append(listItem);

          subValue = listItem.innerHTML;
          let res = subValue.split('');
          let index = res.findIndex(item => item === '.');
          res.splice(index, 1, '_');
          res = res.join('');
          if (data[res]) {
            let subList = data[res];
            let list = subList.map(subItm => {
              const subListItem = document.createElement('div');
              subListItem.className = 'sublistItem';
              subListItem.innerHTML = subItm;
              listItem.append(subListItem);
            });
          };
      });
    }; 
};
mainWrap.onmouseleave = () =>{
  while (mainWrap.firstChild) {
    mainWrap.removeChild(mainWrap.firstChild);
  };
};
/*////////////////////////////////////////////////////////mobile*/
mobMenu.onclick = () => {
  while (mainWrap.firstChild) {
    mainWrap.removeChild(mainWrap.firstChild);
  };
/////////////////////////////////////////////////render elements
  let newArr = keysArr.map((item) => {
    if (item.indexOf('_') === -1) {
    const mobItem = document.createElement('div');
    mobItem.className = 'mobItem';
    mobItem.innerHTML = item;
    mainWrap.append(mobItem);

    const upArr = document.createElement('img');
    upArr.src = './images/upArr.png'; 
    upArr.className = 'upArr';
    mobItem.append(upArr);

    const downArr = document.createElement('img');
    downArr.src = './images/downArr.png'; 
    downArr.className = 'downArr';
    mobItem.append(downArr);
    downArr.style.display = 'none';
    };
  });
  mobMenu.style.display = 'none';
  closeMenuImg.style.display = 'block';
  mainWrap.style.display = 'block';
};
//////////////////////////menu
closeMenuImg.onclick = () => {
  mobMenu.style.display = 'block';
  closeMenuImg.style.display = 'none';
  mainWrap.style.display = 'none';
};

mainWrap.onclick = (event) => {
  const evt = event.target;

 const actElem = mainWrap.querySelector('.active');

 if (evt.className === 'upArr') {
  evt.parentNode.scrollIntoView(top);
 }
 //////////////////////on the same element click
 if (actElem === evt.parentNode && evt.className === 'downArr' 
 || evt.parentNode.className === 'sublistItem active' && evt.className === 'downArr'){
  if (evt.parentNode.className === 'sublistItem active'){
    // console.log(evt.parentNode.nextSibling);
    evt.parentNode.nextSibling.remove();
    evt.classList.remove('active');
  } else {
    actElem.nextSibling.remove();
    actElem.classList.remove('active');
};
  evt.style.display = 'none';
  evt.previousSibling.style.display = 'block';
  return;
 };
//////////////////////////////on another element click
 if (actElem !== null && actElem !== evt.parentNode && evt.className === 'upArr'
  && evt.parentNode.parentNode.previousSibling.className !== 'mobItem active') {
  actElem.nextSibling.remove();
  actElem.classList.remove('active');
  actElem.lastChild.style.display = 'none';
  actElem.lastChild.previousSibling.style.display = 'block';
  evt.style.display = 'none';
  evt.nextSibling.style.display = 'block';
 };
 ///////////////////////////////////render sublist
 if (evt.className === 'upArr'){
  evt.style.display = 'none';
  evt.nextSibling.style.display = 'block';

  let value = evt.parentNode.innerHTML;
  let res = value.split('<'); 
  let newRes = res[0];
  res = newRes;
  ///////find in data sublist elemX_X
  if (res.indexOf('.') !== -1){
      res = res.split('');
      let index = res.findIndex(item => item === '.');
      res.splice(index, 1, '_');
      res = res.join('');
  }
  if (data[res]) {
      let subList = data[res];
      const sublistWrap = document.createElement('div');
      sublistWrap.className = 'sublistWrap';
      evt.parentNode.after(sublistWrap);
      let list = subList.map(subItm => {
      const subListItem = document.createElement('div');
      subListItem.className = 'sublistItem';
      subListItem.innerHTML = subItm;
      sublistWrap.append(subListItem);
      evt.parentNode.classList.add('active');
      // console.log(subListItem.parentNode.previousSibling.className);
      if (subListItem.parentNode.previousSibling.className === 'sublistItem active'){
        subListItem.classList.add('deepSublistItem');
      }
      ////////////////////////////content check sublist item (adding arr)
      let res = subItm.split('');
      let index = res.findIndex(item => item === '.');
      res.splice(index, 1, '_');
      res = res.join('');
      if (data[res]) {
        const upArr = document.createElement('img');
        upArr.src = './images/upArr.png'; 
        upArr.className = 'upArr';
        subListItem.append(upArr);

        const downArr = document.createElement('img');
        downArr.src = './images/downArr.png'; 
        downArr.className = 'downArr';
        subListItem.append(downArr);
        downArr.style.display = 'none';
      }
    });
   };
  };
};
