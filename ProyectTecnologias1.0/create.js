firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   
var storage = firebase.storage();
var user = firebase.auth().currentUser;
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("foimg");
var foto="";

fileButton.addEventListener('change', function (e) {
  // File or Blob named mountains.jpg
  var file = e.target.files[0];

  // Create the file metadata
  var metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var storageRef = firebase.storage().ref('fotos/' + file.name);
  var uploadTask = storageRef.put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        foto = downloadURL;
        console.log('la foto ', foto);
      });
    });

});

document.querySelector("#submitBtn").addEventListener("click", function () {

  let postTitle = document.querySelector("#postTitle").value;
  let postContent = document.querySelector("#postContent").value;
  let link = document.getElementById("link").value;
  let img = foto;
  console.log("foto cargada "+img);
  if (
    
    postTitle === "" ||
    postContent === ""
  ) {
    alert("Fields Empty");
  } else {
   
      db.collection("posts").doc().set({
        author: user.displayName,        
        postName: postTitle,
        img: img,
        link: link,
        postContent: postContent
        
        
      });
   
      document.getElementById('publ').innerHTML = `<P>Publicacion Exitosa `  + `<P> <button  class="btn btn-primary rounded-pill" onclick="location.href='blog.html'">Ir Al Blog</button>` + '<p>';
  }
});
           
    } 
});