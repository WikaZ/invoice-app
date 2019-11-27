import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';

class AddClientForm extends React.Component {
    constructor(props) {
        super(props);
        // this.fileInput = React.createRef();

    }

    passMyInvoiceData = (values) => {

        let el = {...values};
        console.error(el);
        db.collection("clients").doc(values.clientNumber).set(el)
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    };



    render() {

        return (
            <div className={"addClientForm"}>
                <h1>Moje dane:</h1>
                <Formik
                    initialValues={{
                        clientName: '',
                        clientNumber: '',
                        clientAddress: "",
                        clientCity: "",
                        clientPostalCode: "",
                        clientSignature: "ko muu",

                    }}


                    validate={values => {
                        let errors = {};
                        if (!values.clientName) {
                            errors.clientName = 'Proszę wpisac imię';
                        }

                        if (!values.clientNumber) {
                            errors.clientNumber = 'Required';
                        } else if (!/^[0-9]{10}$/g.test(values.clientNumber)) {
                            errors.clientNumber = 'Niepoprawny NIP';
                        }

                        if (!values.clientAddress) {
                            errors.clientAddress = 'Required';
                        } else if (values.clientAddress.length < 5) {
                            errors.clientAddress = 'Adres musi zawierać więcej niż 5 znaków';
                        }
                        if (!values.clientCity) {
                            errors.clientCity = 'Required';
                        } else if (values.clientCity.length < 1) {
                            errors.clientCity = 'Prosze wpisac nazwę miasta';
                        }

                        if (!values.clientPostalCode) {
                            errors.clientPostalCode = 'Required';
                        } else if (!/^[0-9]{2}-[0-9]{3}$/g.test(values.clientPostalCode)) {
                            errors.clientPostalCode = 'Nieprawidłowy kod pocztowy';
                        }

                        if (!values.clientSignature) {
                            errors.clientSignature = 'Required';
                        } else if (!/^[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}\s[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}$/ig.test(values.clientSignature)) {
                            errors.clientSignature = 'Proszę pwisać Imię i Nazwisko klienta';
                        }
                        console.log(errors, "errors");

                        return errors;


                    }

                    }

                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {

                            alert(JSON.stringify(values, null, 2));
                            console.log(values, "values in onsubmit");
                            console.log(Object.keys(values), "keys");
                            Object.values(values).forEach((el) => {
                                console.log(el, "obj value");
                            })
                            this.passMyInvoiceData(values);
                            this.props.handleTogglePopup();
                            setSubmitting(false);


                        }, 400);

                    }
                    }
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          onImageChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={'myDataInput'}>
                                <label>Nazwa Firmy:<input
                                    type="text"
                                    name="clientName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.clientName}
                                    placeholder={"twoja nazwa"}
                                /></label>
                                {errors.clientName && touched.clientName && errors.clientName}
                            </div>
                            <div className={'myDataInput'}>
                                <label>NIP:
                                    <input
                                        type="text"
                                        name="clientNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.clientNumber}
                                        placeholder={"000 000 00 00"}
                                    /></label>
                                {errors.clientNumber && touched.clientNumber && errors.clientNumber}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Adres:
                                    <input
                                        type="text"
                                        name="clientAddress"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.clientAddress}
                                        placeholder={"ulica nr m"}
                                    /></label>
                                {errors.clientAddress && touched.clientAddress && errors.clientAddress}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Miasto:
                                    <input
                                        type="text"
                                        name="clientCity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.clientCity}
                                        placeholder={"miasto"}
                                    /></label>
                                {errors.clientCity && touched.clientCity && errors.clientCity}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Kod Pocztowy: <input
                                    type="text"
                                    name="clientPostalCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.clientPostalCode}
                                    placeholder={"00-123"}
                                /></label>
                                {errors.clientPostalCode && touched.clientPostalCode && errors.clientPostalCode}
                            </div>

                            <div className={'myDataInput'}>
                                <label>Podpis:
                                    <input
                                        type="text"
                                        name="clientSignature"
                                        onChange={onImageChange}
                                        onBlur={handleBlur}
                                        value={values.clientSignature}
                                        placeholder={"imię nazwisko"}
                                    /></label>


                                <span style={{
                                    color: "red",
                                    fontWeight: "bold"
                                }}> {errors.clientSignature && touched.clientSignature && errors.clientSignature}</span>

                            </div>

                            <div className={'myInvoiceDataSubmit'}>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>


                        </form>

                    )}


                </Formik>
            </div>
        )
    }

}


export default AddClientForm