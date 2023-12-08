
let { ipcRenderer } = require("electron")



if(document.getElementById("signupthing")!=undefined){
let form = document.getElementById("signupthing")

form.addEventListener("submit", async (e) => {
  e.preventDefault()


 
  if(document.getElementById("signupcat").value == "artist"){


var email = document.getElementById("emailartist").value;
var first = document.getElementById("firstartist").value;
var last = document.getElementById("lastartist").value;
var date = document.getElementById("birthdayartist").value;
var link = document.getElementById("scartist").value;

let line = "INSERT INTO ARTIST (Email, Birthday, Fname, Lname) VALUES ('" + email + "', STR_TO_DATE('" + date + "','%m-%d-%Y'),'" + first + "', '" + last + "')";
query(line)


let line2 = "INSERT INTO ARTIST_SC (Email, Link) VALUES ('" + email + "', '" + link + "')";
query(line2)


  }else{

  var email = document.getElementById("emailprod").value;
  var alias = document.getElementById("aliasprod").value;
  var daw = document.getElementById("dawprod").value;
  var date = document.getElementById("birthdayprod").value;
  var link = document.getElementById("scprod").value;


  let line = "INSERT INTO PRODUCER (Email, Birthday, Daw, Alias) VALUES ('" + email + "', STR_TO_DATE('" + date + "','%m-%d-%Y'),'" + daw + "', '" + alias + "')";
query(line)



  let line2 = "INSERT INTO PRODUCER_SC (Email, Link) VALUES ('" + email + "', '" + link + "')";
query(line2)

  
 }
  

})


}else{

let form2 = document.getElementById("subtrack")

form2.addEventListener("submit", async (e) => {
  e.preventDefault()





  var email = document.getElementById("emailthing").value;
  var name = document.getElementById("namething").value;
  var key = document.getElementById("keything").value;
  var bpm = document.getElementById("bpmthing").value;
  var genre = document.getElementById("genretrack").value;
  var genre2 = document.getElementById("genretrack2").value;
  var link = document.getElementById("previewer").innerHTML.split("</iframe>")[0] + "</iframe>";
  var track_id = Math.floor(Math.random()*10000000000);
  alert("1")
  let line = "INSERT INTO INSTRUMENTAL (Track_id, Name, Length, Bpm, Song_key, Prod_email) VALUES ('" + track_id + "', '" + name + "', " + 0 + ", " + bpm + ", '" + key + "', '" + email + "')";

  query(line);

  alert("2")
    let line2 = "INSERT INTO INSTRUMENTAL_SC (Track_id, Link) VALUES ('" + track_id + "', '" + link + "')";
    alert("3")
query(line2)


  let line3 = "INSERT INTO INSRUMENTAL_GENRES (Track_id, Genre) VALUES ('" + track_id + "', '" + genre + "')";

query(line3)


  if(genre2 != "Select"){
    alert("AIGHT")
    let line4 = "INSERT INTO INSRUMENTAL_GENRES (Track_id, Genre) VALUES ('" + track_id + "', '" + genre2 + "')";

query(line4)
  }








  
})















}


function query(ele) {
  return new Promise((resolve, reject) => {
    ipcRenderer.invoke("console", ele)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}




async function getProd(){
  var track_id = document.getElementById("songthingy").innerHTML;
  let line = "SELECT PSC.Link, P.Email, TSC.Link AS Art FROM PRODUCER_SC AS PSC, PRODUCER AS P, INSTRUMENTAL AS T, INSTRUMENTAL_SC AS TSC WHERE P.Email = T.Prod_email AND P.Email = PSC.Email AND TSC.Track_id = '" + track_id + "';"
  var response = await query(line);

    alert("EMAIL: " + response[0].Email + "   /   TRACK: " + response[0].Art + "   /   PRODUCER: " + response[0].Link);
    return response 



}



