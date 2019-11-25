import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';

class MyInvoiceData extends React.Component {
    passMyInvoiceData = (values) => {

        let el = {...values};
        console.error(el);
        db.collection("myCompData").doc("myCompanyDataRecord").set(el)
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    };


    render() {

        return (
            <div className={"myInvoiceData"}>
                <h1>Moje dane:</h1>
                <Formik
                    initialValues={{
                        businessName: '',
                        businessNumber: '',
                        businessAddress: "",
                        businessCity: "",
                        businessPostalCode: "",
                        businessSignature: "",
                        businessBankAccountNum: ""
                    }}


                    validate={values => {
                        let errors = {};
                        if (!values.businessName) {
                            errors.businessName = 'Proszę wpisac imię';
                        }
                        if (!values.businessNumber) {
                            errors.businessNumber = 'Required';
                        } else if (!/^[0-9]{10}$/g.test(values.businessNumber)) {
                            errors.businessNumber = 'Niepoprawny NIP';
                        }

                        if (!values.businessAddress) {
                            errors.businessAddress = 'Required';
                        } else if (values.businessAddress.length < 5) {
                            errors.businessAddress = 'Adres musi zawierać więcej niż 5 znaków';
                        }
                        if (!values.businessCity) {
                            errors.businessCity = 'Required';
                        } else if (values.businessCity.length < 1) {
                            errors.businessCity = 'Prosze wpisac nazwę miasta';
                        }

                        if (!values.businessPostalCode) {
                            errors.businessPostalCode = 'Required';
                        } else if (!/^[0-9]{2}-[0-9]{3}$/g.test(values.businessPostalCode)) {
                            errors.businessPostalCode = 'Nieprawidłowy kod pocztowy';
                        }
                        if (!values.businessBankAccountNum) {
                            errors.businessBankAccountNum = 'Required';
                        } else if (!/^[0-9]{26}$/g.test(values.businessBankAccountNum)) {
                            errors.businessBankAccountNum = 'Nice try!';
                        }

                        if (!values.businessSignature) {
                            errors.businessSignature = 'Required';
                        } else if (!/^[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}\s[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}$/ig.test(values.businessSignature)) {
                            errors.businessSignature = 'Proszę pwisać Imię i Nazwisko';
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
                            setSubmitting(false);


                        }, 400);

                        // console.log(' submitting', values)

                    }
                    }
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={'myDataInput'}>
                                <label>Nazwa Firmy:<input
                                    type="text"
                                    name="businessName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.businessName}
                                    placeholder={"twoja nazwa"}
                                /></label>
                                {errors.businessName && touched.businessName && errors.businessName}
                            </div>
                            <div className={'myDataInput'}>
                                <label>NIP:
                                    <input
                                        type="text"
                                        name="businessNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.businessNumber}
                                        placeholder={"000 000 00 00"}
                                    /></label>
                                {errors.businessNumber && touched.businessNumber && errors.businessNumber}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Adres:
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.businessAddress}
                                        placeholder={"ulica nr m"}
                                    /></label>
                                {errors.businessAddress && touched.businessAddress && errors.businessAddress}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Miasto:
                                    <input
                                        type="text"
                                        name="businessCity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.businessCity}
                                        placeholder={"miasto"}
                                    /></label>
                                {errors.businessCity && touched.businessCity && errors.businessCity}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Kod Pocztowy: <input
                                    type="text"
                                    name="businessPostalCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.businessPostalCode}
                                    placeholder={"00-123"}
                                /></label>
                                {errors.businessPostalCode && touched.businessPostalCode && errors.businessPostalCode}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Podpis:
                                    <input
                                        type="text"
                                        name="businessSignature"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.businessSignature}
                                        placeholder={"imię nazwisko"}
                                    /></label>


                                <span style={{
                                    color: "red",
                                    fontWeight: "bold"
                                }}> {errors.businessSignature && touched.businessSignature && errors.businessSignature}</span>

                            </div>
                            <div className={'myDataInput'}>
                                <label>Numer konta:<input
                                    type="text"
                                    name="businessBankAccountNum"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.businessBankAccountNum}
                                    placeholder={"numer konta"}
                                /></label>
                                {errors.businessBankAccountNum && touched.businessBankAccountNum && errors.businessBankAccountNum}
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


export default MyInvoiceData