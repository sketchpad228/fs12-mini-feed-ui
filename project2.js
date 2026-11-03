// -- DOM section ---

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

let li = document.createElement("li")
li.textContent = "buy groceries"
li.classList.add("todo-item")
console.dir(li)
toDoList.appendChild(li)

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
let addBtn = document.querySelector(".addBtn");
console.dir(input, addBtn);

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

let addItem = () => {
	let li = document.createElement("li");
	li.className = "todo-item";
	li.textContent = input.value;
	toDoList.appendChild(li);
	input.value = "";
};

addBtn.addEventListener("click", addItem);

// Press 'Enter' to behave like the 'Add' button
input.addEventListener("keydown", e => {
	if (e.key === "Enter") {
		addItem();
	}
});

/*
	Forms
*/

console.log(document.location.href)

let params = new URLSearchParams(document.location.search)

let fullName = params.get("fullName")
let email = params.get("email")
console.log(fullName, email)

let loginBtn = document.querySelector(".auth-form > button")

loginBtn.addEventListener("click", (e) => {
	//prevents default behaviour (submitting the form)
	e.preventDefault()
	console.log(e.target.form[0], e.target.form[1], e.target.form[2])
})

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

// function getFeed() {
//     console.log("\n--- Full Post Feed Output ---")
//     for (let i = 0; i < postFeed.length; i++) {
//        console.log(postFeed[i]);
//     }
// }

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
