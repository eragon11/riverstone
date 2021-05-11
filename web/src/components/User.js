import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";

const User = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [users, SetUsers] = useState([]);
    const [email, SetEmail] = useState("")
    const [show, SetShow] = useState(false);
    const [content, SetContent] = useState({
        subject: '',
        body: ''
    }) 

    useEffect(async () => {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            setCurrentUser(user);
        }
        if (user.is_admin) {
            const user_data = await UserService.UserContent()
            console.log(user_data);
            SetUsers(user_data.data.data)
        }
    }, []);

    const handleChange = (e) =>{
        SetContent({...content, [e.target.name]: e.target.value})
    }

    const handleSubmit = async() =>{
        console.log(content);
        const email_data = await UserService.emailNotification(email, content)
        SetContent({
            subject: '',
            body : ''
        })
        SetShow(false);
    }

    const handleShow = (e, value) => {
        console.log(value);
        SetEmail(value)
        SetShow(true);
    }
    const closeShow = () => {
        SetContent({
            subject: '',
            body : ''
        })
        SetShow(false);
    }
    return (
        <div>
            {
                currentUser?.is_admin ?
                    <table>
                        <thead>
                            <th>
                                UserName
                    </th>
                            <th>
                                Email
                    </th>
                            <th>

                            </th>
                        </thead>
                        <tbody>
                            {
                                users.map(el => (
                                    <tr>
                                        <td>
                                            {el.user_name}
                                        </td>
                                        <td>
                                            {el.email}
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={(e)=>handleShow(e, el.email)}>Email</button>
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>





                    : <div>Welcome, {currentUser?.user_name}</div>
            }
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Compose Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Email:</label>
                    <input type="email" value={email} name="email" disabled /></div>
                    <div>
                    <label>Subject:</label>
                    <input type="text" value={content.subject} onChange={handleChange} name="subject" /></div>
                    <div>
                    <label>Body:</label>
                    <textarea value={content.body} onChange={handleChange} name="body" /></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeShow}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default User;