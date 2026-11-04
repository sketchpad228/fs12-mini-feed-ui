// -- DOM section ---
const postList = document.querySelector("#post-list")
const resultCount = document.querySelector("#result-count")

let currentPostId = 0;

let postFeed = []

console.log("Project - Mini Feed UI")

console.dir(document)

console.log(window, navigation, navigator, history);

// window.alert("Hello everyone")

// ? Accessing elements
console.dir(document.body.childNodes[1].textContent)

const serviceList = document.querySelector("#service-list")
const statusMessage = document.querySelector("#status-message")
const emptyResults = document.querySelector("#empty-results")

const setStatus = (message, visible = true) => {
	statusMessage.textContent = message
	statusMessage.hidden = !visible
}

const formatDate = value => {
	if (!value) return "Date unavailable"
	const date = new Date(value)
	return Number.isNaN(date.getTime())
		? String(value)
		: date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
}


// ? Access elements using DOM methods

/* 
	? getElementsByTagName
*/

let allAnchorTags = document.getElementsByTagName("a");
console.log(allAnchorTags);

// ? Affecting element by modifying its DOM properties
//Change style of first nav link
allAnchorTags[0].style.color = "black";

/* 
	? getElementById()
*/

let navBar = document.getElementById("nav-bar");
console.dir(navBar);

navBar.classList.add("flex-row", "j-center")

/* 
	? getElementsByClassName()
*/

let navLinks = document.getElementsByClassName("nav-links");
console.log(navLinks);

console.log(document.location.href)

/* 
	? .querySelector()
*/

let FormsUsingCompound = document.querySelector("body > #nav-bar .nav-links:nth-child(3)")
console.log(FormsUsingCompound)

/* 
	? .querySelectorAll()
*/

let navLinksUsingQSA = document.querySelectorAll(".nav-links");
navLinksUsingQSA[0].accessKey = "This is testing the properties in the web console"
console.log(navLinksUsingQSA);

// navLinksUsingQSA.forEach(l => console.dir(l));

/* 
	? Challenge
	* use my loop on nav links
	* modify all of them to display bold text
*/

// Easiest method, better in the sense that less is more
navLinksUsingQSA.forEach(l => (l.style.fontWeight = "bold"));

// More intuitive(?) method
// navLinksUsingQSA.forEach(l => l.innerHTML = `<strong>${l.textContent}</strong>`)

//<em> is italic </em>
navLinksUsingQSA[2].innerHTML = "<em>Forms Lesson</em>";

/* 
	? Creating New Elements Dynamically
*/
// let div = document.createElement("div")

let toDoList = document.querySelector(".todo-list");

let htmlCollection = document.getElementsByClassName("todo-item");
// ? actively updates

let nodeList = document.querySelectorAll(".todo-item");
// ? will update actively but only if it's AFTER all dynamically created elements

// ? HTMLCollection picks up dynamically created element; NodeList doesn't
console.log(htmlCollection, htmlCollection.length, nodeList, nodeList.length);

// for (i of htmlCollection) {
// 	i.style.color = "red"
// }

for (i of nodeList) {
	i.style.color = "blue";
}

console.log(toDoList);
let input = document.querySelector(".input");
// ? the input of input lives in the .value property (displayed in the browser console)
let output = document.querySelector(".output");
let nameOfPoster = document.querySelector(".nameOfPoster")

// input.addEventListener("click", (evt) => {
// 	console.log("The event triggered.")
// 	console.log(evt.target.value)
// 	output.textContent = evt.target.value
// })

// input.addEventListener("keyup", (evt) => {
// 	console.log("The event triggered.")
// 	console.log(evt.target.value)
// 	output.textContent = evt.target.value
// })

// addBtn.addEventListener("click", (e) => {
// 		let li = document.createElement("li");
// 		li.className = "todo-item";
// 		li.textContent = input.value;
// 		toDoList.appendChild(li);
// 		input.value = "";
// })

let params = new URLSearchParams(document.location.search)

let loginBtn = document.querySelector(".auth-form > button");
let logoutBtn = document.querySelector(".auth-form > button");

// let fullName = params.get("fullName")
// let email = params.get("email")
// console.log(fullName, email)

