// -- DOM section ---
console.log("Script loaded.")

let db = [
	{ fullName: "Jackson Gwaltney", email: "jackson@gmail.com", password: "pass1234" },
	{ fullName: "Paul Niemczyk", email: "paul@codecademy.com", password: "ilovepizza777" },
	{ fullName: "Hamza H", email: "hamza@gmail.com", password: "alialiali" },
	{ fullName: "Nader N", email: "nader@gmail.com", password: "laskjflk9834834" },
	{ fullName: "Rachel P", email: "rachel@gmail.com", password: "superCool22" },
	{ fullName: "Andrew Pike", email: "andrew@gmail.com", password: "pikeFIsH90" },
];

let currentPostId = 0;

let postFeed = []

console.log("Project - Mini Feed UI")

console.dir(document)

console.log(window, navigation, navigator, history);

// window.alert("Hello everyone")

// ? Accessing elements
console.dir(document.body.childNodes[1].textContent)

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

const postList = document.querySelector("#post-list")
const resultCount = document.querySelector("#result-count")

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

let params = new URLSearchParams(document.location.search)

let loginBtn = document.querySelector(".auth-form > button")
let logoutBtn = document.querySelector(".auth-form > button")
let byNewest = document.querySelector("#order-by-newest")
let byLikes = document.querySelector("#order-by-likes")
let postsByUsername = document.querySelector("#get-posts-by-username")

loginBtn.addEventListener("click", (evt) => {
	// prevents default behaviour (submitting the form)
	evt.preventDefault()
	console.log(evt.target.form[0].value, evt.target.form[1].value)
	console.log(evt.target.form)
})

byNewest.addEventListener("click", sortByNewest);
byLikes.addEventListener("click", sortByLikes);
postsByUsername.addEventListener("click", getPostsByUser);

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
	console.log(email);
	
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

function getFeed() {
    console.log("\n--- Full Post Feed Output ---")
    for (let i = 0; i < postFeed.length; i++) {
       console.log(postFeed[i]);
    }
}

const updateResults = () => {
	const term = search.value.trim().toLowerCase()
	const cards = [...document.querySelectorAll(".card")]
	const visibleCards = cards.filter(card => {
		const matches = !term || card.dataset.searchText.includes(term)
		card.hidden = !matches
		return matches
	})

	emptyResults.hidden = cards.length === 0 || visibleCards.length > 0
	resultCount.textContent = term
		? `${visibleCards.length} ${visibleCards.length === 1 ? "service" : "services"} matching “${search.value.trim()}”.`
		: `${visibleCards.length} ${visibleCards.length === 1 ? "service" : "services"} available.`

	console.log("\n--- Full Post Feed Output ---")
    for (let i = 0; i < postFeed.length; i++) {
       console.log(postFeed[i]);
    }
}

const search = document.querySelector("#service-search")
search.addEventListener("input", updateResults)
search.form.addEventListener("reset", () => requestAnimationFrame(updateResults))

let addItem = () => {
	const content = input.value.trim()
	if (!content) return
	createPost(currentUser || "Anonymous", content)
	input.value = ""
};

addBtn.addEventListener("click", addItem);

// Press 'Enter' to behave like the 'Add' button
input.addEventListener("keydown", e => {
	if (e.key === "Enter") {
		addItem();
	}
});

function createPost(username, content)
{
    let newPost = {
        id: currentPostId,
        username: username,
        content: content,
        likes: 0,
        timestamp: Date.now()
    }

    console.log(`This is creating post number ${newPost.id}`)
    postFeed.push(newPost)
    console.log("Just added:", postFeed[currentPostId]);
    currentPostId++;

	renderPosts(postFeed)
}

function renderPosts(posts) {
	postList.replaceChildren()

	console.log("Type of posts: ", typeof posts);
	console.log("Is posts an array?", Array.isArray(posts));
	console.log("Actual posts payload:", posts);

	const postsArray = Array.isArray(posts) ? posts : Object.values(posts);

	postsArray.forEach(post => {
		const card = document.createElement("article")
		card.className = "card"
		card.dataset.searchText = [post.id, post.username, post.content, post.timestamp]
			.join(" ").toLowerCase()

		const name = document.createElement("h3")
		name.textContent = post.username

		const contents = document.createElement("p")
		contents.className = "contents"
		contents.textContent = post.content || "No content."

		const likeButton = document.createElement("button")
		likeButton.addEventListener("click", function likePost() {
			postFeed[post.id].likes++;
    		console.log(`You liked ${postFeed[post.id].username}'s post.`)
			renderPosts(posts)	
		})

		const amountOfLikes = document.createElement("p")
		amountOfLikes.textContent = post.likes

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

		card.append(name, contents, likeButton, amountOfLikes, metadata)
		postList.append(card)
	})
	console.log("\n--- Full Post Feed Output ---")
	for (let i = 0; i < postFeed.length; i++) {
       console.log(postFeed[i]);
    }
}

function sortByNewest() { //Sort into order of timestamp
	
	console.log("\n--- Posts in descending order of timestamp ---")
    // console.log(postFeed)
	console.dir("'Sort by Newest' button clicked.")

	const sortedFeed = renderPosts(postFeed.toSorted((a, b) => (b.timestamp - a.timestamp) || (b.id - a.id)))

	// in some cases, 2 messages remain displayed in original order because they have the same timestamp,
    // this is an example of sort stability
    // but might I want it to default to sorting these two posts by ID if this happens?
 
       console.log(sortedFeed);

    //I've added the OR operator (||) so it defaults to sorting by ID when this happens.
    //I've done the same for the sortByLikes method too.

}	

function sortByLikes() 
{ //Sort into order of likes
    const sortedFeed = renderPosts(postFeed.toSorted((a, b) => (b.likes - a.likes) || (b.id - a.id)))
    console.log("\n--- Posts in descending order of likes---")
    // for (let i = 0; i < sortedFeed.length; i++) {
       console.log(sortedFeed);
    // }
    // console.log(sortedFeed);
}

function getPostsByUser()
{
    console.log(`\n--- Posts sent by ${currentUser} ---`);

	const userPosts = postFeed.filter(post => post.username === currentUser);
   
	userPosts.forEach(post => console.log(post));
	renderPosts(userPosts);
}
