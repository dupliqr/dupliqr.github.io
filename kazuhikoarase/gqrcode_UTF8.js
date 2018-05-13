//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript UTF8 Support (optional)
//
// Copyright (c) 2011 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

!function(gqrcode) {

  //---------------------------------------------------------------------
  // overwrite qrcode.stringToBytes
  //---------------------------------------------------------------------

  gqrcode.stringToBytes = gqrcode.stringToBytesFuncs['UTF-8'];

}(gqrcode);
