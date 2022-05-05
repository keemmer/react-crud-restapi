import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function UserUpdate() {
    const { id } = useParams();
    const [userForm, setUserForm] = useState({
        id: 0,
        fname: "",
        lname: "",
        username: "",
        email: "",
        avatar: "",
    });
    const handleSubmit = event => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        setUserForm({ ...userForm, id: id })
        let raw = JSON.stringify(userForm);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/update", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                if (result.status === "ok") {
                    window.location.href = '/'
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "ok") {
                    setUserForm(result.user);
                }
            })
            .catch(error => console.log('error', error));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Update user
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="fname" label="First Name" variant="outlined" fullWidth required onChange={(e) => setUserForm({ ...userForm, fname: e.target.value })} value={userForm.fname} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="lname" label="Last Name" variant="outlined" fullWidth required onChange={(e) => setUserForm({ ...userForm, lname: e.target.value })} value={userForm.lname} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined" fullWidth required onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} value={userForm.username} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Eamil" variant="outlined" fullWidth required onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} value={userForm.email} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="avatoar" label="Avatar" variant="outlined" fullWidth required onChange={(e) => setUserForm({ ...userForm, avatar: e.target.value })} value={userForm.avatar} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" fullWidth>Update</Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
