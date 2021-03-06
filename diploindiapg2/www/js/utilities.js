﻿
// Utility Functions

 var events = (function () {
                var topics = {};
                var hOP = topics.hasOwnProperty;

                return {
                    subscribe: function (topic, listener) {
                        // Create the topic's object if not yet created
                        if (!hOP.call(topics, topic)) topics[topic] = [];

                        // Add the listener to queue
                        var index = topics[topic].push(listener) - 1;

                        // Provide handle back for removal of topic
                        return {
                            remove: function () {
                                delete topics[topic][index];
                            }
                        };
                    },
                    publish: function (topic, info) {
                        // If the topic doesn't exist, or there's no listeners in queue, just leave
                        if (!hOP.call(topics, topic)) return;

                        // Cycle through topics queue, fire!
                        topics[topic].forEach(function (item) {
                            item(info != undefined ? info : {});
                        });
                    }
                };
 })();

 function executeFunctionByName(functionName, context /*, args */) {
     var args = Array.prototype.slice.call(arguments, 2);
     var namespaces = functionName.split(".");
     var func = namespaces.pop();
     for (var i = 0; i < namespaces.length; i++) {
         context = context[namespaces[i]];
     }
     if (context[func]) {
         return context[func].apply(context, args);
     } else {
         return null
     }
    
}


 function parseArray(arrList) {
     var template = "<ul>";
     for (var i = 0; i < arrList.length; i++) {
         template = template + "<li>" + arrList[i].name + "</li>";
     }

     return template + "</ul>";
 }

 function removeFromArray(item,arr) {
     var idx = arr.indexOf(item);
     newArray = arr.splice(idx, 1);
     return newArray;

 }


function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

 function getFileList(dir) {
     var fileExt = ".";
     var arrFiles = [];

     $.get(dir, function (data) {

         $(data).find("a:contains(" + fileExt + ")").each(function () {
             //console.log($(this).text());
             arrFiles.push($(this).text());
         });

     });

     return arrFiles;
 }

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


function getRandomInt(min, max, exclude) {
    var val;
    do {
        val = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (val == exclude);

    return val
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




function getLocalParameterByName(name,strSource) {
    var prefix = name.length + 1 ;
    var regex;
    var results;
    
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
     regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(strSource);
     return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
   
}


function getCleanName(dirtyText){
	var cleanText = dirtyText.replace(" ","_");
	cleanText = cleanText.replace(/[|&;$%@"<>()+,]/g, "");
	return cleanText;
}

function getDisplayName(cleanText){
	var displayText = cleanText.replace("_"," ");
	return displayText;
}

function playAudio(item) {
    console.log("***audio events***");
    console.log(item)
    if (item != null && currentAudio != null && item != currentAudio   ) {
        console.log("stop audio");
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.volume = 1;
       // currentAudio.release()
    }
    if (item != null) {
        console.log("play audio");
        item.play();
        currentAudio = item;
        item.volume = 1;
    }
}

function playAudioBtn(item) {

    // attach to perm btn

    $("#btnPlayAudio").off();
    $("#btnPlayAudio").on("click", function () {
        playAudioBtn(item)
    });

    $("#btnPlayAudio").trigger("click")


}

function fadeAudio(item) {

    //console.log(item.volume)
   // audio.pause();
    //audio.currentTime = 0;
    
   // console.log("fade audio");
    if (item != null && item.paused == false) {
        if (kendo.support.mobileOS.device != "iphone" &&  kendo.support.mobileOS.device != "ipad") {

            if (item.volume > 0.1) {
                item.volume -= 0.05;
                setTimeout(function () { fadeAudio(item) }, 100);
            } else {
                item.pause();
                item.currentTime = 0;
                item.volume = 1;
            }
        } else {
            item.pause();
            item.currentTime = 0;
        }
    }
}

//$(window).on("blur focus", function(e) {
    

//    var prevType = $(this).data("prevType");

//    if (prevType != e.type) {   
//        switch (e.type) {
//            case "blur":
//                if (currentAudio != null) {
//                    currentAudio.pause();
//                }
//                break;

//            case "focus":
//                if (currentAudio != null) {
//                    currentAudio.play();
//                }
//                break;
//        }
//    }

//    $(this).data("prevType", e.type);

//})

// pause audio on window visibility change
function handleVisibilityChange() {
    if (currentAudio != undefined && currentAudio != null) {
        if (document.hidden) {
            currentAudio.pause();
        } else {
            currentAudio.play();
        }
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);


function onDeviceReady() {
  // alert("device ready");
   
            if (checkSimulator() == false && window.screen.orientation.lock) {

            console.log("locking");
            screen.orientation.lock('landscape');
            console.log("landscape lock");
                console.log(screen.orientation.type);
               
              //  bootstrap();
           // alert(screen.orientation.type)
        } else {
//alert("no screen orientation")

        }
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
   // alert("device ready")
}
function onPause() {
   
    currentAudio.pause();
}
function onResume() {
   
    currentAudio.play();
}


function isIPX11() {

    var ratio = window.devicePixelRatio || 1;
    var screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
    };

    

    var osver = kendo.support.mobileOS.flatVersion;
    var os = kendo.support.mobileOS.name;
    var dev = kendo.support.mobileOS.device;
    var sh = kendo.support.screenWidth;
    console.log(screen.width + "  " + screen.height);

    var ipx = false;
    // iPhone X Detection
    var h = document.documentElement.clientHeight;
    //alert("h: " + h);
    if (os == "ios" && (screen.width == 1125 && screen.height === 2436 || screen.width == 960 && screen.height == 1704)) {
        var h = document.documentElement.clientHeight;
      // alert("iphone x detected");
        ipx = true;
    } else {
       
       // alert(screen.width + "  " + screen.height)
    }
   // alert(sh);
    // alert(osver + "  " + os + "  " + dev)
   // chg chk to <11.4
    if (osver >= 1100 && osver < 1200 && os == "ios" && dev == "iphone" && ipx == true) {
      // alert("iphone x detected");
        return true
       
    } else {
        $("#wedge").remove();
        return false
       // return true
    }

}

function stopBodyScrollingnew() {
    var firstMove;

    window.addEventListener('touchstart', function (e) {
        firstMove = true;
    });

    window.addEventListener('touchmove', function (e) {
        if (firstMove) {
            e.preventDefault();

            firstMove = false;
        }
    });

}

function stopBodyScrolling(bool) {
    if (bool === true) {
        document.body.addEventListener("touchmove", freezeVp, false);
        $(".km-view").on("touchmove", function () { freezeVp });
        $(".km-content").on("touchmove", function () { freezeVp });
        $(".dis-fact").on("touchmove", function () { freezeVp });
    } else {
        document.body.removeEventListener("touchmove", freezeVp, false);
    }
}


var freezeVp = function (e) {
    e.preventDefault();
};

