/*
 
Copyright 2018 Trygve Loken (trygloken@protonmail.com)
 
Licensed under the Copyfree Open Innovation License.
 https://copyfree.org/content/standard/licenses/coil/license.txt

 */

a_callback = function (result){
    //console.log("qrcode.callback called result = "+result);
    document.getElementById("readout").innerHTML = result;
    var form = document.forms['qrForm'];
    form.elements['msg'].value = result;
    var t = form.elements['t'].value;
    var e = form.elements['e'].value;
    var m = form.elements['m'].value;
    var mb = form.elements['mb'].value;
    document.getElementById('qr').innerHTML =
    create_gqrcode(result, t, e, m, mb);
}

function decodetheimage(img, cb) {
    //console.log("function decodetheimage(img) { ...");
    if (+img.nodeType > 0 && !img.src)
        throw new Error('The ImageElement must contain a src');
    //console.log("img.nodeType: "+img.nodeType);
    //console.log("img.src: "+img.src);
    img = img.src ? img.src : img;
    
    //return (qrcode.decode(img), this);
    qrcode.decode(img, cb);
}


function previewFile() {
    var preview = document.querySelector('#imgin');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
    var img = document.querySelector('#imgin');
    img.onload = function(){
        decodetheimage(img, a_callback);
    }
    
}

/*kazuhikoarase*/
//'qrcode' has been replaced with 'gqrcode'
window.onload = function(){
    var crtOpt = function(value, label) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(label) );
        opt.value = value;
        return opt;
    };
    
    var t = document.forms['qrForm'].elements['t'];
    t.appendChild(crtOpt('' + 0, 'Auto Detect') );
    for (var i = 1; i <= 40; i += 1) {
        t.appendChild(crtOpt('' + i, '' + i) );
    }
    t.value = '0';
    
    update_gqrcode();
};

var draw_gqrcode = function(text, typeNumber, errorCorrectionLevel) {
    document.write(create_gqrcode(text, typeNumber, errorCorrectionLevel) );
};

var create_gqrcode = function(text, typeNumber,
                             errorCorrectionLevel, mode, mb) {
    
    gqrcode.stringToBytes = gqrcode.stringToBytesFuncs[mb];
    
    var qr = gqrcode(typeNumber || 4, errorCorrectionLevel || 'M');
    qr.addData(text, mode);
    qr.make();
    
    //  return qr.createTableTag();
    //  return qr.createSvgTag();
    
    //return qr.createImgTag();
    //return qr.createImgTag(4);
    return qr.createImgTag(8);
};

var update_gqrcode = function() {
    var form = document.forms['qrForm'];
    var text = form.elements['msg'].value.
    replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
    var t = form.elements['t'].value;
    var e = form.elements['e'].value;
    var m = form.elements['m'].value;
    var mb = form.elements['mb'].value;
    document.getElementById('qr').innerHTML =
    create_gqrcode(text, t, e, m, mb);
};




