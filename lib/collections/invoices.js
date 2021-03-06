Invoices = new Mongo.Collection('invoices');

var Schemas = {};

Schemas.Invoice = new SimpleSchema({
  OPCO: {
    type: String,
    label: 'OPCO'
  },
  vendorNumber: {
    type: String,
    label: "Vendor Number",
    min: 7,
    max: 7
  },
  vendorName: {
    type: String,
    label: "Vendor Name",
    autoValue: function() {
      var vendorName = this.field('vendorName');
      if (this.isInsert) {
        return vendorName.value.substring(0,22);
      }
    }
  },
  invoiceDate: {
    type: String,
    label: "Invoice Date",
    autoValue: function() {
      var invoiceDate = this.field('invoiceDate');
      if (this.isInsert) {
        return moment(invoiceDate).format('DDMMYYYY');
      }
    }
  },
  department: {
    type: Number,
    label: "Department",
    max: 999
  },
  manufacturer: {
    type: Number,
    //optional: true,
    label: "Manufacturer",
    max: 974, // Currently, the highest manufacturer number is 974. Change this to accommodate more.
    autoValue: function() {
      // default mfg. number should be 974.
      var defaultManufacturer = 974;
      var manufacturer = this.field('manufacturer');
      if (this.isInsert) {
        if (manufacturer.isSet) {
          return manufacturer.value;
        } else {
          return defaultManufacturer;
        }
      }
    }
  },
  transactionCode: {
    type: Number,
    label: "Transaction Code",
    autoValue: function() {
      var transactionCode = this.field('transactionCode');
      if (this.isInsert) {
        if (transactionCode.isSet) {
          return parseInt(transactionCode.value.substr(0,3));
        } else {
          this.unset(); // Prevent user from entering their own value
        }
      } else if (this.isUpdate) {
        return (transactionCode.value);
      }
    }
  },
  source: {
    type: String,
    label: "Source"
  },
  invoiceNumber: {
    type: String,
    label: "Invoice Number",
    min: 5,
    max: 20
  },
  PO : {
    type: String,
    label: "PO"
  },
  BOL: {
    type: String,
    label: "BOL"
  },
  urn : {
    type: String,
    label: "URN",
    optional: true
  },
  headerDescription: {
    type: String,
    optional: true
  },
  //lines: {
  //  type: [Object],
  //  minCount: 1 // Require at least one invoice line
  //},
  //"lines.$.invoiceLineNumber": {
  //  type: Number
  //},
  //"lines.$.store": {
  //  type: Number,
  //  min: 5000,
  //  max: 9999
  //},
  //"lines.$.class": {
  //  type: String,
  //  optional: true
  //},
  //"lines.$.unitCost": {
  //  type: Number,
  //  decimal: true
  //},
  //"lines.$.lineRetailCost": {
  //  type: Number,
  //  decimal: true
  //},
  //"lines.$.quantity": {
  //  type: Number
  //},
  //"lines.$.style": {
  //  type: String,
  //  optional: true
  //},
  //"lines.$.sku": {
  //  type: String,
  //  optional: true
  //},
  //"lines.$.description": {
  //  type: String,
  //  optional: true
  //},
  glAccount: {
    type: String,
    optional: true
  },
  totalCost: {
    type: Number,
    decimal: true,
    optional: true
  },
  retailCost: {
    type: Number,
    decimal: true,
    optional: true
  },
  totalQuantity: {
    type: Number,
    optional: true
  },
  /********************** History Tracking Properties **********************/
  submitted: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  userId: {
    type: String,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    optional: true
  },
  pending: {
    type: Boolean,
    optional: true
  },
  approved: {
    type: Boolean,
    optional: true
  },
  approvedBy: {
    type: String,
    optional: true
  },
  approvedDate: {
    type: Date,
    optional: true
  },
  rejected: {
    type: Boolean,
    optional: true
  },
  rejectedBy: {
    type: String,
    optional: true
  },
  exported: {
    type: Boolean,
    optional: true
  },
  exportedDate: {
    type: Date,
    optional: true
  }
});

// Attach the schema
Invoices.attachSchema(Schemas.Invoice);

Meteor.methods({
  insertInvoice: function(invoiceAttributes) {
    console.log("method called...");
    check(Meteor.userId(), String);

    //Check for duplicate invoice
    console.log("the invoiceNumber is: " + invoiceAttributes.invoiceNumber);
    var duplicateInvoice = Invoices.findOne({
      invoiceNumber: invoiceAttributes.invoiceNumber});
    if (duplicateInvoice) {
      return {
        invoiceExists: true,
        _id: duplicateInvoice._id
      }
    }

    var user = Meteor.user();
    console.log("about to insert the invoice");
    var invoice = _.extend(invoiceAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date()
    });

    var invoiceId = Invoices.insert(invoice);
    console.log("this is the invoiceId: " + invoiceId);
    return {
      _id: invoiceId
    };
  },

  deleteInvoice: function(currentInvoiceId) {
    check(Meteor.userId(), String);
    Invoices.remove(currentInvoiceId);
  },
});


Invoices.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  remove: function(userId, doc) {
    // only allow deleting if you are logged in
    return !! userId;
  }
});