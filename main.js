/*
 
Copyright 2018 KippleBits LLC (kipplebits@gmail.com, www.kipplebits.net)
 
Licensed under version 0.5 of the Copyfree Open Innovation License.

## Terms and Conditions

Redistributions, modified or unmodified, in whole or in part, must retain
applicable copyright or other legal privilege notices, these conditions, and
the following license terms and disclaimer.  Subject to these conditions, the
holder(s) of copyright or other legal privileges, author(s) or assembler(s),
and contributors of this work hereby grant to any person who obtains a copy of
this work in any form:

1. Permission to reproduce, modify, distribute, publish, sell, sublicense, use,
and/or otherwise deal in the licensed material without restriction.

2. A perpetual, worldwide, non-exclusive, royalty-free, irrevocable patent
license to reproduce, modify, distribute, publish, sell, use, and/or otherwise
deal in the licensed material without restriction, for any and all patents:

a. Held by each such holder of copyright or other legal privilege, author
or assembler, or contributor, necessarily infringed by the contributions
alone or by combination with the work, of that privilege holder, author or
assembler, or contributor.

b. Necessarily infringed by the work at the time that holder of copyright
or other privilege, author or assembler, or contributor made any
contribution to the work.

NO WARRANTY OF ANY KIND IS IMPLIED BY, OR SHOULD BE INFERRED FROM, THIS LICENSE
OR THE ACT OF DISTRIBUTION UNDER THE TERMS OF THIS LICENSE, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
AND NONINFRINGEMENT.  IN NO EVENT SHALL THE AUTHORS, ASSEMBLERS, OR HOLDERS OF
COPYRIGHT OR OTHER LEGAL PRIVILEGE BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN ACTION OF CONTRACT, TORT, OR OTHERWISE ARISING FROM, OUT
OF, OR IN CONNECTION WITH THE WORK OR THE USE OF OR OTHER DEALINGS IN THE WORK.

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




