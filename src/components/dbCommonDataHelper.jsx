import {db} from "../db/dbconfig";

 const handlePassData= (e)=> {
    e.preventDefault();
    console.log(this.state, "state");
    db.collection("invoice").doc().set({
            invoice: this.state.invoice,
            invoiceNumber: this.state.invoiceNumber,
            // date:this.state.date,
            address: this.state.address,
            // terms: this.state.terms,
            businessName: this.state.businessName,
            businessNumber: this.state.businessNumber,
            businessAddress: this.state.businessAddress,
            businessPostalCode: this.state.businessPostalCode,
            businessSignature: this.state.businessSignature,
            clientName: this.state.clientName,
            clientNumber: this.state.clientNumber,
            clientAddress: this.state.clientAddress,
            clientPostalCode: this.state.clientPostalCode,
            clientSignature: this.state.clientSignature,
            product: this.state.product,
            qty: this.state.qty,
            rate: this.state.rate,
            unit: this.state.unit,
            vat: this.state.vat
        }
    )
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
};

export default {handlePassData}