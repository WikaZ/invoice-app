import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik} from 'formik';

const MyInvoiceData = () => (
    <div className={"myInvoiceData"}>
        <h1>Moje dane:</h1>
        <Formik
            initialValues={{
                businessName: '',
                businessNumber: '',
                businessAddress: "",
                businessPostalCode: "",
                businessSignature: ""
            }}


            validate={values => {
                let errors = {};
                if (!values.businessName) {
                    errors.businessName = 'Proszę wpisac imię';
                }
                if (!values.businessNumber) {
                    errors.businessNumber = 'Required';
                } else if (!/^[0-9]{1,}\/|-[0-9]{1,}$/g.test(values.businessNumber)) {
                    errors.businessNumber = 'Invalid business number address';
                }

                if (!values.businessAddress) {
                    errors.businessAddress = 'Required';
                } else if (values.businessAddress.length < 5) {
                    errors.businessAddress = 'Must be 5 characters or more';
                }

                if (!values.businessPostalCode) {
                    errors.businessPostalCode = 'Required';
                } else if (!/^[0-9]{2}-[0-9]{3}$/g.test(values.businessPostalCode)) {
                    errors.businessPostalCode = 'Nieprawidłowy kod pocztowy';
                }

                if (!values.businessSignature) {
                    errors.businessSignature = 'Required';
                } else if (!/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/ig.test(values.businessSignature)) {
                    errors.businessSignature = 'Proszę pwisać Imię i Nazwisko';
                }
                return errors;
            }
            }

            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
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
                    <label>Nazwa Firmy:<input
                        type="text"
                        name="businessName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.businessName}
                    /></label>
                    {errors.businessName && touched.businessName && errors.businessName}
                    <label>NIP:
                        <input
                            type="text"
                            name="businessNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.businessNumber}
                        /></label>
                    {errors.businessNumber && touched.businessNumber && errors.businessNumber}
                    <label>Adres:
                        <input
                            type="text"
                            name="businessAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.businessAddress}
                        /></label>
                    {errors.businessAddress && touched.businessAddress && errors.businessAddress}
                    <label>Kod Pocztowy: <input
                        type="text"
                        name="businessPostalCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.businessPostalCode}
                    /></label>
                    {errors.businessPostalCode && touched.businessPostalCode && errors.businessPostalCode}
                    <label>Podpis:
                        <input
                            type="text"
                            name="businessSignature"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.businessSignature}
                        /></label>
                    {errors.businessSignature && touched.businessSignature && errors.businessSignature}

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
);
// class MyInvoiceData extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             businessName: "",
//             businessNumber: "",
//             businessAddress: "",
//             businessPostalCode: "",
//             businessSignature: "",
//             errors: {
//
//                 businessName: "",
//                 businessNumber: "",
//                 businessAddress: "",
//                 businessPostalCode: "",
//                 businessSignature: ""
//             }
//         }
//     }
//
//     handleGetMyData = (e) => {
//         e.preventDefault();
//         this.setState={
//             [e.target.name]: e.currentTarget.value
//         }
//
//     };
//
//     render() {
//         return (
//             <>
//                 <div className={"myInvoiceData"}>
//                     <div className={'myInvoiceDataHeader'}>
//                         <p> MOJE DANE</p>
//                     </div>
//                     <form action="" onSubmit={this.handleGetMyData}>
//                         <label>Nazwa firmy: <input type="text" placeholder={"Nazwa"}
//                                                    value={this.state.businessName} name={"businessName"}/></label>
//                         <label>NIP: <input type="text" placeholder={""} value={this.state.businessNumber}
//                                            name={"businessNumber"}/></label>
//                         <label>Adres: <input type="text" placeholder={"000-000-00-00"}
//                                              value={this.state.businessAddress} name={"businessAddress"}/></label>
//                         <label>Kod pocztowy: <input type="text" placeholder={"00-000"}
//                                                     value={this.state.businessPostalCode} name={"businessPostalCode"}/></label>
//                         <label>Podpis: <input type="text" placeholder={""}
//                                               value={this.state.businessSignature} name={"businessSignature"}/></label>
//                         <input type="sumit" value={"ZAPISZ"}/>
//                     </form>
//                 </div>
//             </>
//         )
//     }
//
// }

export default MyInvoiceData