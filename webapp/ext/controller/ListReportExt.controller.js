sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/ui/unified/FileUploader",
    "sap/m/Button"
], function (MessageToast, Dialog, FileUploader, Button) {
    'use strict';

    return {
        versipuede: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onDYNA_IDPress: function (oEvent) {
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
        onFIELD_IDPress: function (oEvent) {
            alert("APRETO FIELD_ID");
        },
        uploadFile: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        uploadFile2: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
            debugger;
            if (!this._oDialog) {
                // Crear dialog dinámicamente
                this._oDialog = new Dialog({
                    title: "Subir archivo",
                    content: [
                        new FileUploader("fileUploader", {
                            name: "file",
                            width: "100%",
                            change: function (oEvent) {
                                var files = oEvent.getParameter("files");
                                if (files && files.length > 0) {
                                    this._file = files[0];
                                }
                            }.bind(this)
                        })
                    ],
                    beginButton: new Button({
                        text: "Subir",
                        press: function () {
                            this._uploadFile();
                            this._oDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancelar",
                        press: function () { this._oDialog.close(); }.bind(this)
                    })
                });
                this.getView().addDependent(this._oDialog);
            }
            this._oDialog.open();
        },
        _uploadFile: function () {

            if (!this._file) {
                MessageToast.show("Seleccione un archivo primero");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var arrayBuffer = e.target.result;
                var bytes = new Uint8Array(arrayBuffer);
                // Convertir a XSTRING base64
                var binary = btoa(String.fromCharCode.apply(null, bytes));

                var oModel = this.getView().getModel();
                var oEntity = {
                    FILE_ID: "",               // se genera en backend
                    FILENAME: this._file.name, // nombre real
                    MIMETYPE: this._file.type, // tipo MIME
                    CONTENT: binary            // XSTRING
                };

                // Llamada al EntitySet FileSet
                oModel.create("/FileSet", oEntity, {
                    success: function () {
                        MessageToast.show("Archivo subido correctamente");
                    },
                    error: function (err) {
                        console.error(err);
                        MessageToast.show("Error al subir archivo");
                    }
                });
            }.bind(this);

            reader.readAsArrayBuffer(this._file);
        }
    }
});