loginBtn.addEventListener("click", (evt) => {
	// prevents default behaviour (submitting the form)
	evt.preventDefault()
	console.log(evt.target.form[0].value, evt.target.form[1].value, evt.target.form[2].value)
	console.log(evt.target.form)
})

let db = [
	{ fullName: "Jackson Gwaltney", email: "jackson@gmail.com", password: "pass1234" },
	{ fullName: "Paul Niemczyk", email: "paul@codecademy.com", password: "ilovepizza777" },
	{ fullName: "Hamza H", email: "hamza@gmail.com", password: "alialiali" },
	{ fullName: "Nader N", email: "nader@gmail.com", password: "laskjflk9834834" },
	{ fullName: "Rachel P", email: "rachel@gmail.com", password: "superCool22" },
	{ fullName: "Andrew Pike", email: "andrew@gmail.com", password: "pikeFIsH90" },
];

let addBtn = document.querySelector(".addBtn");
console.dir(input, addBtn);

function validateEmail(email) {
	if (typeof email !== "string" || email.trim() === "") {
		console.log("Email required");
		return;
	}

	let normalizedEmail = email.trim().toLowerCase();

	return normalizedEmail;
}

function validatePassword(password) {
	if (typeof password !== "string" || password.trim() === "") {
		console.log("Password required");
		return;
	}
	return password;
}

function findUserByEmail(email) {
	return db.find(usr => usr.email.trim().toLowerCase() === email);
}

let currentUser = null

function login(evt) {

	let email = validateEmail(evt.target.form[1].value);
	let password = validatePassword(evt.target.form[2].value);
	console.log(email, password);
	
	if (!email && !password) {
		return;
	}

	let user = findUserByEmail(email);

	if (!user) {
		output.textContent = "User not found";
		return;
	}

	currentUser = user.fullName
	output.textContent = `Logged in as ${user.fullName}`;

	// for (let i = 0; i < postFeed.length; i++) {
    // 	console.log(postFeed[i]);
	// 	db.fullName = postFeed[i].username;
    // }
}

function register(form) {
	let fullName = form[0].value.trim();
	let email = validateEmail(form[1].value);
	let password = validatePassword(form[2].value);

	console.log(fullName, email);

	if (!fullName) {
		output.textContent = "Name required";
		return;
	}

	if (!email || !password) {
		output.textContent = "Email and password required";
		return;
	}

	if (findUserByEmail(email)) {
		output.textContent = "User already exists";
		return;
	}

	db.push({ fullName, email, password });
	output.textContent = "Account created";
	console.log(db);
}

function authenticate(req, db) {
	let foundUser = db.find(usr => usr.email === req.email);
	console.log(foundUser);

	if (!foundUser) {
		console.log("User not found");
		return;
	}

	if (foundUser[0].password !== req.password) {
		console.log("Incorrect password");
		return;
	}

	console.log("Logged in");
}

let isRegistering = false;

loginBtn.addEventListener("click", evt => {
	evt.preventDefault();

	if (isRegistering) {
		register(evt.currentTarget.form);
	} else {
		login(evt);
	}
});

let toggle = document.querySelector(".toggle");

toggle.addEventListener("click", evt => {
	isRegistering = !isRegistering;

	evt.currentTarget.textContent = isRegistering ? "Login" : "Register";
	loginBtn.textContent = isRegistering ? "Register" : "Login";
	evt.currentTarget.form[0].style.display = isRegistering ? "block" : "none";
});

// ----------------- End of DOM section -----------------

// let currentPostId = 0;

// /* So a post is an object? With different elements */

// // createPost(username, content)
// // likePost(postId)

// let postFeed = []
// let delayNumber = -1

// function createPost(username, content)
// {
//     // let stamp = new Date().toISOString()

//     let newPost = {
        
//         id: currentPostId,
//         username: username,
//         content: content,
//         likes: 0,
//         timestamp: Date.now()
//         // timestamp: stamp
//     }

//     console.log(`This is creating post number ${newPost.id}`)
//     postFeed.push(newPost)
//     console.log("Just added:", postFeed[currentPostId]);
//     currentPostId++;
// }

