import React, { useEffect, useReducer, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import subjects from '../context/subjects'

const initialSubinf = []
const reducer = (state, action) => {

    switch (action.type) {

        case "ADD":
            if (state.length === 0) {
                return [...state, action]
            }
            let doc_snap = state.filter((single_inf) => single_inf.id !== action.id);
            return [...doc_snap, action]
        case "DELETE":
            return state.filter((single_inf) => single_inf.id !== action.id);
        default:
            return state;

    }
};
const Calculator = () => {

    const { subject_info } = subjects();
    const [sub_inf, dispatch] = useReducer(reducer, initialSubinf);
    const [marks, setMarks] = useState('')
    const [subval, setSubval] = useState('')
    const [cgpa, setCgpa] = useState('')

    useEffect(() => {
        var all_marks, all_credits
        if (sub_inf.length !== 0) {
            all_marks = sub_inf.map((sing_inf) => sing_inf.marks)
            all_credits = sub_inf.map((sing_inf) => sing_inf.credit)
            var total_marks = 0
            var total_credit = 0
            for (let i = 0; i < sub_inf.length; i++) {
                total_marks = total_marks + (all_marks[i] * all_credits[i])
                total_credit += all_credits[i]
            }
            setCgpa({ tot_cgpa: total_marks / total_credit, tot_credit: total_credit })


        }
    }, [sub_inf])


    const adddoc = (e) => {
        e.preventDefault();
        var type = "ADD"
        if(subval === ''){type = ""}
        const snap_doc = subject_info.filter(single_inf => single_inf.id === subval)[0]
        dispatch({ ...snap_doc, type: type, marks: marks })
    }


    return (
        <>
            <Form onSubmit={adddoc}>
                <Form.Label>Select Subject </Form.Label>
                <Form.Select required onChange={e => setSubval(e.target.value)} aria-label="Default select example">
                    <option value={''}>{'Select a subject'}</option>
                    {subject_info.map((info) => (
                        <option key={info.id} value={info.id}>{info.name}</option>
                    ))}
                </Form.Select>
                <Form.Label>Enter Grades </Form.Label>
                <Form.Control onChange={e => setMarks(e.target.value)} min='0' max='100' required type='number' />
                <Button style={{ margin: 5 }} variant='dark' type='submit'>ADD</Button>
            </Form>
            {sub_inf.length ?
                <Table>
                    <tbody>
                        <th></th>
                        <th><h3>CGPA= {cgpa.tot_cgpa}</h3> </th>
                        <th><h3>Total Credits= {cgpa.tot_credit}</h3> </th>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Grades</th>
                            <th>DELETE</th>
                        </tr>


                        {sub_inf.map(inf => (
                            <tr>
                                <td> {inf.id} </td>
                                <td> {inf.name} </td>
                                <td> {inf.marks} </td>
                                <td><Button onClick={() => dispatch({ id: inf.id, type: "DELETE" })} variant={'danger'}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                :
                <b>Enter the Grades</b>}
        </>


    )
}

export default Calculator