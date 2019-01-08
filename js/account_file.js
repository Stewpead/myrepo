
var x = document.getElementById('completedFiles');
x.style.display = "none"

document.getElementById('activeFiles').style.display = "block";

function toggleSidebar()
{
    document.getElementById("sidebar").classList.toggle('active');
}
function hideAF() {
        document.getElementById("activeFiles").style.display = "block";
        document.getElementById("completedFiles").style.display = "none";
}
function hideCF() {
        document.getElementById("activeFiles").style.display = "none";
        document.getElementById("completedFiles").style.display = "block";
}
    document.getElementById('DDetails').style.display = "block";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "none";

function viewDD() {
    document.getElementById('DDetails').style.display = "block";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "none";
}

function viewDFiles() {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "block";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "none";
}

function viewDPeers() {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "block";
    document.getElementById("DSpeed").style.display = "none";
}

function viewDspeed() {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "block";
}
// var fdata;
// function row3(fdata) {
// console.log(fdata);
// }


// $( function() {
//     $( document ).tooltip();
//   } );

// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
//   })
// function navBar() {
//     var x = document.getElementById("navigationBar");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }
// function openSignup() {
//     const { ipcRenderer } = require('electron'); 
//     ipcRenderer.send('signupWindow','signupWindow.html'); 
// }

// function copyAddress() {

//     var copyText = document.getElementById("Waddress");
  
//     copyText.select();
  
//     document.execCommand("copy");
  
//     alert("Copied the text: " + copyText.value);
//   }

//   $(document).ready(function () {

//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });

// });

// $(document).ready(function () {

//     $("#sidebar").mCustomScrollbar({
//          theme: "minimal"
//     });

//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });

// });



