
	
const firebaseConfig = {
    apiKey: "AIzaSyCIrQHwpBMFP57kKA75RUQtgnQ6REBmEPA",
    authDomain: "madlibs-6db5e.firebaseapp.com",
    projectId: "madlibs-6db5e",
    storageBucket: "madlibs-6db5e.appspot.com",
    messagingSenderId: "529399707262",
    appId: "1:529399707262:web:2338159ce715f1341e0a2f"
  };
  	const app = firebase.initializeApp(firebaseConfig);
  	var db = firebase.firestore();
  	console.log("firebase setup complete!");


function printMadlib() {
var noun = document.getElementById("noun").value;
var adjective = document.getElementById("adjective").value;
var verb = document.getElementById("verb").value;
var verb_2 = document.getElementById("verb_2").value;
var sentence = "<p>" + "The law of inertia; also known as <i>" + noun + "</i> third law of motion is most <i>" + adjective  + "</i> in everyday life. It states that action and reaction are equal and opposite. This means that if an object is <i>" + verb + "</i> against a wall, it will <i>" + verb_2 + "</i> back with an equal force in the opposite direction." + "</p>";
}

function saveMadlib() {
  console.log("saveMadlib() called ");
  var storyData = createMadlib();
db.collection("madlibs").doc(storyData.storyName).set(storyData);
  alet(storyData.storyName + " saved to database");
}

function retriveMadlib() {
  console.log("retriveMadlib() called ");
  var storyName = prompt("Enter the name of the story you want to look up: ");
  db.collection("madlibs")
    .doc(storyName)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var storyData = doc.data();
        document.getElementById("sentence").innerHTML = storyData.story;
      
      } else {
        console.log("No such document!");
        document.getElementById("sentence").innerHTML = "Story not found!";
        
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      document.getElementById("sentence").innerHTML = "Story not found!";
      
    });
}
function editMadlib() {
  console.log( "editMadlib() called ");
  var storyName = prompt("Enter the name of the story you want to edit: ");
  db.collection("madlibs")
    .doc(storyName)
    .get()
    .then((doc) => {
      if (doc.exists)
        console.log("Document data:", doc.data());
        var storyData = doc.data();
        document.getElementById("noun").value = storyData.noun;
        document.getElementById("adjective").value = storyData.adjective;
        document.getElementById("verb").value = storyData.verb;
        document.getElementById("verb_2").value = storyData.verb_2;
        document.getElementById("Namemadlib").value = storyData.Namemadlib;
      
    }
}
function deleteMadlib() {
  console.log("deleteMadlib() called ");
}

  
  document.getElementById("output").innerHTML = sentence;


var sentence = document.getElementById("sentence").innerHTML;
console.log("sentence: " + sentence);

var storyData = {
  timestamp: Date.now(),
  sentence: sentence,
  noun: noun,
  adjective: adjective,
  verb: verb,
  verb_2: verb_2,
  

};

var sentenceJSON = JSON.stringify(storyData);
console.log("sentenceJSON: " + sentenceJSON);
return storyData;

}