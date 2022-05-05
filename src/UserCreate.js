import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function UserCreate() {
    const [addForm, setAddForm] = useState({
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

        let raw = JSON.stringify(addForm);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result =>{
                alert(result.message);
                if(result.status === "ok"){
                    window.location.href = '/'
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        console.log(addForm);
    }, [addForm])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Create user
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="fname" label="First Name" variant="outlined" fullWidth required onChange={(e) => setAddForm({ ...addForm, fname: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="lname" label="Last Name" variant="outlined" fullWidth required onChange={(e) => setAddForm({ ...addForm, lname: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined" fullWidth required onChange={(e) => setAddForm({ ...addForm, username: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Eamil" variant="outlined" fullWidth required onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="avatoar" label="Avatar" variant="outlined" fullWidth required onChange={(e) => setAddForm({ ...addForm, avatar: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" fullWidth>Create</Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
