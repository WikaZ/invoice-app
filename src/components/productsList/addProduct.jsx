import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                <h1> Dodaj nową usługę</h1>
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
                            <Container>

                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"product"}>Usługa:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="product"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.product}
                                            placeholder={"usługi programistyczne"}
                                        />
                                        {errors.product && touched.product && errors.product}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"productRate"}>Cena:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="productRate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productRate}
                                            placeholder={"00.00"}
                                        /></Col>
                                    {errors.productRate && touched.productRate && errors.productRate}
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"productUnit"}>Jednostka miary:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="productUnit"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productUnit}
                                            placeholder={"ulica nr m"}
                                        /></Col>
                                    {errors.productUnit && touched.productUnit && errors.productUnit}
                                </Row>
                                <Row>
                                    <Col md={12} xs={12} className={"alignSubmitBtn"}>
                                        <Button variant="secondary" type="submit" disabled={isSubmitting}
                                                className={"centeredBtn"}>
                                            Zapisz
                                        </Button>
                                    </Col>

                                </Row>

                            </Container>
                        </form>

                        )}


                        </Formik>
                        </div>
                        )
                    }

                    }


                    export default AddProductForm