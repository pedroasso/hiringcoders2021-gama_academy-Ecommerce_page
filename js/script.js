/* Product Manipulation */
const formProduct = document.getElementById("product_form");
if (formProduct != null) {
	formProduct.addEventListener("submit", (event) => {
		event.preventDefault();

		let barcode = document.getElementById("barcode").value;
		let description = document.getElementById("description").value;
		let extra_description = document.getElementById("extra_description").value;
		let category = document.getElementById("category");
		category = category.options[category.selectedIndex].text;
		let price = document.getElementById("price").value;
		let amount = document.getElementById("amount").value;

		if (barcode == '' || description == '' || extra_description == '' || category == '' || price == '' || amount == '') {
			returnMessage('warning', 'Ops, é necessário preencher todos os campos');
			return;
		}

		let product = {
			barcode: barcode,
			description: description,
			extra_description: extra_description,
			category: category,
			price: price,
			amount: amount
		};

		storeOnLocalStorage('products', product);
		returnMessage('success', "Produto cadastrado com sucesso");

		cleanField('barcode');
		cleanField('description');
		cleanField('extra_description');
		cleanField('price');
		cleanField('amount');

	});
}

function displayProducts() {
	let products = JSON.parse(localStorage.getItem('products'));

	if(products) {
		const [{description, extra_description, category, price}] = products;
		products.map((product) => {

			let cardElement = document.createElement('div');
			let parentDiv = document.getElementById('card-area')
			cardElement.className = "card";

			let descriptionElement = document.createElement('h2');
			let textDescription = document.createTextNode(product.description);
			descriptionElement.appendChild(textDescription);

			let extraDescriptionElement = document.createElement('h4');
			let textExtraDescription = document.createTextNode(product.extra_description);
			extraDescriptionElement.appendChild(textExtraDescription);

			let categoryElement = document.createElement('h4');
			let textCategry = document.createTextNode(`Categoria: ${product.category}`);
			categoryElement.appendChild(textCategry);

			let priceElement = document.createElement('h1');
			let textPrice = document.createTextNode(`R$ ${product.price}`);
			priceElement.appendChild(textPrice);

			cardElement.appendChild(descriptionElement)
			cardElement.appendChild(extraDescriptionElement)
			cardElement.appendChild(categoryElement)
			cardElement.appendChild(priceElement)

			parentDiv.appendChild(cardElement)
		});
	} else {
		returnMessage('info', 'Não há nenhum produto cadastrado no momento.')
	}
}


/* Client Manipulation */
const formClient = document.getElementById("client_form");
if (formClient != null) {
	formClient.addEventListener("submit", (event) => {
		event.preventDefault();

		let fullname = document.getElementById("fullname").value;
		let age = document.getElementById("age").value;
		let city = document.getElementById("city").value;
		let uf = document.getElementById("uf").value;
		let street = document.getElementById("street").value;
		let cep = document.getElementById("cep").value;

		if (fullname == '' || age == '' || city == '' || uf == '' || street == '' || cep == '') {
			returnMessage('warning', 'Ops, é necessário preencher todos os campos');
			return;
		}

		let client = {
			fullname: fullname,
			age: age,
			city: city,
			uf: uf,
			street: street,
			cep: cep
		};

		storeOnLocalStorage('clients', client);
		returnMessage('success', "Cliente cadastrado com sucesso");

		cleanField('fullname');
		cleanField('age');
		cleanField('city');
		cleanField('uf');
		cleanField('street');
		cleanField('cep');

	});
}

function displayClients() {
	let clients = JSON.parse(localStorage.getItem('clients'));

	if(clients) {
		const [{ fullname, age, city, uf, cep }] = clients;
		clients.map((client) => {

			let cardElement = document.createElement('div');
			let parentDiv = document.getElementById('card-area')
			cardElement.className = "card";

			let nameElement = document.createElement('h2');
			let txtName = document.createTextNode(client.fullname);
			nameElement.appendChild(txtName);

			let ageElement = document.createElement('h3');
			let txtAge = document.createTextNode(`Idade: ${client.age} anos`);
			ageElement.appendChild(txtAge);

			let cityElement = document.createElement('h4');
			let txtCity = document.createTextNode(`Cidade: ${client.city}`);
			cityElement.appendChild(txtCity);

			let ufElement = document.createElement('h3');
			let txtUf = document.createTextNode(`Estado: ${client.uf}`);
			ufElement.appendChild(txtUf);

			let cepElement = document.createElement('h3');
			let txtCEP = document.createTextNode(`CEP: ${client.cep}`);
			cepElement.appendChild(txtCEP);

			cardElement.appendChild(nameElement)
			cardElement.appendChild(ageElement)
			cardElement.appendChild(cityElement)
			cardElement.appendChild(ufElement)
			cardElement.appendChild(cepElement)

			parentDiv.appendChild(cardElement)
		});
	} else {
		returnMessage('info', 'Não há nenhum cliente cadastrado no momento.')
	}
}


/* General Functions */

function storeOnLocalStorage(key, value) {
	let data = JSON.parse(localStorage.getItem(key));

	if (data) {
		data.push(value);
	} else {
		data = [ value ];
	}
	localStorage.setItem(key ,JSON.stringify(data));
}


function cleanField(fieldName) {
	document.getElementById(fieldName).value = '';
}

function redirect(location) {
	window.location.href=`../pages/${location}.html`
}

function returnMessage(tipo, msg) {
	Swal.fire({
		position: 'center',
		icon: tipo,
		title: '',
		text: msg,
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true
	} );
}