import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from "react-bootstrap/Button";

class AddProductForm extends React.Component {
    constructor(props) {
        super(props);


    }

    passMyInvoiceData = (values) => {

        let el = {...values};
        console.error(el);
        db.collection("productList").doc(values.product).set(el)
            .then(function () {
                console.log("Document productLIst successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    };


    render() {

        return (
            <div className={"addProductForm"}>
                <h1>Dane nową usługę:</h1>
                <Formik
                    initialValues={{
                        product: '',
                        productUnit: '',
                        productRate: "",


                    }}


                    validate={values => {
                        let errors = {};
                        if (!values.product) {
                            errors.product = 'Proszę wpisac nazwę usługi';
                        }


                        if (!values.productRate) {
                            errors.rate = 'Prosze wpisać cenę usługi';
                        } else if (!/^[0-9\W]{1,}$/g.test(values.productRate)) {
                            errors.productRate = 'Proszę wpisac poprawną kwotę';
                        }
                        if (!values.productUnit) {
                            errors.productUnit = 'Required';
                        } else if (values.productUnit.length < 1) {
                            errors.productUnit = 'Proszę wpisac jednostkę miary';
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
                            });
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
                                <label>Usługa:<input
                                    type="text"
                                    name="product"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.product}
                                    placeholder={"usługi programistyczne"}
                                /></label>
                                {errors.product && touched.product && errors.product}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Cena:
                                    <input
                                        type="text"
                                        name="productRate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.productRate}
                                        placeholder={"00.00"}
                                    /></label>
                                {errors.productRate && touched.productRate && errors.productRate}
                            </div>
                            <div className={'myDataInput'}>
                                <label>Jednostka miary:
                                    <input
                                        type="text"
                                        name="productUnit"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.productUnit}
                                        placeholder={"ulica nr m"}
                                    /></label>
                                {errors.productUnit && touched.productUnit && errors.productUnit}
                            </div>

                            <div className={'myInvoiceDataSubmit'}>
                                <button type="submit" disabled={isSubmitting}>
                                    Zapisz
                                </button>

                            </div>


                        </form>

                    )}


                </Formik>
            </div>
        )
    }

}


export default AddProductForm