// function likePost(postId) {
//     postFeed[postId].likes++;
//     console.log(`You liked ${postFeed[postId].username}'s post.`)
// }

function getFeed() {
    console.log("\n--- Full Post Feed Output ---")
    for (let i = 0; i < postFeed.length; i++) {
       console.log(postFeed[i]);
    }
}

function createPost(username, content)
{
    let newPost = {
        id: currentPostId,
        username: username,
        content: content,
        likes: 0,
        timestamp: Date.now()
    }

	for (let i = 0; i < postFeed.length; i++) {
		console.log(postFeed[i]);
    }

    console.log(`This is creating post number ${newPost.id}`)
    postFeed.push(newPost)
    console.log("Just added:", postFeed[currentPostId]);
    currentPostId++;

	postList.innerHTML = ""; // Prevents the previous post from duplicating

	postFeed.forEach(post => {
		const card = document.createElement("article")
		card.className = "card"
		card.dataset.searchText = [post.id, post.username, post.content, post.timestamp]
			.join(" ").toLowerCase()

		const name = document.createElement("h3")
		name.textContent = post.username || "Unnamed service"

		const contents = document.createElement("p")
		contents.className = "contents"
		contents.textContent = post.content || "No content."

		const metadata = document.createElement("dl")
		metadata.className = "card-meta"
		const updatedLabel = document.createElement("dt")
		updatedLabel.textContent = "Posted"
		const updatedValue = document.createElement("dd")
		const updatedTime = document.createElement("time")
		updatedTime.dateTime = new Date(post.timestamp).toISOString()
		updatedTime.textContent = formatDate(post.timestamp)
		updatedValue.append(updatedTime)
		metadata.append(updatedLabel, updatedValue)

		card.append(name, content, metadata)
		postList.append(card)
	})

}

// const render = data => {
// 	postList.replaceChildren()
// 	const posts = Array.isArray(data) ? data : []

// 	posts.forEach(service => {
// 		const card = document.createElement("article")
// 		card.className = "card"
// 		card.dataset.searchText = [service.id, service.description, service.updatedAt]
// 			.concat(service.recentIncidentBriefs?.map(issue => `${issue.impact} ${issue.name}`) || [])
// 			.join(" ").toLowerCase()

// 		const name = document.createElement("h3")
// 		name.textContent = service.id || "Unnamed service"

// 		const description = document.createElement("p")
// 		description.className = "card-description"
// 		description.textContent = service.description || "No description available."

// 		const metadata = document.createElement("dl")
// 		metadata.className = "card-meta"
// 		const updatedLabel = document.createElement("dt")
// 		updatedLabel.textContent = "Last updated"
// 		const updatedValue = document.createElement("dd")
// 		const updatedTime = document.createElement("time")
// 		updatedTime.dateTime = service.updatedAt || ""
// 		updatedTime.textContent = formatDate(service.updatedAt)
// 		updatedValue.append(updatedTime)
// 		metadata.append(updatedLabel, updatedValue)

// 		card.append(name, description, metadata)

// 		const incidents = Array.isArray(service.recentIncidentBriefs) ? service.recentIncidentBriefs : []
// 		if (incidents.length) {
// 			const incidentSection = document.createElement("section")
// 			incidentSection.className = "incidents"
// 			incidentSection.setAttribute("aria-label", "Recent incidents")
// 			const incidentHeading = document.createElement("h4")
// 			incidentHeading.className = "incidents-heading"
// 			incidentHeading.textContent = "Recent incidents"
// 			const incidentList = document.createElement("ul")
// 			incidents.forEach(issue => {
// 				const item = document.createElement("li")
// 				item.textContent = `${issue.impact || "Unknown impact"}: ${issue.name || "Unnamed incident"}`
// 				incidentList.append(item)
// 			})
// 			incidentSection.append(incidentHeading, incidentList)
// 			card.append(incidentSection)
// 		}
// 		postList.append(card)
// 	})

// 	setStatus(posts.length ? "" : "No services are currently available.", !posts.length)
// 	updateResults()
// }

