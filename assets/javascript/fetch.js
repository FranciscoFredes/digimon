function crearTabla() {
  fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${item.img}" class="table-img"></td>
          <td>${item.name}</td>
          <td>${item.level}</td>
        `;
        const tableImg = row.querySelector('.table-img');
        if (tableImg) {
          tableImg.addEventListener('mouseenter', (event) => {
            event.target.style.maxWidth = '10rem';
            event.target.style.maxHeight = '10rem';
          });
          tableImg.addEventListener('mouseleave', (event) => {
            event.target.style.maxWidth = '5rem';
            event.target.style.maxHeight = '5rem';
          });
        }
        row.addEventListener('mouseenter', () => {
          row.classList.add('table-hover-row');
        });
        row.addEventListener('mouseleave', () => {
          row.classList.remove('table-hover-row');
        });
        document.querySelector('tbody').appendChild(row);
      });
    })
    .then(() => {
      const tableImages = document.querySelectorAll('.table-img');
      tableImages.forEach(image => {
        image.style.maxWidth = '5rem';
        image.style.maxHeight = '5rem';
        image.style.fontSize = '2rem';
      });
    });
}
crearTabla();
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const navbarBrand = document.querySelector('.navbar-brand');
navbarBrand.addEventListener('click', () => {
  document.querySelector('#digimon-card-container').innerHTML = '';
  document.querySelector('#digimon-table').style.display = 'table';
});
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const digimonName = searchInput.value;
  fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimonName}`)
    .then(response => response.json())
    .then(data => {
      const digimon = data[0];
      document.querySelector('#digimon-table').style.display = 'none';
      createDigimonCard(digimon);
    })
    .catch(error => console.error(error));
});

function createDigimonCard(digimon) {
  const card = document.createElement('div');
  card.classList.add('card','mx-auto');
  card.style.width = '18rem';

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = digimon.img;
  image.alt = digimon.name;
  card.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const name = document.createElement('h5');
  name.classList.add('card-title');
  name.textContent = digimon.name;
  cardBody.appendChild(name);

  const level = document.createElement('p');
  level.classList.add('card-text');
  level.textContent = `Nivel: ${digimon.level}`;
  cardBody.appendChild(level);

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = digimon.desc;
  cardBody.appendChild(description);

  const container = document.querySelector('#digimon-card-container');
  container.innerHTML = '';
  container.appendChild(card);
}



