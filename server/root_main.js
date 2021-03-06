//var fs = Npm.require('fs');
//__ROOT_APP_PATH__ = fs.realpathSync('.');
////var exportDir = '/Users/Ben/Desktop/ciu_sync_test.dat1';
//var exportDir = '/Users/Ben/Desktop/ciu_test.dat1';
//// console.log(__ROOT_APP_PATH__);
//
///*************************** Helper Functions *******************************/
//
///*
//* All dollar amounts need to be made positive because all amount are
//* prepended by the sign of the of amount and 'n' zeros. For example, the
//* invoiceAmount field, cannot be more than 11 characters, and if the
//* invoice was for a negative $500.00, would look like: 00000050000, and
//* then a separate field preceding it for the sign. So that combined value
//* would be: -00000050000.
//*/
//function ensurePositive(amount) {
//  amount < 0 ? amount = amount *= -1 : amount;
//  return amount;
//}
///*
//Get the invoice lines for a given invoice
//*/
//function getInvoiceLines(invoice_number) {
//   var lines = InvoiceLines.find({invoiceNumber:invoice_number});
//   return lines;
//}
//
///*
//Calculate the total cost of an invoice by summming the lineTotal of
//each invoice line
//*/
//function TotalCost(invoice_number) {
//   var lines = getInvoiceLines(invoice_number).fetch();
//   console.log(lines);
//   var lineValues = _.pluck(lines, 'lineTotal');
//
//   // Convert line values to numbers
//   var lines = _.map(lineValues, function (line) {
//     console.log(parseFloat(line));
//     return parseFloat(line);
//   });
//   console.log("lines = " + lines + " before reduce.")
//   // Sum the array of values
//   var totalCost = lines.reduce(function (previousValue, currentValue) {
//     return currentValue + previousValue;
//   });
//   return totalCost * 100; // Get rid of the decimal points
//};
//// Prepend zeros
//function prependZeros(maxLen, num, recordName) {
//   var mcr = '';
//
//   if (!num) {
//     for (i = 0; i < maxLen; i++) {
//       mcr += '0';
//     }
//   } else {
//
//     var numString = num.toString();
//
//     for (i = 0; i < maxLen - numString.length; i++) {
//       mcr += '0';
//     }
//     mcr += numString;
//   }
//   if (mcr.length > maxLen) { return '\n' + recordName + ' String is too long!\n' + 'maxlength of ' + recordName + ' is ' + maxLen + ' but actual length of ' + mcr + ' is ' + mcr.length + ' _end_message'; }
//   else
//     console.log('length of ' + recordName + ' is ' + mcr.length);
//     return mcr;
//}
//
//// Append spaces
//function appendSpaces(maxLen, num, recordName) {
//   var mcr = '';
//
//   if (!num) {
//     num = '';
//     for (i = 0; i < maxLen; i++) {
//       mcr += ' ';
//     }
//   } else {
//
//     var numString = num.toString();
//
//     for (i = 0; i < maxLen - numString.length; i++) {
//       mcr += ' ';
//     }
//   }
//   if ((mcr + num).length > maxLen) { return recordName + "String is too long!"; }
//
//   console.log('length of ' + recordName + ' is ' + mcr.length);
//   return num + mcr;
//}
//
//// Checks the sign of the invoice; defualts to '+' if no values passed
//function checkInvoiceSign(invoice, total) {
//   if (!invoice || !total) {
//     return '+';
//   } else {
//     if (total > 0) { return '+'; }
//     if (total < 0) { return '-'; }
//   }
//}
//
///***************************** Variables **********************************/
//var invoice = "xwhvYtcnc8Ld9cBGM";
//
//var exportInvoice = Invoices.find({_id: invoice}).fetch();
//var invoiceId = _.pluck(exportInvoice, '_id').toString();
//var invoiceNumber = _.pluck(exportInvoice, 'invoiceNumber');
//console.log("invoiceNumber is " + invoiceNumber + "\n");
//var vendorNumber = _.pluck(exportInvoice, 'vendorNumber');
//// var invoice_num = invoice_num.toString();
//var invoiceAmount = _.pluck(exportInvoice, 'totalCost')*100;
//var source = _.pluck(exportInvoice, 'source');
//var countDetailLines = InvoiceLines.find({invoiceNumber: invoiceNumber[0]}).count();
//console.log("there are " + countDetailLines + " detail lines.");
//var invoiceDate = _.pluck(exportInvoice, 'invoiceDate');
//var headerDescription = _.pluck(exportInvoice, 'description');
//var glAccount = _.pluck(exportInvoice, 'glAccount').toString();
//var PO = _.pluck(exportInvoice, 'PO')
//
//
///*********************** CIU MCR ************************/
//
//// #1 MCR record
//var mcr1 = "MCR";
//
//// #2 Batch Number
//var batchNumber = "BBB";
//var interfaceNumber = "AP208";
//var newDate = moment().format('MMDDYYYYHHMMSS');
//
//var mcr2 = batchNumber + interfaceNumber + newDate;
//
//// #3 Total number of header lines - should always be one for this app.
//// Can be re-written as a function later if we need to do bulk uploads.
//var mcr3 = prependZeros(15, 1, 'mcr3');
//
//// #4 Total number of invoice detail lines
//// Need a function like: InvoiceLines.find({invoiceId: this._id}).count();
//// a
//var mcr4 = prependZeros(15, countDetailLines, 'mcr4' );
//
//// #5 Invoice Amount Position
////  Defaults to 7. This is the field position of the invoice amount in the
////  invoice header record
//var mcr5 = prependZeros(2, 7, 'mcr5');
//
//// #6 Total invoice amount sign;
////  '+' or '-'. Blank = '+'
//var mcr6 = checkInvoiceSign();
//
//// #7 Total of the Invoice Amount column in header record - includes decimal
//// point!
//// TODO: need a function here, or something like:
////  mcr7 = prependZeros(11, this.invoiceAmount*100);
//var mcr7 = prependZeros(11, invoiceAmount,'mcr7');
//
//
//// #8 Source
//// i.e. from Invoice Submission form dropdown: SAKS ME MANUAL INVOICES:
////  var mcr8 = this.source;
//var mcr8 = appendSpaces(30, source, 'mcr8');
//
//var ciu_mcr = mcr1 + mcr2 + mcr3 + mcr4 + mcr5 + mcr6 + mcr7 + mcr8 + '\n';
//
//
///***************************** CIU HEADER ****************************/
//
//// #1 just 'HDR'
//var hdr1 = "HDR";
//
//// #2 Vendor Number
//var hdr2 = prependZeros(10, vendorNumber, 'hdr2');
//
//// #3 Invoice Number
//var hdr3 = appendSpaces(25, invoiceNumber, 'hdr3');
//
//// #4 Voucher number - tells what invoice number that is in the batch of
////  invoices. Will always be '1' for this application (for now).
//var hdr4 = 'BBBAP208' + moment().format('MMDDYYYYHHMMSS') + '00000001';
//
//// #5 Invoice Date
////  i.e. invoiceDate = this.invoiceDate;
//// TODO: need function to get date from current invoice
//var hdr5 = moment().format('DDMMYYYY'); // using moment date as placeholer
//
//// #6 Invoice Sign
//var hdr6 = checkInvoiceSign();
//
//// #7 Total of the Invoice Amount column in header record - includes decimal
//// point!
//// TODO: need a function here, or something like:
//var hdr7 = prependZeros(11, invoiceAmount,'hdr7');
//
//// #8 Transaction Code
//var hdr8 = prependZeros(3,'110','hdr8');
//
//// HDR9 - HDR11 are not required
//var hdr9 = appendSpaces(2, '', 'hdr9');
//var hdr10 = appendSpaces(3, '', 'hdr10');
//var hdr11 = appendSpaces(30, '', 'hdr11');
//
//// #12 Invoice Received date
//var hdr12 = invoiceDate;
//
//// #13 GL_DATE - NOT REQUIRED, LEAVE BLANK
//var hdr13 = appendSpaces(8, '', 'hrd13')// moment().format('DDMMYYYY');
//
//// #14 Invoice Header Description
//var hdr14 = appendSpaces(200, headerDescription, 'hdr14');
//
//// HDR15 - HDR28 not required. Including goods received date and URN to mimic
////  what's on sample file
//// TODO: create variables for at least some of hdr15 - hdr28
//var hdr15_28 = appendSpaces(130, '', 'hdr15_28');
//
//var ciu_hdr = hdr1 + hdr2 + hdr3 + hdr4 + hdr5 + hdr6 + hdr7 + hdr8 + hdr9 +
//hdr10 + hdr11 + hdr12 + hdr13 + hdr14 + hdr15_28 + '\n';
//
//// Write the MCR and HDR records to the file
//fs.writeFileSync('/Users/Ben/Desktop/ciu_sync_test.dat1', ciu_mcr + ciu_hdr);
//
///***************************** DETAIL RECORD *********************************/
//// find all the invoice lines for an invoiceId
//console.log("Starting the invocie line loop!")
//var invoiceLines = InvoiceLines.find({invoiceId: invoiceId}).fetch();
//console.log("invoiceId = " + invoiceId);
//console.log("invoiceLines= " + invoiceLines);
//console.log("invoiceId is string?" + (typeof invoiceId === 'string'));
//toString(invoiceId);
//console.log("invoiceId is string now?" + (typeof invoiceId === 'string'));
//
//for (k = 0; k < invoiceLines.length; k++) {
//   console.log("starting the invoice line loop, with k = " + k);
//   // do some stuff to each invoice line
//   var invoiceLineNumber = invoiceLines[k].invoiceLineNumber;
//   var lineTotal = invoiceLines[k].lineTotal;
//   var quantity = invoiceLines[k].quantity;
//   var unitCost = invoiceLines[k].unitCost;
//   var lineDescription = invoiceLines[k].description;
//
//   console.log("invoiceLineNumber: " + invoiceLineNumber);
//   console.log("lineTotal: " + lineTotal);
//   console.log("quantity: " + quantity);
//   console.log("unitCost: " + unitCost);
//
//
//   // // #1 'DDR'
//   var ddr1 = 'DDR';
//   //
//   // // #2 Vendor Number (same as HDR Vendor Number)
//   var ddr2 = hdr2;
//   //
//   // // #3 Invoice number (same as HDR Invoice Number)
//   var ddr3 = hdr3;
//   //
//   // // #4 Invoice Distribution Line Amount Sign **** NOT REQUIRED ****
//   var ddr4 = checkInvoiceSign();
//   //
//   // // #5 Invoice Distribution Line Amount
//   console.log("lineTotal = " + lineTotal);
//   var ddr5 = prependZeros(11, lineTotal*100, 'ddr5');
//   console.log("for k = " + k + ", ddr5 = " + ddr5);
//
//   /************* GL Account ************/
//   var glAccount = glAccount;
//
//   // Retail amount sign
//   var ddr13 = checkInvoiceSign();
//
//   // Retail amount
//   var ddr14 = prependZeros(11,'','ddr14');
//
//   // Quantity invoiced sign
//   var ddr15 = checkInvoiceSign();
//
//   // Invoiced Quantity
//   var ddr16 = prependZeros(11, quantity.toString(),'ddr15');
//
//   // Unit Cost
//   var ddr17 = prependZeros(11, unitCost*100,'ddr17');
//
//   // Line Description
//   var ddr18 = appendSpaces('200', lineDescription,'ddr18');
//
//   // Last Ship Date
//   var ddr19 = prependZeros(8,'','ddr19');
//
//   // PO#
//   var ddr20 = appendSpaces(20, '','ddr20');
//
//   // PO Cost sign
//   var ddr21 = checkInvoiceSign();
//
//   // PO Cost
//   var ddr22 = prependZeros(11,'','ddr22');
//
//   // Received Quantity sign
//   var ddr23 = checkInvoiceSign();
//
//   // Received Quantity
//   var ddr24 = prependZeros(11,'','ddr24');
//
//   // Start Ship Date
//   var ddr25 = prependZeros('8','','ddr25');
//
//   // Store
//   var ddr26 = prependZeros('4','','ddr26');
//
//   // SKU
//   var ddr27 = prependZeros('8','', 'ddr27');
//
//   // Style
//   var ddr28 = prependZeros('20','', 'ddr28');
//
//   // Class
//   var ddr29 = prependZeros('4','', 'ddr29');
//
//   // Docrec
//   var ddr30 = prependZeros(7,'','ddr30');
//
//   // Ship Date
//   var ddr31 = prependZeros('8','','ddr31');
//
//   // Cancel Date
//   var ddr32 = prependZeros('8','','ddr32');
//
//   //var glAccount = ddr6 + ddr7 + ddr8 + ddr9 + ddr10 + ddr11 + ddr12;
//
//   var ciu_ddr = ddr1 + ddr2 + ddr3 + ddr4 + ddr5 + glAccount + ddr13 +
//   ddr14 + ddr15 + ddr16 + ddr17 + ddr18 + ddr19 + ddr20 +
//   ddr21 + ddr22 + ddr23 + ddr24 + ddr25 + ddr26 + ddr27 +
//   ddr28 + ddr29 + ddr30 + ddr31 + ddr32 + '\n';
//
//   /******************************* EXPORT ******************************/
//   // var ciu_export = ciu_mcr + ciu_hdr + ciu_ddr + ;
//
//
//   fs.appendFileSync(exportDir, ciu_ddr);
//   console.log("i made it to the end when k = " + k);
//}
//fs.appendFileSync(exportDir, 'EOF');
