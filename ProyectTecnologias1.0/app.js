// Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyCibyu4pb3Ldp8mj1n6Wi8y7lM76LPssxM",
    authDomain: "login-b328c.firebaseapp.com",
    projectId: "login-b328c",
    storageBucket: "gs://login-b328c.appspot.com",
    messagingSenderId: "136457534820",
    appId: "1:136457534820:web:f640bcb9a8479ccc338e71",
    measurementId: "G-DTEQ21EP3J"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let postCollection = document.querySelector("#posts-collection");
  
  const db = firebase.firestore();
  
  function createPost(title, time, content) {
    let div = document.createElement("div");
    div.setAttribute("class", "col-md-12");
  
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let small = document.createElement("small");
  
    h2.textContent = title;
    small.textContent = time;
    p.textContent = content;
  
    div.appendChild(h2);
    div.appendChild(small);
    div.appendChild(p);
  
    postCollection.appendChild(div);
  }
  
  // Get Posts
  function getPosts() {
    db.collection("posts")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(docs => {
          createPost(
            docs.data().postName,
            docs.data().createdAt,
            docs.data().postContent
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  getPosts();