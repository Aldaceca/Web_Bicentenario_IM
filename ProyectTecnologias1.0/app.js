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
  firebase.analytics();
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          var db = firebase.firestore();         
          var user = firebase.auth().currentUser;         
                  


             
      } else {
        document.getElementById('crear').href = "index.html";
        document.getElementById('crear').innerHTML = `<P>Iniciar Sesion `;
      }
  });
  
  let postCollection = document.querySelector("#posts-collection");
  
  const db = firebase.firestore();
  
  function createPost(title, imagen,link,autor, content) {
    let div = document.createElement("div");
    div.setAttribute("class", "col-md-12");
  
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let small = document.createElement("a");
    let p2 = document.createElement("p");
    
    h2.textContent = title;
    img.src=imagen;
    p.textContent = content;
    small.textContent = "Linkeding";
    small.href = link;
    p2.textContent = autor;
  
    div.appendChild(h2);    
    div.appendChild(small);
     div.appendChild(p2);
    div.appendChild(p);    
     div.appendChild(img);
     
  
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
            docs.data().img,
            docs.data().link,
            docs.data().author,
            docs.data().postContent
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  getPosts();