sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        versipuede: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onDYNA_IDPress: function(oEvent) {
            var oControlFuente = oEvent.getSource();
            var sValorDelCampo;
            if (oControlFuente.getText) {
                sValorDelCampo = oControlFuente.getText();
            } 
            // Si el control es sap.m.Input, sap.m.DatePicker, etc.
            else if (oControlFuente.getValue) {
                sValorDelCampo = oControlFuente.getValue();
            }
            alert(sValorDelCampo);
        },
        onFIELD_IDPress: function(oEvent) {
            alert("APRETO FIELD_ID");
        }


    }
});