const updateResults = () => {
	const term = search.value.trim().toLowerCase()
	const cards = [...document.querySelectorAll(".card")]
	const visibleCards = cards.filter(card => {
		const matches = !term || card.dataset.searchText.includes(term)
		card.hidden = !matches
		return matches
	})

	emptyResults.hidden = cards.length === 0 || visibleCards.length > 0
	// resultCount.textContent = "Hello!"
	resultCount.textContent = term
		? `${visibleCards.length} ${visibleCards.length === 1 ? "service" : "services"} matching “${search.value.trim()}”.`
		: `${visibleCards.length} ${visibleCards.length === 1 ? "service" : "services"} available.`
}



// const getData = async endpoint => {
// 	try {
// 		const response = await fetch(endpoint)
// 		if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
// 		const data = await response.json()
// 		render(data.posts)
// 	} catch (error) {
// 		console.error(error)
// 		postList.replaceChildren()
// 		resultCount.textContent = "Services could not be loaded."
// 		setStatus("We couldn't load service status right now. Please try again later.")
// 	}
// }

// getData(postFeed[0])

// ? This returns a Promise again
// to use it, either use resolvers or throw inside another async function


/* 
	? Challenge
	* parse thru the data and render it using DOM
	* build blocks that display the following:
		* name
		* description
		* updated date
		* recent issues
		! Spicey Mode
		* add an input field
		* as you type, the search removes all irrelevant blocks
*/

// Do I need this?
const search = document.querySelector("#service-search")
search.addEventListener("input", updateResults)
search.form.addEventListener("reset", () => requestAnimationFrame(updateResults))
//

let addItem = () => {
		const content = input.value.trim()
		if (!content) return
		createPost(currentUser || "Anonymous", content);
		input.value = ""
};

addBtn.addEventListener("click", addItem);

// Press 'Enter' to behave like the 'Add' button
input.addEventListener("keydown", e => {
	if (e.key === "Enter") {
		addItem();
	}
});



// function sortByNewest() { //Sort into order of timestamp
//     // in some cases, 2 messages remain displayed in original order because they have the same timestamp,
//     // this is an example of sort stability
//     // but might I want it to default to sorting these two posts by ID if this happens?
//     let sortedFeed = postFeed.toSorted((a, b) => (b.timestamp - a.timestamp) || (b.id - a.id))
//     //I've added the OR operator (||) so it defaults to sorting by ID when this happens.
//     //I've done the same for the sortByLikes method too.
    
 
//     console.log("\n--- Posts in descending order of timestamp ---")
//     console.log(sortedFeed);
// }

// function delay()
// {

// }

// function sortByLikes() { //Sort into order of likes
//     const sortedFeed = postFeed.toSorted((a, b) => (b.likes - a.likes) || (b.id - a.id))
//     console.log("\n--- Posts in descending order of likes---")
//     // for (let i = 0; i < postFeed.length; i++) {
//     //    console.log(postFeed[i]);
//     // }
//     console.log(sortedFeed);
// }

// function getPostsByUser(username)
// {
//     console.log(`\n--- Posts sent by ${username} ---`);
//     for (let i = 0; i < postFeed.length; i++) {            
//         if(postFeed[i].username == username)console.log(postFeed[i]);
//     }
// }

// function delay()
// {
//     console.log("Calling new post function...")
// }

// // --- Methods called ---

// createPost("Homer", "D'oh!");
// // getFeed(delayNumber);
// likePost(0);
// likePost(0);

// createPost("Monty", "Excellent!");
// // getFeed(delayNumber);
// likePost(0);
// likePost(1);

// createPost("Bart", "Ay Carumba!");
// // getFeed(delayNumber);
// createPost("Lisa", "Splendid!");
// // getFeed(delayNumber);
// createPost("Maggie", "(suck)(suck)(suck)");
// // getFeed(delayNumber);
// createPost("Bart", "Do the Bartman!");
// // getFeed(delayNumber);
// createPost("Homér", "Le d'oh!");
// // getFeed(delayNumber);
// likePost(0);
// likePost(1);
// likePost(1);
// likePost(1);
// likePost(1);
// likePost(1);
// likePost(1);
// likePost(1);
// getFeed();
// sortByNewest();
// sortByLikes();
// getFeed();
// getPostsByUser("Homer")
// getPostsByUser("Monty")
// getPostsByUser("Bart")
// getPostsByUser("Homér")
