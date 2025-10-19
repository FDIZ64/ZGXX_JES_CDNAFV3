sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        versipuede: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onColumnPress: function(oEvent) {
            alert("AAAAAAAAAAAA");
        },
        onBreakoutColumnPress: function(oEvent) {
            alert("COLUMNS RESS");
        }


    }
});
