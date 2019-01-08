var wb = "";
var username = "";
var waddress = "";


function getDetails() {
        ipcRenderer.send('wballance','sendit1');
        ipcRenderer.on('wballance', (event, arg) => {
                document.getElementById("totalBalance").innerHTML = arg;
        });

        ipcRenderer.send('waddress','sendit2');
        ipcRenderer.on('waddress', (event,arg) => {
                document.getElementById("Waddress").innerHTML = arg;
        });
}


// console.log("Received: " + ipcRenderer.sendSync('wballance', 'send'));

// ipcRenderer.on('wballance', (event,arg) => {
//         document.getElementById("totalBalance").innerHTML = arg;
//         console.log(arg);
// });

